import { notFound } from "next/navigation";

import { updateJobAction } from "@/app/actions";
import JobForm from "@/components/job-form";
import { api, ApiError } from "@/lib/api";

export const metadata = { title: "Edit job" };

export default async function EditJobPage({ params }) {
  const { jobId } = await params;
  let job;

  try {
    job = await api(`/jobs/${jobId}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const action = updateJobAction.bind(null, jobId);

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black">Edit job</h1>
      <p className="muted mt-2">Update the role and save your changes.</p>
      <div className="mt-8"><JobForm action={action} job={job} submitLabel="Save changes" /></div>
    </div>
  );
}
