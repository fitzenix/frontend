export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "small-gym",
    question: "Is FITZENIX suitable for a small gym?",
    answer:
      "Yes. Basic starts at ₹999/month and covers members, attendance, memberships and mobile access — enough for a small gym to run day to day.",
  },
  {
    id: "mobile-app",
    question: "Do I get a mobile app?",
    answer:
      "Yes. You get the Owner mobile app (and web access). Pro and Premium include Owner, Trainer and Member apps.",
  },
  {
    id: "trainer-app",
    question: "Do trainers get their own app?",
    answer:
      "Yes on Pro and Premium. Trainers can manage assigned members, workouts and daily sessions in the Trainer app.",
  },
  {
    id: "member-app",
    question: "Do members get their own app?",
    answer:
      "Yes on Pro and Premium. Members can check in, see workouts, track progress and view their membership.",
  },
  {
    id: "qr",
    question: "Can members check in using QR?",
    answer:
      "Yes. Owners can share a gym QR code; members scan to check in. Manual attendance is also available.",
  },
  {
    id: "payments",
    question: "Can I track payments?",
    answer:
      "Yes. Track subscriptions, pending dues, invoices and revenue from the Owner app and web dashboard.",
  },
  {
    id: "upgrade",
    question: "Can I upgrade my plan later?",
    answer:
      "Yes. Start on Basic and move to Pro or Premium when your member count or needs grow.",
  },
  {
    id: "setup-fee",
    question: "Is there a setup fee?",
    answer: "No. There is no setup fee. You pay the monthly plan price and can start anytime.",
  },
  {
    id: "razorpay",
    question: "How does Razorpay payment work?",
    answer:
      "You choose a plan, enter gym details, then pay securely via Razorpay. The server verifies the payment before activating your plan.",
  },
  {
    id: "web-mobile",
    question: "Can I use FITZENIX on web and mobile?",
    answer:
      "Yes. Owners can use both web and mobile. Trainers and members primarily use their mobile apps.",
  },
];
