export default function EmptyState({ title, description, action }) {
  return (
    <div className="empty-state panel">
      <div className="empty-state-mark" aria-hidden="true">✦</div>
      <h2 className="mt-4 text-base font-semibold">{title}</h2>
      {description && <p className="muted mt-2 max-w-lg text-sm leading-6">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
