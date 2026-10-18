const swatches = ['red', 'rose', 'green', 'blue', 'lime'] as const;

export function Footer() {
  return (
    <footer className="footer">
      <a className="logo" href="#">
        coddice<span>·</span>
      </a>
      <span>Software con criterio. Diseño con intención.</span>
      <div className="palette" aria-hidden="true">
        {swatches.map((swatch) => (
          <i key={swatch} className={`swatch swatch-${swatch}`} />
        ))}
      </div>
    </footer>
  );
}
