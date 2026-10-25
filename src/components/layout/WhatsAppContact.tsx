const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
const whatsappMessage = encodeURIComponent(
  "Hi FITZENIX, I would like to know more about your gym management platform.",
);

export function WhatsAppContact() {
  const chatUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : `https://wa.me/?text=${whatsappMessage}`;

  return (
    <a
      href={chatUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        whatsappNumber
          ? "Chat with FITZENIX on WhatsApp"
          : "Open WhatsApp to message FITZENIX"
      }
      title="Chat with FITZENIX on WhatsApp"
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-[70] inline-flex size-14 items-center justify-center rounded-full border border-white/20 bg-[#168C55] text-white shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-colors hover:bg-[#117746] focus-visible:outline-offset-4 md:bottom-6 md:right-6"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .14 5.35.14 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.9 11.9 0 0 0 5.82 1.48h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.51-8.42ZM12.09 21.8a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.86 9.86 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.82 9.82 0 0 1 7 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.89-9.9 9.89Zm5.43-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.21-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.52.08-.79.38-.28.3-1.04 1.02-1.04 2.48 0 1.47 1.06 2.89 1.2 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}