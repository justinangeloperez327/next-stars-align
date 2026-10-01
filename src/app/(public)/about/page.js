export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="shell py-16 sm:py-24">
      <div className="glass-strong mx-auto max-w-4xl rounded-[2rem] p-7 sm:p-12">
        <p className="eyebrow">About Stars Align</p>
        <h1 className="page-title mt-4">Hiring software should feel quieter.</h1>
        <p className="muted mt-7 max-w-2xl text-lg leading-8">
          Stars Align brings job discovery, applications, and employer workflows into one focused product. The interface is designed to keep the next action clear without burying people in dashboards and decoration.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            ["Focused", "Only the information needed for the decision in front of you."],
            ["Clear", "Strong hierarchy and predictable actions across every workflow."],
            ["Calm", "Visual depth without sacrificing contrast or readability."],
          ].map(([title, copy]) => (
            <div className="rounded-2xl border border-white/8 bg-black/15 p-5" key={title}>
              <h2 className="font-extrabold">{title}</h2>
              <p className="muted mt-2 text-sm leading-6">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
