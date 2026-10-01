import "server-only";

import prisma from "@/lib/prisma";

function dateListedStart(value) {
  if (!value) return undefined;

  const now = new Date();

  switch (String(value).toLowerCase()) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "this-week": {
      const start = new Date(now);
      start.setDate(now.getDate() - now.getDay());
      start.setHours(0, 0, 0, 0);
      return start;
    }
    case "this-month":
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case "this-year":
      return new Date(now.getFullYear(), 0, 1);
    default: {
      const parsed = new Date(value);
      return Number.isNaN(parsed.getTime()) ? undefined : parsed;
    }
  }
}

function jobWhere(filters = {}) {
  const where = {
    available: true,
    deadline: { gte: new Date() },
  };

  if (filters.search) {
    where.title = { contains: String(filters.search), mode: "insensitive" };
  }

  if (filters.location) {
    where.location = {
      contains: String(filters.location),
      mode: "insensitive",
    };
  }

  if (filters.type) {
    where.type = String(filters.type);
  }

  const createdAt = dateListedStart(filters.dateListed);
  if (createdAt) where.createdAt = { gte: createdAt };

  return where;
}

async function employerCompanyId(userId) {
  const profile = await prisma.employerProfile.findUnique({
    where: { userId },
    select: { companyId: true },
  });

  return profile?.companyId ?? null;
}

export async function listJobs(filters = {}) {
  return prisma.job.findMany({
    where: jobWhere(filters),
    include: {
      company: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJob(jobId, userId = null) {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    include: {
      company: true,
    },
  });

  if (!job) return null;

  if (!userId) return job;

  const application = await prisma.application.findUnique({
    where: {
      jobId_userId: {
        jobId,
        userId,
      },
    },
    select: { id: true },
  });

  return {
    ...job,
    applied: Boolean(application),
  };
}

export async function listCompanies() {
  return prisma.company.findMany({
    orderBy: { name: "asc" },
  });
}

export async function listAppliedJobs(userId, filters = {}) {
  const applications = await prisma.application.findMany({
    where: {
      userId,
      job: jobWhere(filters),
    },
    include: {
      job: {
        include: {
          company: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return applications.map((application) => ({
    ...application.job,
    status: application.status,
    dateApplied: application.createdAt,
  }));
}

export async function getEmployeeProfile(userId) {
  const profile = await prisma.employeeProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
      education: {
        orderBy: { startDate: "desc" },
      },
      experience: {
        orderBy: { startDate: "desc" },
      },
    },
  });

  if (!profile) return null;

  return {
    email: profile.user.email,
    role: profile.user.role,
    firstName: profile.firstName,
    middleName: profile.middleName,
    lastName: profile.lastName,
    skills: profile.skills,
    education: profile.education,
    experience: profile.experience,
  };
}

export async function getEmployerDashboard(userId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return null;

  const now = new Date();

  const [
    totalJobs,
    totalActiveJobs,
    totalCloseJobs,
    totalApplications,
    totalAccepted,
    totalRejected,
  ] = await Promise.all([
    prisma.job.count({ where: { companyId } }),
    prisma.job.count({ where: { companyId, deadline: { gte: now } } }),
    prisma.job.count({ where: { companyId, deadline: { lt: now } } }),
    prisma.application.count({ where: { companyId } }),
    prisma.application.count({
      where: { companyId, status: "accepted" },
    }),
    prisma.application.count({
      where: { companyId, status: "rejected" },
    }),
  ]);

  return {
    totalJobs,
    totalActiveJobs,
    totalCloseJobs,
    totalApplications,
    totalAccepted,
    totalRejected,
  };
}

export async function getAdminDashboard() {
  const now = new Date();

  const [
    totalJobs,
    totalActiveJobs,
    totalCloseJobs,
    totalApplications,
    totalReviewedApplications,
    totalSubmittedApplications,
  ] = await Promise.all([
    prisma.job.count(),
    prisma.job.count({ where: { deadline: { gte: now } } }),
    prisma.job.count({ where: { deadline: { lt: now } } }),
    prisma.application.count(),
    prisma.application.count({ where: { status: "reviewed" } }),
    prisma.application.count({ where: { status: "submitted" } }),
  ]);

  return {
    totalJobs,
    totalActiveJobs,
    totalCloseJobs,
    totalApplications,
    totalReviewedApplications,
    totalSubmittedApplications,
  };
}

export async function getEmployerJobs(userId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  return prisma.job.findMany({
    where: { companyId },
    include: {
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getEmployerJob(userId, jobId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return null;

  return prisma.job.findFirst({
    where: {
      id: jobId,
      companyId,
    },
  });
}

export async function getJobApplications(userId, jobId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  const job = await prisma.job.findFirst({
    where: {
      id: jobId,
      companyId,
    },
    select: { id: true },
  });

  if (!job) return [];

  return prisma.application.findMany({
    where: { jobId },
    include: {
      user: {
        select: { email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getEmployerApplications(userId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  return prisma.application.findMany({
    where: { companyId },
    include: {
      user: {
        select: { email: true },
      },
      job: {
        select: { title: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getEmployerApplication(userId, applicationId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return null;

  return prisma.application.findFirst({
    where: {
      id: applicationId,
      companyId,
    },
    include: {
      user: {
        select: { email: true },
      },
      job: {
        select: { title: true },
      },
    },
    omit: {
      resumeData: true,
    },
  });
}

export async function getEmployerProfile(userId) {
  return prisma.employerProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          role: true,
        },
      },
      company: true,
    },
  });
}

export async function getResume(applicationId, session) {
  if (!session) return null;

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    select: {
      userId: true,
      companyId: true,
      resumeName: true,
      resumeMime: true,
      resumeData: true,
    },
  });

  if (!application?.resumeData) return null;

  if (session.role === "employee" && application.userId !== session.id) {
    return null;
  }

  if (session.role === "employer") {
    const companyId = await employerCompanyId(session.id);
    if (!companyId || companyId !== application.companyId) return null;
  }

  return application;
}
