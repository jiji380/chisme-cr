export function AdBanner({ position = "sidebar" }: { position?: "sidebar" | "inline" | "top" }) {
  const styles = {
    sidebar: "bg-white rounded-2xl border border-border p-5 shadow-sm",
    inline: "bg-white rounded-2xl border border-border p-4 shadow-sm my-4",
    top: "bg-white border-b border-border py-2",
  };

  const sizes = {
    sidebar: "h-[250px]",
    inline: "h-[90px]",
    top: "h-[60px]",
  };

  return (
    <div className={styles[position]}>
      <div
        className={`${sizes[position]} flex items-center justify-center rounded-xl bg-gradient-to-br from-surface-alt to-surface border border-dashed border-border`}
      >
        <div className="text-center">
          <p className="text-xs text-text-muted font-medium">Publicidad</p>
          <p className="text-[10px] text-text-muted/60 mt-0.5">
            Espacio disponible
          </p>
        </div>
      </div>
    </div>
  );
}
