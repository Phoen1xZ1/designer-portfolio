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

export interface ProjectItem {
  title: string;
  category: string;
  year: string;
  challenge: string;
  outcome: string;
  tools: string[];
}

export interface ProcessItem {
  period: string;
  role: string;
  studio: string;
  description: string;
  wins: string[];
}

export interface CapabilityItem {
  title: string;
  detail: string;
}

export interface TestimonialCopy {
  quote: string;
  author: string;
  role: string;
}

export interface ContactCopy {
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
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
    items: ProjectItem[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    items: ProcessItem[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: CapabilityItem[];
  };
  testimonial: TestimonialCopy;
  contact: ContactCopy;
  footerNote: string;
}

const dictionaries: Record<Locale, PortfolioDictionary> = {
  vi: {
    localeLabel: "Tiếng Việt",
    brand: "Noirr",
    role: "Creative Developer & Visual Direction",
    nav: [
      { label: "Dự án", href: "#work" },
      { label: "Quy trình", href: "#process" },
      { label: "Năng lực", href: "#capabilities" },
      { label: "Liên hệ", href: "#contact" },
    ],
    hero: {
      eyebrow: "Portfolio cao cấp cho Designer",
      title: "Thiết kế có chiều sâu,\nchuyển hóa thành trải nghiệm số mượt mà",
      subtitle: "Không gian số được dàn dựng như một editorial sống động.",
      description:
        "Mỗi khung hình tập trung vào nhịp thị giác, chất liệu và cảm xúc thương hiệu, để người xem cảm nhận được cá tính ngay từ lần chạm đầu tiên.",
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
      eyebrow: "Case study",
      title: "Dự án được thiết kế quanh câu chuyện thương hiệu",
      description:
        "Không dùng bố cục card đều nhàm chán. Mỗi dự án có nhịp thị giác, chiều sâu nội dung và điểm nhấn chuyển động riêng.",
      items: [
        {
          title: "Astra Atelier",
          category: "Brand Portfolio",
          year: "2026",
          challenge:
            "Cần một website vừa đủ nghệ thuật cho studio nội thất cao cấp nhưng vẫn tải nhanh trên mobile.",
          outcome:
            "Thiết kế bất đối xứng có nhịp chuyển cảnh mềm, tăng 31% thời gian xem trang trong 5 tuần.",
          tools: ["Next.js", "GSAP", "Sanity", "Tailwind"],
        },
        {
          title: "Mirelle Objects",
          category: "Campaign Landing",
          year: "2025",
          challenge:
            "Bộ sưu tập sản phẩm có nhiều texture cần thể hiện cảm giác vật liệu mà không gây nặng trang.",
          outcome:
            "Áp dụng 3D nhẹ + lazy loading, giữ LCP dưới 2.2s trên thiết bị tầm trung.",
          tools: ["R3F", "Drei", "Next/Image", "Lenis"],
        },
        {
          title: "Noon Type Foundry",
          category: "Typography Showcase",
          year: "2025",
          challenge:
            "Yêu cầu trình diễn hệ chữ biến thiên và tương tác cuộn theo thời gian thực.",
          outcome:
            "Thiết lập motion pipeline đồng bộ ScrollTrigger, trải nghiệm liền mạch trên cả desktop và tablet.",
          tools: ["TypeScript", "ScrollTrigger", "Shadcn/ui", "Vercel"],
        },
      ],
    },
    process: {
      eyebrow: "Experience tree",
      title: "Hành trình thiết kế qua những dự án đã triển khai",
      description:
        "Mỗi chặng là một bài toán về cảm xúc, bố cục và cách kể câu chuyện thương hiệu trên môi trường số.",
      items: [
        {
          period: "2024 - Hiện tại",
          role: "Lead Web Designer",
          studio: "Freelance / Studio Projects",
          description:
            "Dẫn dắt các dự án portfolio cao cấp, xây visual direction xuyên suốt từ concept đến launch.",
          wins: [
            "Thiết kế website cho studio nội thất, thời gian onsite tăng 31%",
            "Xây guideline motion giúp team giữ chất lượng nhất quán",
            "Chuẩn hóa handover để client tự vận hành nội dung dễ hơn",
          ],
        },
        {
          period: "2022 - 2024",
          role: "Visual & Interaction Designer",
          studio: "Boutique Creative Team",
          description:
            "Phụ trách layout editorial và trải nghiệm tương tác cho các chiến dịch thương hiệu đa nền tảng.",
          wins: [
            "Thiết kế 18 landing page chiến dịch theo nhiều art direction",
            "Tăng tỉ lệ tương tác trung bình 24% qua tối ưu nhịp nội dung",
            "Thiết lập component library giúp rút ngắn thời gian sản xuất",
          ],
        },
        {
          period: "2020 - 2022",
          role: "Junior Brand Designer",
          studio: "In-house Brand Team",
          description:
            "Tập trung vào nền tảng nhận diện, hệ màu và ngôn ngữ typography cho sản phẩm số đầu tiên của thương hiệu.",
          wins: [
            "Hoàn thiện bộ visual assets phục vụ social và website",
            "Phối hợp team dev đưa design system vào sản phẩm thật",
            "Xây nền tảng art direction cho các dự án giai đoạn sau",
          ],
        },
      ],
    },
    capabilities: {
      eyebrow: "Năng lực sáng tạo",
      title: "Những năng lực lõi giúp website mang đúng tinh thần của một designer",
      items: [
        {
          title: "Visual System có cá tính",
          detail:
            "Xây palette, typography và nhịp bố cục mang dấu ấn thương hiệu thay vì dựa vào template phổ biến.",
        },
        {
          title: "Layout kể chuyện kiểu editorial",
          detail:
            "Tổ chức nội dung theo luồng cảm xúc, giúp người xem đọc và cảm nhận trang như một câu chuyện liền mạch.",
        },
        {
          title: "Motion chi tiết nhưng tiết chế",
          detail:
            "Tạo cảm giác cao cấp bằng chuyển động tinh tế, nhấn đúng điểm và không làm loãng thông điệp chính.",
        },
      ],
    },
    testimonial: {
      quote:
        "Trang portfolio mới giúp khách hàng hiểu phong cách của chúng tôi chỉ trong 30 giây đầu. Cảm giác thương hiệu nhất quán hơn rất nhiều.",
      author: "An Vy",
      role: "Creative Director, Astra Atelier",
    },
    contact: {
      title: "Sẵn sàng nâng tầm thương hiệu của bạn?",
      description:
        "Tôi luôn tìm kiếm những bài toán thiết kế mang tính thử thách. Hãy chia sẻ ý tưởng hoặc mục tiêu dự án của bạn, tôi sẽ phản hồi kèm theo định hướng thị giác trong vòng 24 giờ.",
      primaryAction: "Gửi email",
      secondaryAction: "Xem dự án",
    },
    footerNote: "Crafted for visual storytelling, motion identity and memorable digital presence.",
  },
  en: {
    localeLabel: "English",
    brand: "Noirr",
    role: "Creative Developer & Visual Direction",
    nav: [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      eyebrow: "Premium portfolio for designers",
      title: "Deep visual thinking,\ntranslated into smooth digital experiences",
      subtitle: "A digital space staged like a living editorial experience.",
      description:
        "Each frame is shaped around visual rhythm, texture, and brand emotion, so the audience can feel a distinct design voice from the very first interaction.",
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
      eyebrow: "Case studies",
      title: "Projects shaped around brand narrative",
      description:
        "No repetitive equal-card patterns. Each project has its own visual cadence, content depth, and motion signature.",
      items: [
        {
          title: "Astra Atelier",
          category: "Brand Portfolio",
          year: "2026",
          challenge:
            "The studio needed an artistic digital presence while staying lightweight on mobile hardware.",
          outcome:
            "An asymmetric layout with refined transitions increased session duration by 31% in five weeks.",
          tools: ["Next.js", "GSAP", "Sanity", "Tailwind"],
        },
        {
          title: "Mirelle Objects",
          category: "Campaign Landing",
          year: "2025",
          challenge:
            "The collection relied on rich surface detail that had to feel tactile without slowing the page.",
          outcome:
            "A lightweight 3D layer with lazy loading kept LCP below 2.2s on mid-range devices.",
          tools: ["R3F", "Drei", "Next/Image", "Lenis"],
        },
        {
          title: "Noon Type Foundry",
          category: "Typography Showcase",
          year: "2025",
          challenge:
            "The brief required variable typography presentation with realtime scroll interactions.",
          outcome:
            "A synchronized ScrollTrigger pipeline delivered seamless behavior on desktop and tablet.",
          tools: ["TypeScript", "ScrollTrigger", "Shadcn/ui", "Vercel"],
        },
      ],
    },
    process: {
      eyebrow: "Experience tree",
      title: "A design journey built through real collaborations",
      description:
        "Each stage reflects a different challenge in emotion, composition, and digital brand storytelling.",
      items: [
        {
          period: "2024 - Present",
          role: "Lead Web Designer",
          studio: "Freelance / Studio Projects",
          description:
            "Leading premium portfolio and campaign websites from concept framing to final launch.",
          wins: [
            "Designed a studio portfolio that improved average session depth by 31%",
            "Built motion guidelines to keep cross-page quality consistent",
            "Delivered cleaner handover flows for independent client updates",
          ],
        },
        {
          period: "2022 - 2024",
          role: "Visual & Interaction Designer",
          studio: "Boutique Creative Team",
          description:
            "Focused on editorial-style layout systems and interaction direction for brand campaigns.",
          wins: [
            "Shipped 18 campaign landing pages with varied art directions",
            "Raised average engagement by 24% through narrative restructuring",
            "Built reusable component foundations for faster production",
          ],
        },
        {
          period: "2020 - 2022",
          role: "Junior Brand Designer",
          studio: "In-house Brand Team",
          description:
            "Developed core brand visuals and typography decisions across early digital touchpoints.",
          wins: [
            "Produced visual assets used across social and web channels",
            "Collaborated with engineers to translate design system into product",
            "Established base art direction for future campaigns",
          ],
        },
      ],
    },
    capabilities: {
      eyebrow: "Creative capability",
      title: "Core strengths that make the portfolio feel designer-led, not template-led",
      items: [
        {
          title: "Distinct visual systems",
          detail:
            "Color, typography, and spacing are curated as a signature language instead of generic defaults.",
        },
        {
          title: "Editorial narrative layout",
          detail:
            "Content is arranged as visual storytelling so each section leads naturally to the next.",
        },
        {
          title: "Refined and intentional motion",
          detail:
            "Transitions are controlled and elegant, adding premium feel without overshadowing the core message.",
        },
      ],
    },
    testimonial: {
      quote:
        "The new portfolio helps clients understand our design voice in the first 30 seconds. The brand feels significantly more coherent.",
      author: "An Vy",
      role: "Creative Director, Astra Atelier",
    },
    contact: {
      title: "Ready to elevate your brand?",
      description:
        "I am always looking for design challenges with real impact. Share your idea or project goals, and I will reply with a visual direction proposal within 24 hours.",
      primaryAction: "Send email",
      secondaryAction: "View work",
    },
    footerNote: "Crafted for visual storytelling, motion identity and memorable digital presence.",
  },
};

export const getDictionary = (locale: Locale): PortfolioDictionary =>
  dictionaries[locale];
