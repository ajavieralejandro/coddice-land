const steps = [
  {
    index: '01 — CONVERSAMOS',
    title: 'El problema antes del código.',
    text: 'Entendemos tu operación, lo que necesitás resolver y las herramientas que ya usás.',
  },
  {
    index: '02 — DEFINIMOS',
    title: 'Un primer paso concreto.',
    text: 'Acordamos alcance, prioridades y una propuesta que puedas evaluar antes de desarrollar.',
  },
  {
    index: '03 — CONSTRUIMOS',
    title: 'Avances que podés probar.',
    text: 'Trabajamos por entregas, validamos con vos y ajustamos el siguiente paso con evidencia.',
  },
];

export function Process() {
  return (
    <section className="section approach" id="proceso">
      <div className="sectionhead reveal">
        <span className="eyebrow">02 / El proceso</span>
        <h2>
          Primero entender.
          <br />
          Después, construir.
        </h2>
      </div>
      <div className="steps">
        {steps.map((step) => (
          <article className="reveal" key={step.index}>
            <b>{step.index}</b>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
