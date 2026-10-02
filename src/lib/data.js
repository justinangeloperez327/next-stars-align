import "server-only";

import { databaseConfigured, withDatabase } from "@/lib/prisma";
import { getDemoCompanies, getDemoCompany, getDemoJob, getDemoJobs } from "@/lib/demo-data";

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
    where.location = { contains: String(filters.location), mode: "insensitive" };
  }

  if (filters.type) where.type = String(filters.type);

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
    (db) => db.job.findMany({
      where: jobWhere(filters),
      include: { company: true },
      orderBy: { createdAt: "desc" },
    }),
    getDemoJobs(filters),
  );
}

export async function getJob(jobId, userId = null) {
  return withDatabase(async (db) => {
    const job = await db.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });

    if (!job) return null;
    if (!userId) return job;

    const application = await db.application.findUnique({
      where: { jobId_userId: { jobId, userId } },
      select: { id: true },
    });

    return { ...job, applied: Boolean(application) };
  }, getDemoJob(jobId));
}

export async function listCompanies() {
  return withDatabase(
    (db) => db.company.findMany({
      include: {
        _count: { select: { jobs: true } },
      },
      orderBy: { name: "asc" },
    }),
    getDemoCompanies(),
  );
}

export async function getCompany(companyId) {
  return withDatabase(
    (db) => db.company.findUnique({
      where: { id: companyId },
      include: {
        jobs: {
          where: { available: true, deadline: { gte: new Date() } },
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    getDemoCompany(companyId),
  );
}

export async function listAppliedJobs(userId, filters = {}) {
  return withDatabase(async (db) => {
    const where = {
      userId,
      job: jobWhere(filters),
    };

    if (filters.status) where.status = String(filters.status);

    const applications = await db.application.findMany({
      where,
      include: {
        job: { include: { company: true } },
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
        user: { select: { email: true, role: true, createdAt: true } },
        education: { orderBy: { startDate: "desc" } },
        experience: { orderBy: { startDate: "desc" } },
      },
    });

    if (!profile) return null;

    return {
      email: profile.user.email,
      role: profile.user.role,
      joinedAt: profile.user.createdAt,
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
    const inSevenDays = new Date(now);
    inSevenDays.setDate(inSevenDays.getDate() + 7);

    const [
      totalJobs,
      totalActiveJobs,
      totalCloseJobs,
      totalApplications,
      awaitingReview,
      totalAccepted,
      recentApplications,
      closingSoon,
    ] = await Promise.all([
      db.job.count({ where: { companyId } }),
      db.job.count({ where: { companyId, deadline: { gte: now } } }),
      db.job.count({ where: { companyId, deadline: { lt: now } } }),
      db.application.count({ where: { companyId } }),
      db.application.count({ where: { companyId, status: "submitted" } }),
      db.application.count({ where: { companyId, status: "accepted" } }),
      db.application.findMany({
        where: { companyId },
        include: {
          user: {
            select: {
              email: true,
              employeeProfile: { select: { firstName: true, lastName: true } },
            },
          },
          job: { select: { title: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      db.job.findMany({
        where: {
          companyId,
          available: true,
          deadline: { gte: now, lte: inSevenDays },
        },
        include: { _count: { select: { applications: true } } },
        orderBy: { deadline: "asc" },
        take: 5,
      }),
    ]);

    return {
      totalJobs,
      totalActiveJobs,
      totalCloseJobs,
      totalApplications,
      awaitingReview,
      totalAccepted,
      recentApplications,
      closingSoon,
    };
  }, null);
}

export async function getEmployerJobs(userId, filters = {}) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  return withDatabase((db) => {
    const where = { companyId };
    const now = new Date();

    if (filters.search) {
      where.title = { contains: String(filters.search), mode: "insensitive" };
    }

    if (filters.status === "active") where.deadline = { gte: now };
    if (filters.status === "closed") where.deadline = { lt: now };

    return db.job.findMany({
      where,
      include: { _count: { select: { applications: true } } },
      orderBy: { createdAt: "desc" },
    });
  }, []);
}

export async function getEmployerJob(userId, jobId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return null;

  return withDatabase(
    (db) => db.job.findFirst({ where: { id: jobId, companyId } }),
    null,
  );
}

export async function getJobApplications(userId, jobId, filters = {}) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  return withDatabase(async (db) => {
    const job = await db.job.findFirst({
      where: { id: jobId, companyId },
      select: { id: true, title: true },
    });

    if (!job) return [];

    const where = { jobId };

    if (filters.status) where.status = String(filters.status);
    if (filters.search) {
      where.user = {
        email: { contains: String(filters.search), mode: "insensitive" },
      };
    }

    return db.application.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
            employeeProfile: {
              select: { firstName: true, lastName: true, experience: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }, []);
}

export async function getEmployerApplications(userId, filters = {}) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return [];

  return withDatabase((db) => {
    const where = { companyId };

    if (filters.status) where.status = String(filters.status);
    if (filters.search) {
      where.user = {
        email: { contains: String(filters.search), mode: "insensitive" },
      };
    }
    if (filters.job) where.jobId = String(filters.job);

    return db.application.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
            employeeProfile: { select: { firstName: true, lastName: true } },
          },
        },
        job: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }, []);
}

export async function getEmployerApplication(userId, applicationId) {
  const companyId = await employerCompanyId(userId);
  if (!companyId) return null;

  return withDatabase(
    (db) => db.application.findFirst({
      where: { id: applicationId, companyId },
      include: {
        user: {
          select: {
            email: true,
            employeeProfile: {
              include: {
                education: { orderBy: { startDate: "desc" } },
                experience: { orderBy: { startDate: "desc" } },
              },
            },
          },
        },
        job: { select: { id: true, title: true } },
      },
      omit: { resumeData: true },
    }),
    null,
  );
}

export async function getEmployerProfile(userId) {
  return withDatabase(
    (db) => db.employerProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { email: true, role: true, createdAt: true } },
        company: true,
      },
    }),
    null,
  );
}

export async function getAdminDashboard() {
  return withDatabase(async (db) => {
    const now = new Date();

    const [
      totalUsers,
      totalCompanies,
      totalJobs,
      totalActiveJobs,
      totalApplications,
      recentUsers,
      recentJobs,
    ] = await Promise.all([
      db.user.count(),
      db.company.count(),
      db.job.count(),
      db.job.count({ where: { deadline: { gte: now } } }),
      db.application.count(),
      db.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      db.job.findMany({
        include: { company: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return {
      totalUsers,
      totalCompanies,
      totalJobs,
      totalActiveJobs,
      totalApplications,
      recentUsers,
      recentJobs,
    };
  }, {
    totalUsers: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalActiveJobs: 0,
    totalApplications: 0,
    recentUsers: [],
    recentJobs: [],
  });
}

export async function getAdminUsers() {
  return withDatabase(
    (db) => db.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        employeeProfile: { select: { firstName: true, lastName: true } },
        employerProfile: {
          select: { company: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    [],
  );
}

export async function getAdminCompanies() {
  return withDatabase(
    (db) => db.company.findMany({
      include: {
        _count: { select: { jobs: true, applications: true } },
      },
      orderBy: { name: "asc" },
    }),
    [],
  );
}

export async function getAdminJobs() {
  return withDatabase(
    (db) => db.job.findMany({
      include: {
        company: { select: { name: true } },
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    [],
  );
}

export async function getAdminApplications() {
  return withDatabase(
    (db) => db.application.findMany({
      include: {
        user: { select: { email: true } },
        job: { select: { title: true } },
        company: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    [],
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

    if (session.role === "employee" && application.userId !== session.id) return null;

    if (session.role === "employer") {
      const companyId = await employerCompanyId(session.id);
      if (!companyId || companyId !== application.companyId) return null;
    }

    return application;
  }, null);
}
