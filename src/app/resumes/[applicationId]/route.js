import { getSession } from "@/lib/auth";
import { getResume } from "@/lib/data";

export async function GET(_request, { params }) {
  const session = await getSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { applicationId } = await params;
  const resume = await getResume(applicationId, session);

  if (!resume) {
    return new Response("Not found", { status: 404 });
  }

  const safeName = String(resume.resumeName || "resume")
    .replace(/[^a-zA-Z0-9._-]/g, "_");

  return new Response(resume.resumeData, {
    headers: {
      "Content-Type": resume.resumeMime || "application/octet-stream",
      "Content-Disposition": `inline; filename="${safeName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
