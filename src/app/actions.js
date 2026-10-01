"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { api } from "@/lib/api";
import { clearSession, createSession } from "@/lib/auth";

const value = (formData, name) => String(formData.get(name) || "").trim();

function queryError(path, error) {
  const message = encodeURIComponent(error?.message || "Something went wrong.");
  redirect(`${path}?error=${message}`);
}

function jobPayload(formData) {
  return {
    title: value(formData, "title"),
    type: value(formData, "type"),
    location: value(formData, "location"),
    description: value(formData, "description"),
    requirements: value(formData, "requirements"),
    salary: value(formData, "salary"),
    experience: Number(value(formData, "experience") || 0),
    education: value(formData, "education"),
    deadline: value(formData, "deadline"),
  };
}

export async function loginAction(formData) {
  let result;

  try {
    result = await api("/auth/login", {
      method: "POST",
      auth: false,
      body: {
        email: value(formData, "email"),
        password: value(formData, "password"),
      },
    });
  } catch (error) {
    queryError("/login", error);
  }

  await createSession(result.token, result.user);

  if (result.user.role === "employer") redirect("/employer/dashboard");
  if (result.user.role === "admin") redirect("/admin/dashboard");

  redirect("/");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login");
}

export async function registerEmployeeAction(formData) {
  try {
    await api("/auth/register", {
      method: "POST",
      auth: false,
      body: {
        email: value(formData, "email"),
        password: value(formData, "password"),
      },
    });
  } catch (error) {
    queryError("/register", error);
  }

  redirect("/register-success");
}

export async function registerEmployerAction(formData) {
  try {
    await api("/auth/register-employer", {
      method: "POST",
      auth: false,
      body: {
        email: value(formData, "email"),
        password: value(formData, "password"),
        companyName: value(formData, "companyName"),
        website: value(formData, "website"),
        location: value(formData, "location"),
        industry: value(formData, "industry"),
        size: value(formData, "size"),
        vision: value(formData, "vision"),
        mission: value(formData, "mission"),
        values: value(formData, "values"),
      },
    });
  } catch (error) {
    queryError("/register-employer", error);
  }

  redirect("/register-success");
}

export async function createJobAction(formData) {
  try {
    await api("/jobs", { method: "POST", body: jobPayload(formData) });
  } catch (error) {
    queryError("/employer/jobs/create", error);
  }

  revalidatePath("/employer/jobs");
  redirect("/employer/jobs");
}

export async function updateJobAction(jobId, formData) {
  try {
    await api(`/jobs/${jobId}`, { method: "PUT", body: jobPayload(formData) });
  } catch (error) {
    queryError(`/employer/jobs/${jobId}/edit`, error);
  }

  revalidatePath("/employer/jobs");
  revalidatePath(`/jobs/${jobId}/details`);
  redirect("/employer/jobs");
}

export async function deleteJobAction(jobId) {
  await api(`/jobs/${jobId}`, { method: "DELETE" });
  revalidatePath("/employer/jobs");
}

export async function submitApplicationAction(jobId, formData) {
  const upload = new FormData();
  upload.set("jobId", jobId);
  upload.set("coverLetter", value(formData, "coverLetter"));

  const resume = formData.get("resume");
  if (resume instanceof File) upload.set("resume", resume);

  let application;

  try {
    application = await api("/applications", {
      method: "POST",
      body: upload,
    });
  } catch (error) {
    queryError(`/jobs/${jobId}/application`, error);
  }

  revalidatePath("/applied-jobs");
  redirect(`/jobs/${jobId}/application/${application._id}/success`);
}

export async function acceptApplicationAction(applicationId) {
  await api(`/applications/${applicationId}/accept`, { method: "PUT" });
  revalidatePath("/employer/applications");
  revalidatePath(`/employer/applications/${applicationId}/view`);
}

export async function rejectApplicationAction(applicationId) {
  await api(`/applications/${applicationId}/reject`, { method: "PUT" });
  revalidatePath("/employer/applications");
  revalidatePath(`/employer/applications/${applicationId}/view`);
}

export async function updateProfileAction(formData) {
  await api("/profile", {
    method: "PUT",
    body: {
      firstName: value(formData, "firstName"),
      middleName: value(formData, "middleName"),
      lastName: value(formData, "lastName"),
    },
  });

  revalidatePath("/profile");
}

export async function addEducationAction(formData) {
  await api("/profile/education", {
    method: "POST",
    body: {
      school: value(formData, "school"),
      degree: value(formData, "degree"),
      startDate: value(formData, "startDate"),
      endDate: value(formData, "endDate"),
    },
  });
  revalidatePath("/profile");
}

export async function updateEducationAction(id, formData) {
  await api(`/profile/education/${id}`, {
    method: "PUT",
    body: {
      id,
      school: value(formData, "school"),
      degree: value(formData, "degree"),
      startDate: value(formData, "startDate"),
      endDate: value(formData, "endDate"),
    },
  });
  revalidatePath("/profile");
}

export async function deleteEducationAction(id) {
  await api(`/profile/education/${id}`, {
    method: "DELETE",
    body: { educationId: id },
  });
  revalidatePath("/profile");
}

export async function addExperienceAction(formData) {
  await api("/profile/experience", {
    method: "POST",
    body: {
      title: value(formData, "title"),
      company: value(formData, "company"),
      startDate: value(formData, "startDate"),
      endDate: value(formData, "endDate"),
    },
  });
  revalidatePath("/profile");
}

export async function updateExperienceAction(id, formData) {
  await api(`/profile/experience/${id}`, {
    method: "PUT",
    body: {
      title: value(formData, "title"),
      company: value(formData, "company"),
      startDate: value(formData, "startDate"),
      endDate: value(formData, "endDate"),
    },
  });
  revalidatePath("/profile");
}

export async function deleteExperienceAction(id) {
  await api(`/profile/experience/${id}`, {
    method: "DELETE",
    body: { experienceId: id },
  });
  revalidatePath("/profile");
}
