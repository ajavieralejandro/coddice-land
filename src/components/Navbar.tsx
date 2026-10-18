export function Navbar() {
  return (
    <nav>
      <a className="logo" href="#">
        coddice<span>·</span>
      </a>
      <div className="links">
        <a href="#servicios">Qué hacemos</a>
        <a href="#proceso">Cómo trabajamos</a>
        <a className="navcta" href="#contacto">
          Hablemos ↗
        </a>
      </div>
    </nav>
  );
}
