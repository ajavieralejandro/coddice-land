import { Scene3D } from './Scene3D';

export function Hero() {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="eyebrow">
          <i className="dot" />
          Desarrollo independiente · Ideas conectadas
        </div>
        <h1>
          Menos fricción.
          <br />
          Más <em>posibilidades.</em>
        </h1>
        <p className="intro">
          Software a medida para conectar tu negocio.
          <br />
          Diseñamos aplicaciones, APIs y microservicios que hacen simple lo complejo.
        </p>
        <a className="primary" href="#contacto">
          Contanos tu idea <span>↗</span>
        </a>
        <Scene3D />
        <div className="hero-bottom">
          <span>De la primera idea al próximo paso.</span>
          <a href="#servicios">Explorá el estudio ↓</a>
        </div>
      </section>
      <div className="strip">
        <span>SOFTWARE A MEDIDA</span>
        <span>APIs & MICROSERVICIOS</span>
        <span>APLICACIONES WEB & MOBILE</span>
        <span>INFRAESTRUCTURA</span>
      </div>
    </>
  );
}
