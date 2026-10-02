export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  compact = false,
}) {
  return (
    <header className={compact ? "page-header page-header-compact" : "page-header"}>
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={compact ? "text-3xl font-black tracking-[-0.04em]" : "section-title mt-2"}>
          {title}
        </h1>
        {description && <p className="muted mt-3 max-w-2xl leading-7">{description}</p>}
      </div>
      {actions && <div className="page-header-actions">{actions}</div>}
    </header>
  );
}
