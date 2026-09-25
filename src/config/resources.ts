export interface ResourceLink {
  label: string;
  href: string;
  description: string;
}

export interface ResourceArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  modifiedAt: string;
  readTime: string;
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
    bullets?: readonly string[];
  }[];
  relatedLinks: readonly ResourceLink[];
}

export interface ResourceCategory {
  slug: string;
  title: string;
  description: string;
  intro: string;
  guidance: readonly string[];
  resources: readonly ResourceLink[];
  relatedCategories: readonly string[];
}

export const resourceArticles: readonly ResourceArticle[] = [
  {
    slug: "gym-management-software-vs-excel",
    category: "gym-management",
    title: "Gym Management Software vs Excel: Which Fits Your Gym?",
    description:
      "A practical comparison of spreadsheets and gym management software for member records, attendance, memberships, and payment workflows.",
    excerpt:
      "Spreadsheets can work for a very small operation. This guide helps gym owners identify when connected workflows are worth the change.",
    publishedAt: "2026-09-25",
    modifiedAt: "2026-09-25",
    readTime: "7 min read",
    sections: [
      {
        heading: "Start with the work, not the tool",
        paragraphs: [
          "The right choice depends on how many daily decisions depend on the same member information. A spreadsheet may be enough for a small gym with a short member list and one person managing updates. As attendance, memberships, trainers, and payments grow, the cost of keeping separate records grows too.",
          "Before changing systems, list the recurring work your team performs: adding members, checking visits, following up on renewals, recording payments, and reviewing business activity. That list is more useful than comparing feature checklists in isolation.",
        ],
      },
      {
        heading: "Where Excel can become difficult",
        paragraphs: [
          "Spreadsheets are flexible, but they depend on consistent data entry and careful sharing. Duplicate member records, old versions, missing attendance updates, and formulas that only one person understands can make routine follow-up unreliable.",
        ],
        bullets: [
          "Member details and membership status can become spread across multiple files.",
          "Attendance, payment, and renewal context may require manual matching.",
          "Owners may not have a current view when they are away from the gym.",
        ],
      },
      {
        heading: "What connected gym software changes",
        paragraphs: [
          "A gym management platform brings member records, plans, attendance, payments, and reports into a shared workflow. FITZENIX is designed for gym owners, trainers, and members, with an owner dashboard and supported mobile experiences for daily operations.",
          "The benefit is not simply replacing a spreadsheet. It is reducing the number of times staff re-enter the same information and making the next action clearer, such as reviewing attendance or following up on a membership.",
        ],
      },
      {
        heading: "A practical decision checklist",
        paragraphs: [
          "Choose the approach your team can maintain every day. Ask whether the system makes member updates, check-in, membership follow-up, payment tracking, and reporting easier for the people who actually do the work.",
        ],
        bullets: [
          "Can staff find one reliable member record?",
          "Can the owner review attendance and payment context without combining files?",
          "Can members and trainers use the parts of the system relevant to them?",
          "Can the gym start small and expand its workflow as it grows?",
        ],
      },
    ],
    relatedLinks: [
      { label: "Explore gym management software", href: "/gym-management-software", description: "See the FITZENIX platform overview." },
      { label: "Compare FITZENIX pricing", href: "/pricing", description: "Review the free trial and current plans." },
      { label: "Read the daily gym checklist", href: "/resources/gym-operations/daily-gym-management-checklist", description: "Turn the decision into a practical workflow." },
    ],
  },
  {
    slug: "daily-gym-management-checklist",
    category: "gym-operations",
    title: "Daily Gym Management Checklist for Owners",
    description:
      "A practical opening, operating, and closing checklist for gym owners managing members, staff, attendance, payments, and facility routines.",
    excerpt:
      "A repeatable daily rhythm helps gym owners catch member, staff, and payment issues before they become end-of-month problems.",
    publishedAt: "2026-09-25",
    modifiedAt: "2026-09-25",
    readTime: "6 min read",
    sections: [
      {
        heading: "Opening checks",
        paragraphs: [
          "Start by confirming that the gym is ready for the first members and that the team knows the day’s priorities. The opening routine should be short enough to repeat consistently.",
        ],
        bullets: [
          "Check that the facility and training areas are ready for members.",
          "Review staff and trainer coverage for the day.",
          "Look at expiring memberships, pending follow-ups, and expected payments.",
          "Confirm that the attendance or check-in process is available to members.",
        ],
      },
      {
        heading: "During the day",
        paragraphs: [
          "The operating routine should keep member service and business administration visible without pulling the owner away from the gym. Assign clear ownership for member questions, trainer coordination, attendance corrections, and payment follow-up.",
        ],
        bullets: [
          "Record new members and update relevant member details promptly.",
          "Review attendance activity and help members when check-in needs a manual correction.",
          "Keep membership plans, subscriptions, and payment notes current.",
          "Capture member or trainer issues while the context is fresh.",
        ],
      },
      {
        heading: "Closing review",
        paragraphs: [
          "Before closing, review what changed during the day. The goal is not a long report; it is a reliable handoff to tomorrow.",
        ],
        bullets: [
          "Check that important member and payment updates were recorded.",
          "Note unresolved member, trainer, or facility issues.",
          "Review attendance and follow-up tasks that should carry into the next day.",
          "Identify one operational improvement for the next shift or week.",
        ],
      },
      {
        heading: "Use a shared operating view",
        paragraphs: [
          "FITZENIX gives owners a shared place for member management, attendance, plans, payments, staff activity, and reports. A system does not replace the checklist; it makes the information needed for the checklist easier to find and maintain.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Explore the gym management app", href: "/gym-management-app", description: "See the owner, trainer, and member app workflows." },
      { label: "Learn about attendance management", href: "/gym-attendance-management", description: "Build a clearer check-in routine." },
      { label: "Explore gym business resources", href: "/resources/gym-business", description: "Connect daily operations with longer-term growth." },
    ],
  },
  {
    slug: "gym-attendance-management-guide",
    category: "gym-attendance",
    title: "Gym Attendance Management Guide",
    description:
      "Learn how to track gym attendance, combine QR and manual check-in, and use visit history to improve owner and member workflows.",
    excerpt:
      "Reliable attendance records help owners understand visits, support members, and connect daily activity with membership follow-up.",
    publishedAt: "2026-09-25",
    modifiedAt: "2026-09-25",
    readTime: "6 min read",
    sections: [
      {
        heading: "Why attendance records matter",
        paragraphs: [
          "Attendance is more than a count of people in the gym. It gives owners context for member engagement, trainer conversations, capacity planning, and membership follow-up. The record is useful when it is consistent and connected to the right member.",
        ],
      },
      {
        heading: "Choose a check-in workflow",
        paragraphs: [
          "A digital attendance workflow should be quick for members and practical for staff. FITZENIX supports QR member check-in and manual attendance, so the gym can keep a reliable record when a member uses the normal flow or needs staff assistance.",
        ],
        bullets: [
          "Place the QR code where members can reach it without creating a queue.",
          "Explain the check-in step during member onboarding.",
          "Give staff a manual fallback for exceptions and assisted check-ins.",
          "Review visit history when a member needs a renewal or engagement conversation.",
        ],
      },
      {
        heading: "Turn attendance into useful follow-up",
        paragraphs: [
          "Attendance data becomes valuable when it leads to a clear action. A recent drop in visits may call for a member conversation, while consistent visits may be useful context for a progress or renewal discussion. Avoid treating one missed visit as a conclusion; look for patterns and combine them with member context.",
        ],
      },
      {
        heading: "Keep the workflow simple",
        paragraphs: [
          "Owners should be able to see today’s attendance and member visit history without reconciling separate registers. FITZENIX connects attendance with member records, memberships, trainers, and the owner dashboard so teams can use the information in the same place they manage the rest of the gym.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Explore gym attendance software", href: "/gym-attendance-software", description: "Review the supported attendance workflows." },
      { label: "Explore member management", href: "/gym-member-management-software", description: "Keep attendance connected to member records." },
      { label: "Review FITZENIX pricing", href: "/pricing", description: "See plans and the 14-day trial." },
    ],
  },
];

export const resourceCategories: readonly ResourceCategory[] = [
  {
    slug: "gym-management",
    title: "Gym Management Resources",
    description: "Clear guidance on gym management software, digital workflows, member records, and choosing the right operating system.",
    intro: "Gym management is the connected work behind members, attendance, memberships, trainers, payments, and daily decisions. These resources help owners assess their current process and improve it step by step.",
    guidance: ["Start with the workflows your team repeats every day.", "Keep member, attendance, membership, and payment context connected.", "Choose software that is practical for owners, trainers, and members to use consistently."],
    resources: [
      { label: "Gym Management Software vs Excel", href: "/resources/gym-management/gym-management-software-vs-excel", description: "Compare spreadsheets with connected gym workflows." },
      { label: "Gym management software", href: "/gym-management-software", description: "Explore FITZENIX for gym owners." },
      { label: "Gym management app", href: "/gym-management-app", description: "See the owner, trainer, and member app experience." },
    ],
    relatedCategories: ["gym-operations", "gym-members", "gym-business"],
  },
  {
    slug: "gym-operations",
    title: "Gym Operations Resources",
    description: "Practical operating guidance for gym owners, including daily routines, staff coordination, onboarding, reporting, and follow-up.",
    intro: "Strong gym operations come from repeatable routines and clear ownership. Use these resources to make the daily work visible without turning the gym into an administration project.",
    guidance: ["Use opening, operating, and closing routines that staff can actually repeat.", "Record important member and payment changes close to the time they happen.", "Review unresolved issues and attendance patterns before they become surprises."],
    resources: [
      { label: "Daily Gym Management Checklist", href: "/resources/gym-operations/daily-gym-management-checklist", description: "A practical checklist for owners and teams." },
      { label: "Gym management software", href: "/gym-management-software", description: "Connect daily operations in one platform." },
      { label: "Gym business resources", href: "/resources/gym-business", description: "Connect operations with business decisions." },
    ],
    relatedCategories: ["gym-attendance", "gym-trainers", "gym-business"],
  },
  {
    slug: "gym-members",
    title: "Gym Member Resources",
    description: "Useful guidance for member records, onboarding, attendance, progress, communication, retention, and member apps.",
    intro: "A member relationship is easier to manage when the team can find the right information and respond at the right time. These resources focus on practical member workflows.",
    guidance: ["Keep one current member record instead of repeating details across files.", "Use attendance and progress as context for helpful conversations.", "Make onboarding and renewal follow-up clear for both staff and members."],
    resources: [
      { label: "Gym member management software", href: "/gym-member-management-software", description: "Organize member profiles, plans, and activity." },
      { label: "Gym membership management", href: "/gym-membership-management", description: "Connect member plans and renewal context." },
      { label: "Gym management app", href: "/gym-management-app", description: "See the supported member app workflow." },
    ],
    relatedCategories: ["gym-attendance", "gym-memberships", "gym-trainers"],
  },
  {
    slug: "gym-attendance",
    title: "Gym Attendance Resources",
    description: "Guidance on gym attendance tracking, QR check-in, manual attendance, member visits, and useful attendance follow-up.",
    intro: "Attendance is useful when it is simple to record and easy to connect with member context. These resources cover practical digital and manual attendance workflows.",
    guidance: ["Teach members the normal check-in flow during onboarding.", "Keep a manual fallback for assisted or exceptional check-ins.", "Use visit patterns as context, not as a substitute for a member conversation."],
    resources: [
      { label: "Gym Attendance Management Guide", href: "/resources/gym-attendance/gym-attendance-management-guide", description: "Build a reliable attendance workflow." },
      { label: "Gym attendance software", href: "/gym-attendance-software", description: "Review QR and manual attendance support." },
      { label: "Gym member management", href: "/gym-member-management-software", description: "Connect visits to member records." },
    ],
    relatedCategories: ["gym-members", "gym-memberships", "gym-operations"],
  },
  {
    slug: "gym-memberships",
    title: "Gym Membership Resources",
    description: "Guidance on gym membership plans, renewals, expiry tracking, member records, and membership payments.",
    intro: "Membership management joins a commercial decision with an ongoing member relationship. These resources help owners keep plans, status, payments, and follow-up understandable.",
    guidance: ["Define plans that staff can explain and members can understand.", "Review expiry and payment context before a renewal conversation.", "Keep membership status close to member attendance and contact information."],
    resources: [
      { label: "Gym membership management software", href: "/gym-membership-management", description: "Organize plans, memberships, and renewals." },
      { label: "Gym member management software", href: "/gym-member-management-software", description: "Keep member activity in one record." },
      { label: "FITZENIX pricing", href: "/pricing", description: "Review current plans and the free trial." },
    ],
    relatedCategories: ["gym-members", "gym-payments", "gym-attendance"],
  },
  {
    slug: "gym-trainers",
    title: "Gym Trainer Resources",
    description: "Practical guidance on trainer coordination, staff workflows, assigned members, workouts, and progress conversations.",
    intro: "Trainer management is part of the member experience and the owner’s daily operating view. These resources focus on clear handoffs and supported trainer workflows.",
    guidance: ["Define which member information trainers need for their daily work.", "Keep trainer and member responsibilities clear during onboarding.", "Use progress and attendance context to support better trainer conversations."],
    resources: [
      { label: "Gym management app", href: "/gym-management-app", description: "See the supported trainer and member experiences." },
      { label: "Gym management software", href: "/gym-management-software", description: "Connect staff activity with owner operations." },
      { label: "Gym member resources", href: "/resources/gym-members", description: "Improve the member workflow trainers support." },
    ],
    relatedCategories: ["gym-members", "gym-operations", "fitness-business"],
  },
  {
    slug: "gym-payments",
    title: "Gym Payments Resources",
    description: "Guidance on gym payment tracking, subscriptions, pending dues, invoices, expenses, and revenue visibility.",
    intro: "Payment administration is easier when it is connected to the membership and member record it belongs to. These resources avoid accounting claims and focus on practical gym payment workflows.",
    guidance: ["Record payments and outstanding dues against the right member and plan.", "Use invoices and payment history to make follow-up more precise.", "Separate payment visibility from broader accounting responsibilities."],
    resources: [
      { label: "Gym billing software", href: "/gym-billing-software", description: "Track subscriptions, payments, invoices, and dues." },
      { label: "Gym membership management", href: "/gym-membership-management", description: "Connect payments with membership status." },
      { label: "Gym business resources", href: "/resources/gym-business", description: "Use payment visibility in business reviews." },
    ],
    relatedCategories: ["gym-memberships", "gym-business", "gym-operations"],
  },
  {
    slug: "gym-business",
    title: "Gym Business Resources",
    description: "Useful resources for gym owners covering daily decisions, member growth, retention, pricing, expenses, and digital operations.",
    intro: "A gym business needs both a good member experience and a clear operating rhythm. These resources help owners think through practical business decisions without promising shortcuts.",
    guidance: ["Review the business through members, attendance, payments, staff, and expenses.", "Treat retention as an operating habit, not a single marketing campaign.", "Digitize the workflows that give the owner better visibility and follow-up."],
    resources: [
      { label: "Daily Gym Management Checklist", href: "/resources/gym-operations/daily-gym-management-checklist", description: "Build a repeatable daily operating rhythm." },
      { label: "Gym management software vs Excel", href: "/resources/gym-management/gym-management-software-vs-excel", description: "Assess when connected software is useful." },
      { label: "Gym management software in India", href: "/gym-management-software-india", description: "Review INR pricing and mobile-first workflows." },
    ],
    relatedCategories: ["gym-management", "gym-operations", "fitness-business"],
  },
  {
    slug: "fitness-business",
    title: "Fitness Business Resources",
    description: "Broader guidance for fitness centers, studios, and gym businesses evaluating management workflows and technology.",
    intro: "Fitness businesses share many operational questions: how to manage members, teams, attendance, payments, and growth without losing the human experience. Start with the workflows that fit your business model.",
    guidance: ["Map the member journey from onboarding to regular attendance and renewal.", "Give owners and trainers the information they need without duplicating work.", "Choose technology that supports the business you run today and the next stage you can realistically operate."],
    resources: [
      { label: "Gym management solutions", href: "/solutions", description: "Explore FITZENIX workflows for gym businesses." },
      { label: "Gym management app", href: "/gym-management-app", description: "See web and mobile access for gym roles." },
      { label: "Gym business resources", href: "/resources/gym-business", description: "Read practical owner-focused guidance." },
    ],
    relatedCategories: ["gym-management", "gym-trainers", "gym-business"],
  },
];

export function getResourceCategory(slug: string) {
  return resourceCategories.find((category) => category.slug === slug);
}

export function getResourceArticle(category: string, slug: string) {
  return resourceArticles.find((article) => article.category === category && article.slug === slug);
}

export function getCategoryArticles(category: string) {
  return resourceArticles.filter((article) => article.category === category);
}