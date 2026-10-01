export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="shell py-16">
      <div className="panel mx-auto max-w-3xl rounded-3xl p-8 sm:p-12">
        <p className="text-sm font-black uppercase tracking-[0.26em] text-violet-400">About</p>
        <h1 className="mt-4 text-4xl font-black">A simpler way to connect talent and employers.</h1>
        <p className="muted mt-6 text-lg leading-8">
          Stars Align is a focused job platform for discovering roles, submitting applications, and managing hiring workflows from one clear interface.
        </p>
      </div>
    </div>
  );
}
