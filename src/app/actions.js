"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createSession, clearSession, requireRole } from "@/lib/auth";
import { hashPassword, verifyPassword } from "@/lib/password";
import prisma from "@/lib/prisma";

const value = (formData, name) => String(formData.get(name) || "").trim();

function fail(path, message) {
  redirect(`${path}?error=${encodeURIComponent(message)}`);
}

function optionalDate(formData, name) {
  const raw = value(formData, name);
  return raw ? new Date(raw) : null;
}

function jobPayload(formData) {
  return {
    title: value(formData, "title"),
    type: value(formData, "type"),
    location: value(formData, "location"),
    description: value(formData, "description"),
    requirements: value(formData, "requirements"),
    salary: value(formData, "salary") || null,
    experience: Number(value(formData, "experience") || 0),
    education: value(formData, "education") || null,
    deadline: new Date(value(formData, "deadline")),
  };
}

async function employerCompanyId(userId) {
  const profile = await prisma.employerProfile.findUnique({
    where: { userId },
    select: { companyId: true },
  });

  return profile?.companyId ?? null;
}

export async function loginAction(formData) {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    fail("/login", "Invalid email or password.");
  }

  await createSession(user);

  if (user.role === "employer") redirect("/employer/dashboard");
  if (user.role === "admin") redirect("/admin/dashboard");

  redirect("/");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}

export async function registerEmployeeAction(formData) {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");

  if (password.length < 6) {
    fail("/register", "Password must be at least 6 characters.");
  }

  if (await prisma.user.findUnique({ where: { email }, select: { id: true } })) {
    fail("/register", "An account with this email already exists.");
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "employee",
      employeeProfile: {
        create: {},
      },
    },
  });

  redirect("/register-success");
}

export async function registerEmployerAction(formData) {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");

  if (password.length < 6) {
    fail("/register-employer", "Password must be at least 6 characters.");
  }

  if (await prisma.user.findUnique({ where: { email }, select: { id: true } })) {
    fail("/register-employer", "An account with this email already exists.");
  }

  const companyName = value(formData, "companyName");
  const location = value(formData, "location");
  const industry = value(formData, "industry");

  if (!companyName || !location || !industry) {
    fail("/register-employer", "Company name, location, and industry are required.");
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: "employer",
      employerProfile: {
        create: {
          company: {
            create: {
              name: companyName,
              website: value(formData, "website") || null,
              location,
              industry,
              size: value(formData, "size") || null,
              vision: value(formData, "vision") || null,
              mission: value(formData, "mission") || null,
              values: value(formData, "values") || null,
            },
          },
        },
      },
    },
  });

  redirect("/register-success");
}

export async function createJobAction(formData) {
  const session = await requireRole("employer");
  const companyId = await employerCompanyId(session.id);

  if (!companyId) {
    fail("/employer/jobs/create", "Employer company profile was not found.");
  }

  await prisma.job.create({
    data: {
      ...jobPayload(formData),
      companyId,
    },
  });

  revalidatePath("/");
  revalidatePath("/employer/jobs");
  redirect("/employer/jobs");
}

export async function updateJobAction(jobId, formData) {
  const session = await requireRole("employer");
  const companyId = await employerCompanyId(session.id);

  const job = await prisma.job.findFirst({
    where: { id: jobId, companyId: companyId ?? "" },
    select: { id: true },
  });

  if (!job) {
    fail("/employer/jobs", "Job not found.");
  }

  await prisma.job.update({
    where: { id: jobId },
    data: jobPayload(formData),
  });

  revalidatePath("/");
  revalidatePath("/employer/jobs");
  revalidatePath(`/jobs/${jobId}/details`);
  redirect("/employer/jobs");
}

export async function deleteJobAction(jobId) {
  const session = await requireRole("employer");
  const companyId = await employerCompanyId(session.id);

  const job = await prisma.job.findFirst({
    where: { id: jobId, companyId: companyId ?? "" },
    select: { id: true },
  });

  if (!job) return;

  await prisma.job.delete({ where: { id: jobId } });

  revalidatePath("/");
  revalidatePath("/employer/jobs");
}

export async function submitApplicationAction(jobId, formData) {
  const session = await requireRole("employee");
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: {
      id: true,
      companyId: true,
      deadline: true,
      available: true,
    },
  });

  if (!job || !job.available || job.deadline < new Date()) {
    fail(`/jobs/${jobId}/details`, "This job is no longer accepting applications.");
  }

  const resume = formData.get("resume");

  if (!resume || typeof resume.arrayBuffer !== "function" || !resume.size) {
    fail(`/jobs/${jobId}/application`, "A resume file is required.");
  }

  if (resume.size > 5 * 1024 * 1024) {
    fail(`/jobs/${jobId}/application`, "Resume must be 5 MB or smaller.");
  }

  const allowedTypes = new Set([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);

  if (resume.type && !allowedTypes.has(resume.type)) {
    fail(`/jobs/${jobId}/application`, "Resume must be PDF, DOC, or DOCX.");
  }

  const resumeData = new Uint8Array(await resume.arrayBuffer());

  const application = await prisma.application.upsert({
    where: {
      jobId_userId: {
        jobId,
        userId: session.id,
      },
    },
    update: {
      coverLetter: value(formData, "coverLetter") || null,
      resumeName: resume.name,
      resumeMime: resume.type || "application/octet-stream",
      resumeData,
      status: "submitted",
      appliedAt: new Date(),
    },
    create: {
      jobId,
      companyId: job.companyId,
      userId: session.id,
      coverLetter: value(formData, "coverLetter") || null,
      resumeName: resume.name,
      resumeMime: resume.type || "application/octet-stream",
      resumeData,
    },
    select: { id: true },
  });

  revalidatePath("/applied-jobs");
  revalidatePath(`/jobs/${jobId}/details`);
  redirect(`/jobs/${jobId}/application/${application.id}/success`);
}

