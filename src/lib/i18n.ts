export const locales = ["vi", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "vi";

export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);

export interface NavigationItem {
  label: string;
  href: string;
}

export interface HeroCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  availability: string;
  canvasLabel: string;
}

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export interface WorkGateway {
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface TOSItem {
  title: string;
  description: string;
}

export interface TestimonialCopy {
  quote: string;
  author: string;
  role: string;
}

export interface ContactSocial {
  label: string;
  value: string;
  href: string;
}

export interface ContactCopy {
  title: string;
  description: string;
  socials: ContactSocial[];
}

export interface PortfolioDictionary {
  localeLabel: string;
  brand: string;
  role: string;
  nav: NavigationItem[];
  hero: HeroCopy;
  stats: StatItem[];
  work: {
    eyebrow: string;
    title: string;
    description: string;
    gateways: WorkGateway[];
  };
  process: {
    eyebrow: string;
    title: string;
    workflow: {
      designerColTitle: string;
      clientColTitle: string;
      designerSteps: WorkflowStep[];
      clientSteps: WorkflowStep[];
    };
    tos: {
      title: string;
      items: TOSItem[];
    };
  };
  contact: ContactCopy;
  footerNote: string;
}

const workGateways: WorkGateway[] = [
  {
    id: "artwork",
    title: "Artworks",
    subtitle: "Character, Concept & Commissions",
    href: "/work/artworks",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    subtitle: "Brand Identity & Merch",
    href: "/work/graphic-design",
  },
];

const dictionaries: Record<Locale, PortfolioDictionary> = {
  vi: {
    localeLabel: "Tiếng Việt",
    brand: "Noirr",
    role: "ART & GRAPHIC DESIGNER",
    nav: [
      { label: "Dự án", href: "#work" },
      { label: "Quy trình", href: "#process" },
      { label: "Liên hệ", href: "#contact" },
    ],
    hero: {
      eyebrow: "",
      title: "PORTFOLIO",
      subtitle: "",
      description:
        "Xin chào! Mình là Noirr. Hiện tại, mình đang là sinh viên năm cuối chuyên ngành Digital Art & Design tại Đại học Văn Lang. Mình đam mê việc biến các ý tưởng nghệ thuật thành những sản phẩm thiết kế đồ họa trực quan, sáng tạo và mang đậm dấu ấn cá nhân.",
      primaryCta: "Xem dự án nổi bật",
      secondaryCta: "Bắt đầu trao đổi",
      availability: "Đang nhận 02 dự án mới trong quý này",
      canvasLabel: "3D mood object - realtime",
    },
    stats: [
      {
        value: "42+",
        label: "Dự án đã bàn giao",
        detail: "Từ landing page premium đến hệ thống web đa ngôn ngữ.",
      },
      {
        value: "97%",
        label: "Khách hàng quay lại",
        detail: "Tập trung vào quy trình rõ ràng và chất lượng triển khai ổn định.",
      },
      {
        value: "60fps",
        label: "Mục tiêu animation",
        detail: "Tối ưu motion bằng GSAP, Lenis và tách lớp rendering hợp lý.",
      },
    ],
    work: {
      eyebrow: "",
      title: "Dự án nổi bật",
      description:
        "Sự giao thoa giữa tư duy hình khối trong Digital Art và tính ứng dụng của Graphic Design.",
      gateways: workGateways,
    },
    process: {
      eyebrow: "Workflow & Guidelines",
      title: "Quy trình làm việc",
      workflow: {
        designerColTitle: "Designer",
        clientColTitle: "Client",
        designerSteps: [
          {
            step: "01",
            title: "Lorem ipsum",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            step: "02",
            title: "Sed do eiusmod",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            step: "03",
            title: "Ut enim ad",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          },
        ],
        clientSteps: [
          {
            step: "01",
            title: "Lorem ipsum",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            step: "02",
            title: "Sed do eiusmod",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            step: "03",
            title: "Ut enim ad",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          },
        ],
      },
      tos: {
        title: "Terms of Services",
        items: [
          { title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet." },
          {
            title: "Dolor sit amet",
            description: "Consectetur adipiscing elit sed do eiusmod.",
          },
          {
            title: "Sed do eiusmod",
            description: "Tempor incididunt ut labore et dolore magna.",
          },
          {
            title: "Ut enim ad",
            description: "Minim veniam quis nostrud exercitation.",
          },
        ],
      },
    },
    contact: {
      title: "Sẵn sàng cho dự án tiếp theo?",
      description: "Đừng ngần ngại liên hệ để chúng ta cùng thảo luận về ý tưởng của bạn.",
      socials: [
        {
          label: "Email",
          value: "cherrynguyenle133@gmail.com",
          href: "mailto:cherrynguyenle133@gmail.com",
        },
        { label: "Phone", value: "0975000210", href: "tel:0975000210" },
        {
          label: "Facebook",
          value: "facebook.com/noirr.design",
          href: "https://facebook.com/noirr.design",
        },
        {
          label: "Instagram",
          value: "@noirr.design",
          href: "https://instagram.com/noirr.design",
        },
        {
          label: "Zalo",
          value: "zalo.me/0975000210",
          href: "https://zalo.me/0975000210",
        },
      ],
    },
    footerNote: "Crafted for visual storytelling, motion identity and memorable digital presence.",
  },
  en: {
    localeLabel: "English",
    brand: "Noirr",
    role: "ART & GRAPHIC DESIGNER",
    nav: [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "",
      title: "PORTFOLIO",
      subtitle: "",
      description:
        "Hello! I am Noirr. Currently, I am a senior majoring in Digital Art & Design at Van Lang University. I am passionate about transforming artistic ideas into visual, creative, and highly personalized graphic design products.",
      primaryCta: "See featured work",
      secondaryCta: "Start a conversation",
      availability: "Accepting two new collaborations this quarter",
      canvasLabel: "3D mood object - realtime",
    },
    stats: [
      {
        value: "42+",
        label: "Projects delivered",
        detail: "From premium landing pages to multilingual web platforms.",
      },
      {
        value: "97%",
        label: "Repeat clients",
        detail: "Driven by clear process communication and stable implementation quality.",
      },
      {
        value: "60fps",
        label: "Motion target",
        detail: "Motion tuned with GSAP, Lenis, and clean rendering boundaries.",
      },
    ],
    work: {
      eyebrow: "",
      title: "Selected Works",
      description:
        "Where the spatial thinking of Digital Art meets the functionality of Graphic Design.",
      gateways: workGateways,
    },
    process: {
      eyebrow: "Workflow & Guidelines",
      title: "Working Process",
      workflow: {
        designerColTitle: "Designer",
        clientColTitle: "Client",
        designerSteps: [
          {
            step: "01",
            title: "Lorem ipsum",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            step: "02",
            title: "Sed do eiusmod",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            step: "03",
            title: "Ut enim ad",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          },
        ],
        clientSteps: [
          {
            step: "01",
            title: "Lorem ipsum",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            step: "02",
            title: "Sed do eiusmod",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
          {
            step: "03",
            title: "Ut enim ad",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
          },
        ],
      },
      tos: {
        title: "Terms of Services",
        items: [
          { title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet." },
          {
            title: "Dolor sit amet",
            description: "Consectetur adipiscing elit sed do eiusmod.",
          },
          {
            title: "Sed do eiusmod",
            description: "Tempor incididunt ut labore et dolore magna.",
          },
          {
            title: "Ut enim ad",
            description: "Minim veniam quis nostrud exercitation.",
          },
        ],
      },
    },
    contact: {
      title: "Ready for the next project?",
      description: "Feel free to reach out to discuss your ideas.",
      socials: [
        {
          label: "Email",
          value: "cherrynguyenle133@gmail.com",
          href: "mailto:cherrynguyenle133@gmail.com",
        },
        { label: "Phone", value: "0975000210", href: "tel:0975000210" },
        {
          label: "Facebook",
          value: "facebook.com/noirr.design",
          href: "https://facebook.com/noirr.design",
        },
        {
          label: "Instagram",
          value: "@noirr.design",
          href: "https://instagram.com/noirr.design",
        },
        {
          label: "Zalo",
          value: "zalo.me/0975000210",
          href: "https://zalo.me/0975000210",
        },
      ],
    },
    footerNote: "Crafted for visual storytelling, motion identity and memorable digital presence.",
  },
};

export const getDictionary = (locale: Locale): PortfolioDictionary =>
  dictionaries[locale];
