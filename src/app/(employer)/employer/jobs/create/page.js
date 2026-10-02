import { createJobAction } from "@/app/actions";
import JobForm from "@/components/job-form";
import PageHeader from "@/components/page-header";

export const metadata = { title: "Create job" };

export default function CreateJobPage() {
  return (
    <div className="max-w-5xl">
      <PageHeader
        eyebrow="New vacancy"
        title="Create job"
        description="Structure the role clearly so candidates can decide whether it matches their experience."
      />
      <div className="mt-8"><JobForm action={createJobAction} submitLabel="Publish job" /></div>
    </div>
  );
}
