import "server-only";

import prisma, { databaseConfigured, withDatabase } from "@/lib/prisma";

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
  if (!databaseConfigured) return null;

  return withDatabase(async (db) => {
    const profile = await db.employerProfile.findUnique({
      where: { userId },
      select: { companyId: true },
    });

    return profile?.companyId ?? null;
  }, null);
}

export async function listJobs(filters = {}) {
  return withDatabase(
    (db) =>
      db.job.findMany({
        where: jobWhere(filters),
        include: {
          company: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    [],
  );
}

export async function getJob(jobId, userId = null) {
  return withDatabase(async (db) => {
    const job = await db.job.findUnique({
      where: { id: jobId },
      include: {
        company: true,
      },
    });

    if (!job) return null;
    if (!userId) return job;

    const application = await db.application.findUnique({
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
  }, null);
}

export async function listCompanies() {
  return withDatabase(
    (db) =>
      db.company.findMany({
        orderBy: { name: "asc" },
      }),
    [],
  );
}

export async function listAppliedJobs(userId, filters = {}) {
  return withDatabase(async (db) => {
    const applications = await db.application.findMany({
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
  }, []);
}

export async function getEmployeeProfile(userId) {
  return withDatabase(async (db) => {
    const profile = await db.employeeProfile.findUnique({
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
  }, null);
}

export async function getEmployerDashboard(userId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return null;

  return withDatabase(async (db) => {
    const now = new Date();

    const [
      totalJobs,
      totalActiveJobs,
      totalCloseJobs,
      totalApplications,
      totalAccepted,
      totalRejected,
    ] = await Promise.all([
      db.job.count({ where: { companyId } }),
      db.job.count({ where: { companyId, deadline: { gte: now } } }),
      db.job.count({ where: { companyId, deadline: { lt: now } } }),
      db.application.count({ where: { companyId } }),
      db.application.count({ where: { companyId, status: "accepted" } }),
      db.application.count({ where: { companyId, status: "rejected" } }),
    ]);

    return {
      totalJobs,
      totalActiveJobs,
      totalCloseJobs,
      totalApplications,
      totalAccepted,
      totalRejected,
    };
  }, null);
}

export async function getAdminDashboard() {
  return withDatabase(async (db) => {
    const now = new Date();

    const [
      totalJobs,
      totalActiveJobs,
      totalCloseJobs,
      totalApplications,
      totalReviewedApplications,
      totalSubmittedApplications,
    ] = await Promise.all([
      db.job.count(),
      db.job.count({ where: { deadline: { gte: now } } }),
      db.job.count({ where: { deadline: { lt: now } } }),
      db.application.count(),
      db.application.count({ where: { status: "reviewed" } }),
      db.application.count({ where: { status: "submitted" } }),
    ]);

    return {
      totalJobs,
      totalActiveJobs,
      totalCloseJobs,
      totalApplications,
      totalReviewedApplications,
      totalSubmittedApplications,
    };
  }, {
    totalJobs: 0,
    totalActiveJobs: 0,
    totalCloseJobs: 0,
    totalApplications: 0,
    totalReviewedApplications: 0,
    totalSubmittedApplications: 0,
  });
}

export async function getEmployerJobs(userId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  return withDatabase(
    (db) =>
      db.job.findMany({
        where: { companyId },
        include: {
          _count: {
            select: { applications: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    [],
  );
}

export async function getEmployerJob(userId, jobId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return null;

  return withDatabase(
    (db) =>
      db.job.findFirst({
        where: {
          id: jobId,
          companyId,
        },
      }),
    null,
  );
}

export async function getJobApplications(userId, jobId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  return withDatabase(async (db) => {
    const job = await db.job.findFirst({
      where: {
        id: jobId,
        companyId,
      },
      select: { id: true },
    });

    if (!job) return [];

    return db.application.findMany({
      where: { jobId },
      include: {
        user: {
          select: { email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }, []);
}

export async function getEmployerApplications(userId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  return withDatabase(
    (db) =>
      db.application.findMany({
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
      }),
    [],
  );
}

export async function getEmployerApplication(userId, applicationId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return null;

  return withDatabase(
    (db) =>
      db.application.findFirst({
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
      }),
    null,
  );
}

export async function getEmployerProfile(userId) {
  return withDatabase(
    (db) =>
      db.employerProfile.findUnique({
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
      }),
    null,
  );
}

export async function getResume(applicationId, session) {
  if (!session) return null;

  return withDatabase(async (db) => {
    const application = await db.application.findUnique({
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
  }, null);
}
