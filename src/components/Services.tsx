const services = [
  {
    index: '01 / PRODUCTO',
    icon: '⌘',
    title: 'De idea a aplicación.',
    text: 'Aplicaciones web y móviles pensadas para las personas que las usan. Del prototipo a una herramienta lista para tu operación.',
    tags: 'WEB · MOBILE · EXPERIENCIA',
  },
  {
    index: '02 / CONEXIONES',
    icon: '⌁',
    title: 'Todo, conectado.',
    text: 'APIs, microservicios e integraciones para que tus sistemas compartan información y tus procesos avancen sin tareas repetidas.',
    tags: 'APIs · INTEGRACIONES · AUTOMATIZACIÓN',
  },
  {
    index: '03 / EVOLUCIÓN',
    icon: '↗',
    title: 'Una base para crecer.',
    text: 'Arquitectura, despliegue y evolución de software existente. Revisamos lo que tenés y definimos qué conviene mejorar primero.',
    tags: 'ARQUITECTURA · CLOUD · MANTENIMIENTO',
  },
];

export function Services() {
  return (
    <section className="section" id="servicios">
      <div className="sectionhead reveal">
        <span className="eyebrow">01 / Qué hacemos</span>
        <h2>
          Piezas independientes.
          <br />
          Un sistema que funciona.
        </h2>
      </div>
      <div className="services">
        {services.map((service) => (
          <article className="card reveal" key={service.index}>
            <div className="card-top">
              <span>{service.index}</span>
              <span>↗</span>
            </div>
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <div className="tags">{service.tags}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
