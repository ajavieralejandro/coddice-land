/**
 * Canales de contacto reales del estudio.
 * Dejar vacíos hasta tener datos confirmados: no inventar correo ni WhatsApp.
 * WhatsApp, si se completa, va en dígitos internacionales (ej. 5491112345678).
 */
export const contactConfig = {
  email: '',
  whatsapp: '',
  messagePrefix: 'Hola, me gustaría conversar sobre un proyecto: ',
} as const;

export type ContactChannel = {
  label: string;
  href: string;
};

export function getContactChannels(): ContactChannel[] {
  const channels: ContactChannel[] = [];

  if (contactConfig.email) {
    channels.push({
      label: contactConfig.email,
      href: `mailto:${contactConfig.email}`,
    });
  }

  if (contactConfig.whatsapp) {
    channels.push({
      label: 'WhatsApp',
      href: `https://wa.me/${contactConfig.whatsapp}`,
    });
  }

  return channels;
}
