/** Indexable topic pages. Each page must stay unique — duplicated copy is ignored by Google. */
export type SeoLandingPage = {
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  keywords: string[];
  priority: number;
  breadcrumb: string;
  audience: string[];
  highlights: { title: string; body: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "gym-management-software",
    title: "Gym Management Software India | FITZENIX",
    description:
      "Gym management software for Indian gym owners. FITZENIX covers members, QR attendance, membership billing, dues and Owner, Trainer and Member apps. 14-day free trial on fitzenix.app.",
    h1: "Gym management software for Indian gym owners",
    intro:
      "Gym management software should replace the notebook, the WhatsApp renewal list and the separate billing sheet. FITZENIX on fitzenix.app is that system: members, attendance, payments and staff on one platform built for gyms in India.",
    keywords: [
      "gym management software",
      "gym management software India",
      "gym management system",
      "fitness center management software",
      "gym software India",
    ],
    priority: 0.95,
    breadcrumb: "Gym Management Software",
    audience: [
      "Independent gyms that still run renewals on paper or WhatsApp",
      "Owners who want one system for members, attendance and money",
      "Teams that need owner, trainer and member access",
    ],
    highlights: [
      {
        title: "Members and plans",
        body: "Add members, assign membership plans and see who is due for renewal without a spreadsheet.",
      },
      {
        title: "Attendance in the same system",
        body: "QR check-in and manual attendance sit next to the member record, so the front desk is not a second app.",
      },
      {
        title: "Payments and dues",
        body: "Track subscriptions, pending dues and revenue from the owner dashboard.",
      },
      {
        title: "Apps for the whole gym",
        body: "Growth and Pro include Owner, Trainer and Member apps. Starter covers core owner operations.",
      },
    ],
    sections: [
      {
        heading: "What gym management software should cover",
        paragraphs: [
          "A gym is not a generic shop. Owners need to know who is a member, who checked in today, which plan is expiring and which payment is still pending. FITZENIX is gym management software for that daily work, sold as a subscription on www.fitzenix.app.",
          "Plans start with a 14-day free trial, then Starter, Growth and Pro. There is no setup fee. You can move to a larger plan when the member count grows.",
        ],
      },
      {
        heading: "Built for India, listed only on fitzenix.app",
        paragraphs: [
          "FITZENIX is the gym management product at fitzenix.app. It is not a clothing or lifestyle store, and it is not the same as other sites that use a similar name.",
          "Owners use the web dashboard and the Owner app. Trainers and members use their own apps on Growth and Pro, so staff and members stay on the same records.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is gym management software?",
        answer:
          "Gym management software is a system for running a gym: member records, membership plans, attendance, payments and staff access. FITZENIX is that software for Indian gym owners, on fitzenix.app.",
      },
      {
        question: "Does FITZENIX work for a small gym in India?",
        answer:
          "Yes. Starter is for gyms up to 100 members and includes QR check-in, attendance and payments. You can start with a 14-day free trial.",
      },
      {
        question: "Is FITZENIX only a website, or is there an app?",
        answer:
          "Both. Owners use the web dashboard and Owner app. Growth and Pro also include Trainer and Member apps.",
      },
    ],
  },
  {
    slug: "gym-management-app",
    title: "Gym Management App India | FITZENIX",
    description:
      "Gym management app for Indian gyms with Owner, Trainer and Member apps. QR check-in, renewals and dues in one place. Start a 14-day free trial on fitzenix.app.",
    h1: "Gym management app for owners, trainers and members",
    intro:
      "A gym management app only helps if the owner, the trainer and the member are looking at the same gym. FITZENIX gives each role an app, backed by the same members, attendance and payments on fitzenix.app.",
    keywords: [
      "gym management app",
      "gym management app India",
      "gym owner app",
      "gym trainer app",
      "gym member app",
    ],
    priority: 0.9,
    breadcrumb: "Gym Management App",
    audience: [
      "Owners who want the gym on their phone, not only a desktop",
      "Trainers who need their assigned members and sessions",
      "Members who should check in and see their own membership",
    ],
    highlights: [
      {
        title: "Owner app",
        body: "See members, attendance, dues and the gym from the owner side on web and mobile.",
      },
      {
        title: "Trainer app",
        body: "On Growth and Pro, trainers manage assigned members, workouts and daily sessions.",
      },
      {
        title: "Member app",
        body: "On Growth and Pro, members check in, view workouts, track progress and see their membership.",
      },
      {
        title: "One record underneath",
        body: "Apps are not three separate products. Check-in, plans and payments stay on the same FITZENIX account.",
      },
    ],
    sections: [
      {
        heading: "Which FITZENIX app you get",
        paragraphs: [
          "Starter covers core gym operations for the owner, including members, QR check-in, attendance and payments. Growth and Pro add the Trainer app and the Member app, plus reports. Pro adds unlimited members, multi-staff access, advanced analytics and priority support.",
          "Download and sign-in start from fitzenix.app after you create an owner account. The marketing site and the product are the same brand: FITZENIX.",
        ],
      },
      {
        heading: "When an app is better than a register",
        paragraphs: [
          "Front-desk staff can mark attendance or let members scan a gym QR code. Owners do not wait until night to copy a paper list into a sheet. Trainers are not messaging the owner for a member’s plan status.",
          "If you only need the software overview, start with the gym management software page. This page is specifically about the Owner, Trainer and Member apps.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is FITZENIX a gym management app?",
        answer:
          "Yes. FITZENIX includes a web dashboard and mobile apps. Growth and Pro include Owner, Trainer and Member apps.",
      },
      {
        question: "Do members get a login?",
        answer:
          "On Growth and Pro, members get an app to check in, see workouts, track progress and view their membership.",
      },
      {
        question: "Can the owner use both web and mobile?",
        answer:
          "Yes. Owners can use the web dashboard and the Owner app for the same gym.",
      },
    ],
  },
  {
    slug: "gym-member-management-software",
    title: "Gym Member Management Software | FITZENIX",
    description:
      "Gym member management software to add members, assign plans and track renewals and dues. Includes attendance on the same profile. Free trial on fitzenix.app.",
    h1: "Gym member management software for plans and renewals",
    intro:
      "Member management breaks when names live in one sheet, payments in another and attendance in a notebook. FITZENIX keeps the member, their plan, their renewal and their check-ins on one profile.",
    keywords: [
      "gym member management software",
      "gym membership management",
      "member management for gym",
      "gym membership software",
      "gym member database",
    ],
    priority: 0.88,
    breadcrumb: "Member Management",
    audience: [
      "Gyms replacing Excel or a paper member register",
      "Owners who lose renewals because the due date is not visible",
      "Front desks that need a profile, not a chat thread",
    ],
    highlights: [
      {
        title: "Member profiles",
        body: "Store the member once, then attach the membership instead of retyping details every month.",
      },
      {
        title: "Plans and renewals",
        body: "Assign a plan and see renewals from the owner tools instead of a reminder list in WhatsApp.",
      },
      {
        title: "Dues on the member",
        body: "Pending payments stay with the member record so follow-up is part of operations, not a separate file.",
      },
      {
        title: "Attendance on the same profile",
        body: "QR and manual check-ins are recorded against the member, so you can see visit history with the plan.",
      },
    ],
    sections: [
      {
        heading: "How FITZENIX handles gym members",
        paragraphs: [
          "Starter supports up to 100 members. Growth supports up to 500. Pro is for unlimited members. Those limits are the membership capacity of the plan, not a separate product.",
          "Member management here means profiles, plans, renewals, dues and the attendance tied to that person. Workout tracking and trainer interaction are available as engagement tools, especially once Trainer and Member apps are on the plan.",
        ],
      },
      {
        heading: "What this page is not",
        paragraphs: [
          "This is not a generic CRM for every business, and it is not a store. It is member management inside FITZENIX gym software on fitzenix.app.",
          "Billing details live on the gym billing software page. Check-in details live on the gym attendance software page. Both connect back to the same member.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I manage gym memberships in FITZENIX?",
        answer:
          "Yes. Add members, assign membership plans and track renewals and pending dues from the owner dashboard.",
      },
      {
        question: "How many members can I add?",
        answer:
          "Starter is up to 100 members, Growth up to 500, and Pro is unlimited. You can upgrade when the gym grows.",
      },
      {
        question: "Do I still need a spreadsheet for renewals?",
        answer:
          "No. Renewals and dues are part of the member record in FITZENIX.",
      },
    ],
  },
  {
    slug: "gym-attendance-software",
    title: "Gym Attendance Software with QR Check-In | FITZENIX",
    description:
      "Gym attendance software with QR check-in and manual marking. See who is in the gym and review attendance history. 14-day free trial on fitzenix.app.",
    h1: "Gym attendance software with QR check-in",
    intro:
      "Gym attendance software should answer two questions: who is in the gym now, and who actually shows up. FITZENIX does that with a gym QR code members can scan, plus manual attendance when a scan is not possible.",
    keywords: [
      "gym attendance software",
      "gym attendance app",
      "QR check-in for gym",
      "gym check in system",
      "gym QR attendance",
    ],
    priority: 0.88,
    breadcrumb: "Attendance Software",
    audience: [
      "Front desks still using a paper register",
      "Owners who cannot tell who trained this week",
      "Gyms that want members to check in themselves",
    ],
    highlights: [
      {
        title: "QR check-in",
        body: "Share the gym QR code. Members scan it to check in instead of signing a book.",
      },
      {
        title: "Manual attendance",
        body: "Staff can still mark attendance when a member does not scan.",
      },
      {
        title: "History",
        body: "Attendance stays on the member, so you can review visits instead of guessing from memory.",
      },
      {
        title: "Tied to an active membership",
        body: "Check-in belongs to the same FITZENIX profile as the plan and the payment status.",
      },
    ],
    sections: [
      {
        heading: "How QR attendance works in FITZENIX",
        paragraphs: [
          "The owner shares a gym QR code. A member scans it to check in. The visit is stored as attendance, and the owner can see attendance from the dashboard and Owner app. Manual marking remains available.",
          "QR check-in is included from Starter upward, along with attendance. You do not buy a separate attendance device to start.",
        ],
      },
      {
        heading: "Attendance plus the rest of the gym",
        paragraphs: [
          "Attendance alone does not collect a fee or renew a plan. FITZENIX keeps check-in next to members and payments so a visit and a due date are visible together.",
          "Member apps on Growth and Pro can also be used for check-in. The attendance record is still the gym’s record, not a personal fitness tracker sold on its own.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can gym members check in with QR?",
        answer:
          "Yes. Owners share a gym QR code and members scan it to check in. Staff can also mark attendance manually.",
      },
      {
        question: "Can I see attendance history?",
        answer:
          "Yes. FITZENIX stores attendance against the member so owners can review who checked in.",
      },
      {
        question: "Is attendance software included in the free trial?",
        answer:
          "Yes. The 14-day trial includes members, attendance and QR check-in.",
      },
    ],
  },
  {
    slug: "gym-billing-software",
    title: "Gym Billing Software India | FITZENIX",
    description:
      "Gym billing software to track membership payments, pending dues, invoices and revenue. Pay your FITZENIX plan with Razorpay. Free trial on fitzenix.app.",
    h1: "Gym billing software for dues, plans and revenue",
    intro:
      "Gym billing software should show which membership was paid, which due is still open, and what the gym collected. FITZENIX tracks subscriptions, pending dues, invoices and revenue inside the same system as the member list.",
    keywords: [
      "gym billing software",
      "gym billing software India",
      "gym payment software",
      "gym fee management software",
      "gym invoice software",
    ],
    priority: 0.86,
    breadcrumb: "Gym Billing Software",
    audience: [
      "Owners chasing fees in chat messages",
      "Gyms that need pending dues next to the member name",
      "Teams that want revenue visible without a second accounts tool for daily fees",
    ],
    highlights: [
      {
        title: "Membership payments",
        body: "Record plan payments against the member so the front desk is not reconciling a notebook.",
      },
      {
        title: "Pending dues",
        body: "See who still owes fees and follow up from the owner dashboard.",
      },
      {
        title: "Invoices and reports",
        body: "Use billing and finance reports on the owner side to see revenue, not only a list of names.",
      },
      {
        title: "Your FITZENIX subscription",
        body: "The gym’s own FITZENIX plan is paid on Razorpay. FITZENIX does not store card numbers or UPI PINs.",
      },
    ],
    sections: [
      {
        heading: "Fees for your members",
        paragraphs: [
          "Starter includes payments. Growth adds reports and CRM. The billing tools cover membership plans, payments, billing, pending dues and finance reports — the money side of running the gym.",
          "This is operational billing for a gym, kept with attendance and member profiles. It is not a general accounting suite and it is not a shopping checkout for retail products.",
        ],
      },
      {
        heading: "How you pay for FITZENIX",
        paragraphs: [
          "After the 14-day trial, choose Starter, Growth or Pro. Checkout uses Razorpay (card, UPI, netbanking and other methods Razorpay offers). The server verifies the payment signature before the plan is activated. Receipts may be emailed through Zoho ZeptoMail.",
          "There is no setup fee. Plan prices are listed on the pricing section of fitzenix.app.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can FITZENIX track gym membership fees?",
        answer:
          "Yes. Track subscriptions, pending dues, invoices and revenue from the Owner app and web dashboard.",
      },
      {
        question: "Is there a setup fee for the billing tools?",
        answer:
          "No. There is no setup fee. You pay the monthly FITZENIX plan after the trial if you continue.",
      },
      {
        question: "Are member card details stored by FITZENIX?",
        answer:
          "FITZENIX does not store your card number or UPI PIN for the subscription you pay on Razorpay. Payment is completed on Razorpay’s checkout.",
      },
    ],
  },
  {
    slug: "fitness-studio-management-software",
    title: "Fitness Studio Management Software | FITZENIX",
    description:
      "Fitness studio management software for boutique gyms in India. Members, trainer access, QR attendance and payments on fitzenix.app. 14-day free trial.",
    h1: "Fitness studio management software for boutique gyms",
    intro:
      "A fitness studio still has members, trainers, check-ins and fees — just at a smaller scale than a large gym floor. FITZENIX is fitness studio management software for that work, with the same tools Indian gym owners use on fitzenix.app.",
    keywords: [
      "fitness studio management software",
      "fitness studio software",
      "boutique gym software",
      "studio management software India",
      "small gym management software",
    ],
    priority: 0.84,
    breadcrumb: "Fitness Studio Software",
    audience: [
      "Boutique studios and small gyms in India",
      "Owners who train and also run the front desk",
      "Studios that want trainers on their own app",
    ],
    highlights: [
      {
        title: "Small-gym starting point",
        body: "Starter is priced for a studio up to 100 members, with QR check-in, attendance and payments.",
      },
      {
        title: "Trainer access",
        body: "Growth and Pro add a Trainer app for assigned members, workouts and daily sessions.",
      },
      {
        title: "Member experience",
        body: "Members on Growth and Pro can check in, see workouts and view their membership.",
      },
      {
        title: "Room to grow",
        body: "Move from Starter to Growth or Pro when the studio adds members or staff. Pro supports unlimited members.",
      },
    ],
    sections: [
      {
        heading: "Studio operations FITZENIX covers",
        paragraphs: [
          "Studios use FITZENIX for member profiles, membership plans, QR or manual attendance, dues and the owner dashboard. You do not need a separate stack for the register and the fee list.",
          "FITZENIX does not claim to be class-scheduling software for every studio format. The product focus is members, attendance, payments, trainers and reports.",
        ],
      },
      {
        heading: "Why studios search for this separately",
        paragraphs: [
          "Many products branded as gym software assume a large floor and a full front-desk team. A studio owner often is the front desk. FITZENIX Starter is the fit for that size, and the apps on higher plans are there when you add trainers.",
          "The full product story is on the gym management software page. This page is for studio and boutique-gym searches.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is FITZENIX only for large gyms?",
        answer:
          "No. Starter is for smaller gyms and studios, up to 100 members, with QR check-in, attendance and payments.",
      },
      {
        question: "Can a studio add a trainer app later?",
        answer:
          "Yes. Upgrade to Growth or Pro when you want the Trainer and Member apps.",
      },
      {
        question: "Where do I sign up?",
        answer:
          "Create an account on www.fitzenix.app. The 14-day trial does not require a credit card.",
      },
    ],
  },
  {
    slug: "gym-crm-software",
    title: "Gym CRM Software India | FITZENIX",
    description:
      "Gym CRM software to keep member profiles, renewals, dues and follow-ups in one place. Included with FITZENIX Growth. Try the platform free on fitzenix.app.",
    h1: "Gym CRM software for renewals and member follow-up",
    intro:
      "A gym CRM is the member relationship, not a sales pipeline copied from another industry. FITZENIX keeps profiles, plans, renewals, dues and attendance together so follow-up starts from the member record.",
    keywords: [
      "gym CRM software",
      "gym crm",
      "gym customer management software",
      "gym lead and member software",
      "fitness CRM India",
    ],
    priority: 0.84,
    breadcrumb: "Gym CRM",
    audience: [
      "Owners who forget who to call for renewal",
      "Gyms whose member history is split across chats",
      "Teams that want CRM next to attendance and billing",
    ],
    highlights: [
      {
        title: "One member record",
        body: "Profile, plan, payments and check-ins stay together, which is the core of a gym CRM.",
      },
      {
        title: "Renewals and dues",
        body: "See who should renew and who still owes fees without exporting a sheet.",
      },
      {
        title: "CRM on Growth",
        body: "The Growth plan lists CRM with reports, plus Owner, Trainer and Member apps, up to 500 members.",
      },
      {
        title: "Notifications",
        body: "FITZENIX includes notifications so member updates are not only a manual phone list.",
      },
    ],
    sections: [
      {
        heading: "What CRM means inside FITZENIX",
        paragraphs: [
          "Growth includes CRM. That sits with member management, reports and the apps. It is for running relationships you already have in the gym: plans, dues, visits and trainer contact.",
          "Starter still manages members, attendance and payments. Choose Growth when you want CRM, reports and the trainer and member apps together.",
        ],
      },
      {
        heading: "CRM is not a separate login",
        paragraphs: [
          "You do not buy a second CRM and paste gym data into it. The owner opens FITZENIX and the member context is already there, including attendance from QR check-in.",
          "For a full feature map, use the home page. For fee collection detail, use the gym billing software page.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does FITZENIX include a gym CRM?",
        answer:
          "Yes. CRM is part of the Growth plan, together with reports and the Owner, Trainer and Member apps.",
      },
      {
        question: "Is CRM available on Starter?",
        answer:
          "Starter covers members, QR check-in, attendance and payments. CRM is listed on Growth. You can upgrade later.",
      },
      {
        question: "Can staff see the same member?",
        answer:
          "Owners manage the gym from the dashboard and Owner app. Pro adds multi-staff access. Trainers on Growth and Pro use the Trainer app for assigned members.",
      },
    ],
  },
  {
    slug: "about-fitzenix",
    title: "About FITZENIX | Gym Software on fitzenix.app",
    description:
      "FITZENIX on www.fitzenix.app is gym management software for Indian gym owners — members, QR attendance, billing and apps. Official site, not a shopping store.",
    h1: "About FITZENIX, the gym software on fitzenix.app",
    intro:
      "FITZENIX is gym management software for owners, trainers and members. The only official product site is www.fitzenix.app. If you found a clothing or lifestyle shop with a similar name, that is a different website.",
    keywords: [
      "FITZENIX",
      "fitzenix.app",
      "about fitzenix",
      "fitzenix gym management",
      "fitzenix software",
    ],
    priority: 0.8,
    breadcrumb: "About FITZENIX",
    audience: [
      "People confirming this is the official FITZENIX site",
      "Gym owners comparing the product before a trial",
      "Anyone who landed on a different site with a similar name",
    ],
    highlights: [
      {
        title: "Official site",
        body: "Use www.fitzenix.app for the product, pricing, trial and account. The API host is separate and is not the public site.",
      },
      {
        title: "What we build",
        body: "Member management, QR attendance, membership billing, owner tools, and Trainer and Member apps on higher plans.",
      },
      {
        title: "Where we operate",
        body: "FITZENIX is built for gyms in India. The studio is based in Guindy, Chennai, Tamil Nadu.",
      },
      {
        title: "How to start",
        body: "Start a 14-day free trial from the site. No credit card is required for the trial, and there is no setup fee.",
      },
    ],
    sections: [
      {
        heading: "The product in one paragraph",
        paragraphs: [
          "Gym owners use FITZENIX to add members, run QR or manual attendance, track membership payments and dues, and give trainers and members their own apps on Growth and Pro. Pricing is in Indian rupees, with Starter, Growth and Pro after the trial.",
          "Support email is support@fitzenix.app. Product questions can also go to hello@fitzenix.app.",
        ],
      },
      {
        heading: "Name and domain",
        paragraphs: [
          "Search results sometimes mix FITZENIX with unrelated shopping sites. The gym software brand is FITZENIX and the domain to trust is fitzenix.app.",
          "Read the gym management software page for the product, or the home page for pricing and the full feature list.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is FITZENIX?",
        answer:
          "FITZENIX is gym management software on www.fitzenix.app for Indian gym owners, with members, QR attendance, payments, and Owner, Trainer and Member apps.",
      },
      {
        question: "Is fitzenix.com the same product?",
        answer:
          "No. The official gym management product is only on fitzenix.app. Other sites with a similar name are unrelated.",
      },
      {
        question: "Where is FITZENIX based?",
        answer:
          "FITZENIX is based in Guindy, Chennai, Tamil Nadu, India, and serves gym owners in India.",
      },
    ],
  },
];

export function getSeoLandingPage(slug: string): SeoLandingPage | undefined {
  return seoLandingPages.find((page) => page.slug === slug);
}
