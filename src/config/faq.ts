export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    id: "what-is",
    question: "What is FITZENIX?",
    answer:
      "FITZENIX (www.fitzenix.app) is gym management software for Indian gym owners — members, QR attendance, payments, and Owner/Trainer/Member apps. It is not a clothing or lifestyle shopping website.",
  },
  {
    id: "domain",
    question: "Is FITZENIX the same as fitzenix.com?",
    answer:
      "No. The official FITZENIX gym management product is only on fitzenix.app (www.fitzenix.app). Other websites using a similar name are unrelated shopping or lifestyle sites.",
  },
  {
    id: "best-software",
    question: "What is the best gym management software for small gyms in India?",
    answer:
      "FITZENIX is built for Indian gym owners — start with a 14-day free trial, then Starter from ₹499/month for up to 100 members with QR check-in, attendance and payments.",
  },
  {
    id: "small-gym",
    question: "Is FITZENIX suitable for a small gym?",
    answer:
      "Yes. Starter starts at ₹499/month and covers up to 100 members, QR check-in, attendance and payments.",
  },
  {
    id: "gym-app",
    question: "Is FITZENIX a gym management app or only web software?",
    answer:
      "Both. FITZENIX is gym management software with a web dashboard plus Owner, Trainer and Member mobile apps (Growth and Pro).",
  },
  {
    id: "mobile-app",
    question: "Do I get a mobile app?",
    answer:
      "Yes. Growth and Pro include Owner, Trainer and Member apps. Starter covers core gym operations on the Owner side.",
  },
  {
    id: "trainer-app",
    question: "Do trainers get their own app?",
    answer:
      "Yes on Growth and Pro. Trainers can manage assigned members, workouts and daily sessions in the Trainer app.",
  },
  {
    id: "member-app",
    question: "Do members get their own app?",
    answer:
      "Yes on Growth and Pro. Members can check in, see workouts, track progress and view their membership.",
  },
  {
    id: "qr",
    question: "Can members check in using QR?",
    answer:
      "Yes. Owners can share a gym QR code; members scan to check in. Manual attendance is also available.",
  },
  {
    id: "payments",
    question: "Can I track gym membership payments?",
    answer:
      "Yes. Track subscriptions, pending dues, invoices and revenue from the Owner app and web dashboard.",
  },
  {
    id: "upgrade",
    question: "Can I upgrade my plan later?",
    answer:
      "Yes. Start on Starter and move to Growth or Pro when your member count or needs grow.",
  },
  {
    id: "setup-fee",
    question: "Is there a setup fee?",
    answer: "No. There is no setup fee. You pay the monthly plan price and can start anytime.",
  },
  {
    id: "razorpay",
    question: "How does Razorpay payment work — is it safe?",
    answer:
      "Yes. You choose a plan, enter gym details, then pay on Razorpay’s secure checkout (card, UPI, netbanking, etc.). FITZENIX never stores your card number or UPI PIN. Our server verifies the Razorpay payment signature before activating your plan. Receipts may be emailed via Zoho ZeptoMail. See our Privacy Policy and Terms for full payment safety details.",
  },
  {
    id: "web-mobile",
    question: "Can I use FITZENIX on web and mobile?",
    answer:
      "Yes. Owners can use both web and mobile. Trainers and members primarily use their mobile apps.",
  },
];