async function updateApplicationStatus(applicationId, status) {
  const session = await requireRole("employer");
  const companyId = await employerCompanyId(session.id);

  const application = await prisma.application.findFirst({
    where: {
      id: applicationId,
      companyId: companyId ?? "",
    },
    select: { id: true },
  });

  if (!application) return;

  await prisma.application.update({
    where: { id: applicationId },
    data: { status },
  });

  revalidatePath("/employer/applications");
  revalidatePath(`/employer/applications/${applicationId}/view`);
}

export async function acceptApplicationAction(applicationId) {
  await updateApplicationStatus(applicationId, "accepted");
}

export async function rejectApplicationAction(applicationId) {
  await updateApplicationStatus(applicationId, "rejected");
}

export async function updateProfileAction(formData) {
  const session = await requireRole("employee");

  await prisma.employeeProfile.update({
    where: { userId: session.id },
    data: {
      firstName: value(formData, "firstName") || null,
      middleName: value(formData, "middleName") || null,
      lastName: value(formData, "lastName") || null,
    },
  });

  revalidatePath("/profile");
}

export async function addEducationAction(formData) {
  const session = await requireRole("employee");
  const profile = await prisma.employeeProfile.findUnique({
    where: { userId: session.id },
    select: { id: true },
  });

  if (!profile) return;

  await prisma.education.create({
    data: {
      profileId: profile.id,
      school: value(formData, "school"),
      degree: value(formData, "degree") || null,
      startDate: optionalDate(formData, "startDate"),
      endDate: optionalDate(formData, "endDate"),
    },
  });

  revalidatePath("/profile");
}

export async function updateEducationAction(id, formData) {
  const session = await requireRole("employee");
  const profile = await prisma.employeeProfile.findUnique({
    where: { userId: session.id },
    select: { id: true },
  });

  const education = await prisma.education.findFirst({
    where: { id, profileId: profile?.id ?? "" },
    select: { id: true },
  });

  if (!education) return;

  await prisma.education.update({
    where: { id },
    data: {
      school: value(formData, "school"),
      degree: value(formData, "degree") || null,
      startDate: optionalDate(formData, "startDate"),
      endDate: optionalDate(formData, "endDate"),
    },
  });

  revalidatePath("/profile");
}

export async function deleteEducationAction(id) {
  const session = await requireRole("employee");
  const profile = await prisma.employeeProfile.findUnique({
    where: { userId: session.id },
    select: { id: true },
  });

  const education = await prisma.education.findFirst({
    where: { id, profileId: profile?.id ?? "" },
    select: { id: true },
  });

  if (!education) return;

  await prisma.education.delete({ where: { id } });
  revalidatePath("/profile");
}

export async function addExperienceAction(formData) {
  const session = await requireRole("employee");
  const profile = await prisma.employeeProfile.findUnique({
    where: { userId: session.id },
    select: { id: true },
  });

  if (!profile) return;

  await prisma.experience.create({
    data: {
      profileId: profile.id,
      title: value(formData, "title"),
      company: value(formData, "company"),
      startDate: optionalDate(formData, "startDate"),
      endDate: optionalDate(formData, "endDate"),
    },
  });

  revalidatePath("/profile");
}

export async function updateExperienceAction(id, formData) {
  const session = await requireRole("employee");
  const profile = await prisma.employeeProfile.findUnique({
    where: { userId: session.id },
    select: { id: true },
  });

  const experience = await prisma.experience.findFirst({
    where: { id, profileId: profile?.id ?? "" },
    select: { id: true },
  });

  if (!experience) return;

  await prisma.experience.update({
    where: { id },
    data: {
      title: value(formData, "title"),
      company: value(formData, "company"),
      startDate: optionalDate(formData, "startDate"),
      endDate: optionalDate(formData, "endDate"),
    },
  });

  revalidatePath("/profile");
}

export async function deleteExperienceAction(id) {
  const session = await requireRole("employee");
  const profile = await prisma.employeeProfile.findUnique({
    where: { userId: session.id },
    select: { id: true },
  });

  const experience = await prisma.experience.findFirst({
    where: { id, profileId: profile?.id ?? "" },
    select: { id: true },
  });

  if (!experience) return;

  await prisma.experience.delete({ where: { id } });
  revalidatePath("/profile");
}
