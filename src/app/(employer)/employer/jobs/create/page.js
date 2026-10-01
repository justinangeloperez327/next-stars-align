import { createJobAction } from "@/app/actions";
import JobForm from "@/components/job-form";

export const metadata = { title: "Create job" };

export default function CreateJobPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-black">Create job</h1>
      <p className="muted mt-2">Publish a new opportunity for your company.</p>
      <div className="mt-8"><JobForm action={createJobAction} submitLabel="Publish job" /></div>
    </div>
  );
}
