import { useEffect, useId, useRef, useState } from 'react';
import { contactConfig, getContactChannels } from '../config/contact';

export function Contact() {
  const ideaId = useId();
  const ideaRef = useRef<HTMLTextAreaElement>(null);
  const preparedRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [idea, setIdea] = useState('');
  const [prepared, setPrepared] = useState('');
  const [status, setStatus] = useState(
    'Esta vista previa prepara tu consulta. El canal de contacto se configurará con tus datos.',
  );
  const channels = getContactChannels();

  useEffect(() => {
    if (open) ideaRef.current?.focus();
  }, [open]);

  async function copyQuery() {
    const text = idea.trim();
    if (!text) {
      setPrepared('');
      setStatus('Contanos primero qué querés resolver.');
      return;
    }

    const query = `${contactConfig.messagePrefix}${text}`;
    setPrepared(query);

    try {
      await navigator.clipboard.writeText(query);
      setStatus('Consulta copiada. Ya podés pegarla en tu canal de contacto.');
    } catch {
      setStatus('Seleccioná el texto para copiar tu consulta.');
      const node = preparedRef.current;
      if (!node) return;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }

  return (
    <section className="contact" id="contacto">
      <div className="eyebrow">03 / La próxima conexión</div>
      <h2>
        Tu idea merece
        <br />
        un buen comienzo<span className="accent">.</span>
      </h2>
      <p>
        Un nuevo producto, una integración pendiente o un sistema que necesita evolucionar. Empecemos
        por ahí.
      </p>
      <button
        className="primary"
        id="start"
        type="button"
        aria-expanded={open}
        aria-controls="brief"
        onClick={() => setOpen((current) => !current)}
      >
        Preparemos tu proyecto <span>↗</span>
      </button>
      <div className={open ? 'brief open' : 'brief'} id="brief">
        <label htmlFor={ideaId}>¿Qué te gustaría resolver?</label>
        <textarea
          id={ideaId}
          ref={ideaRef}
          value={idea}
          placeholder="Tengo una idea para…"
          onChange={(event) => setIdea(event.target.value)}
        />
        <button className="primary" id="copy" type="button" onClick={() => void copyQuery()}>
          Copiar mi consulta ↗
        </button>
        <output id="result" aria-live="polite">
          {prepared ? (
            <span className="prepared" ref={preparedRef}>
              {prepared}
            </span>
          ) : null}
          {status}
        </output>
      </div>
      {channels.length > 0 ? (
        <ul className="channels">
          {channels.map((channel) => (
            <li key={channel.href}>
              <a href={channel.href}>{channel.label}</a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
