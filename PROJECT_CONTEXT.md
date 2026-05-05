# PROJECT_CONTEXT — Noirr

Tài liệu bối cảnh ngắn gọn nhưng đầy đủ để AI khác hiểu nhanh cấu trúc, mục tiêu, và logic cốt lõi của dự án.

## Project Identity

- Tên dự án: Noirr
- Mục tiêu: portfolio cao cấp cho designer, tập trung kể chuyện thị giác và tạo cảm giác premium.
- Phong cách thiết kế: editorial layout, nhịp chữ mạnh, motion tinh tế, kết hợp mảng 3D realtime ở hero.
- Định hướng trải nghiệm: mượt, giàu cảm xúc, tối ưu hiệu năng và tôn trọng prefers-reduced-motion.

## Tech Stack

**Framework & ngôn ngữ**
- Next.js (App Router)
- React 19
- TypeScript

**UI / Styling**
- Tailwind CSS v4 (config theo CSS-first, không có tailwind.config.js)
- shadcn/ui (styles import qua CSS)
- Base UI (@base-ui/react)
- class-variance-authority, clsx, tailwind-merge

**Animation & Motion**
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- Framer Motion: không sử dụng trong codebase hiện tại (không có trong dependencies)

**3D / Canvas**
- Three.js
- @react-three/fiber
- @react-three/drei

**CMS-ready (chưa dùng trực tiếp)**
- next-sanity, @portabletext/react, @sanity/image-url (đã cài, hiện chưa có integration trong UI)

## Architecture & Folder Structure

**/src/app** (Next.js App Router)
- [src/app/layout.tsx](src/app/layout.tsx): root layout, khai báo font, metadata và bọc SmoothScrollProvider.
- [src/app/page.tsx](src/app/page.tsx): redirect về locale mặc định.
- [src/app/[locale]/page.tsx](src/app/[locale]/page.tsx): trang chính, render hero, work gateways, workflow + TOS, contact.
- [src/app/[locale]/template.tsx](src/app/[locale]/template.tsx): template để remount tree theo route, tránh animation bị đứng khi back/forward.
- [src/app/globals.css](src/app/globals.css): hệ thống theme, palette, background, grid overlay và các class utility nội bộ.

**/src/components**
- /3d: canvas 3D cho hero.
  - [src/components/3d/hero-canvas.tsx](src/components/3d/hero-canvas.tsx): scene 3D chính.
  - [src/components/3d/lazy-hero-canvas.tsx](src/components/3d/lazy-hero-canvas.tsx): lazy-load theo viewport + reduced-motion.
- /animations: motion system.
  - [src/components/animations/smooth-scroll-provider.tsx](src/components/animations/smooth-scroll-provider.tsx): Lenis + GSAP ticker + ScrollTrigger.
  - [src/components/animations/infinite-marquee.tsx](src/components/animations/infinite-marquee.tsx): marquee chạy vô hạn.
  - [src/components/animations/kinetic-text.tsx](src/components/animations/kinetic-text.tsx): chữ chuyển động theo ký tự.
  - [src/components/animations/testimonials-marquee.tsx](src/components/animations/testimonials-marquee.tsx): marquee testimonial (hiện không dùng trên homepage).
  - [src/components/animations/section-reveal.tsx](src/components/animations/section-reveal.tsx): reveal khi scroll.
- /portfolio: các khối layout chính.
  - [src/components/portfolio/portfolio-header.tsx](src/components/portfolio/portfolio-header.tsx): header tổng (nav, language toggle, luôn sticky).
  - [src/components/portfolio/spotlight-nav.tsx](src/components/portfolio/spotlight-nav.tsx): spotlight + active nav.
  - [src/components/portfolio/command-menu.tsx](src/components/portfolio/command-menu.tsx): command menu (hiện không dùng).
  - [src/components/portfolio/language-toggle.tsx](src/components/portfolio/language-toggle.tsx): chuyển ngôn ngữ có view transition.
  - [src/components/portfolio/scroll-aware-header.tsx](src/components/portfolio/scroll-aware-header.tsx): wrapper header sticky (không ẩn theo scroll).
  - [src/components/portfolio/project-gateways.tsx](src/components/portfolio/project-gateways.tsx): Category Gateways (accordion flex).
  - [src/components/portfolio/workflow-section.tsx](src/components/portfolio/workflow-section.tsx): Workflow + TOS.
  - [src/components/portfolio/contact-section.tsx](src/components/portfolio/contact-section.tsx): Contact layout 2 cột + socials.
- /ui: các component nền tảng theo style shadcn/base-ui (button, card, badge, ...).

**/src/hooks**
- [src/hooks/use-text-reveal.ts](src/hooks/use-text-reveal.ts): text reveal ngẫu nhiên theo seed.
- [src/hooks/use-parallax-media.ts](src/hooks/use-parallax-media.ts): parallax media theo scroll.
- [src/hooks/use-active-section.ts](src/hooks/use-active-section.ts): xác định section đang active cho nav.

**/src/lib**
- [src/lib/i18n.ts](src/lib/i18n.ts): dictionary nội dung VI/EN và typed schema.
- [src/lib/utils.ts](src/lib/utils.ts): hàm cn (clsx + tailwind-merge).

## Core Features & Logic

**1) Đa ngôn ngữ (i18n)**
- Khai báo locales trong [src/lib/i18n.ts](src/lib/i18n.ts), gồm `vi` và `en`.
- Trang gốc redirect về default locale ở [src/app/page.tsx](src/app/page.tsx).
- Generate static params theo locale trong [src/app/[locale]/page.tsx](src/app/[locale]/page.tsx).
- Language toggle dùng view transition (nếu trình duyệt hỗ trợ) ở [src/components/portfolio/language-toggle.tsx](src/components/portfolio/language-toggle.tsx).
- `work` dùng mảng `gateways` (Category Gateways). `contact` có mảng `socials` để render danh sách liên hệ.

**2) Animation 60fps & tối ưu motion**
- Smooth scroll bằng Lenis, đồng bộ với GSAP ticker và ScrollTrigger trong [src/components/animations/smooth-scroll-provider.tsx](src/components/animations/smooth-scroll-provider.tsx).
- Text reveal và parallax dùng GSAP + ScrollTrigger, tôn trọng prefers-reduced-motion trong [src/hooks/use-text-reveal.ts](src/hooks/use-text-reveal.ts) và [src/hooks/use-parallax-media.ts](src/hooks/use-parallax-media.ts).
- Marquee và kinetic text có kiểm tra prefers-reduced-motion và re-init theo route trong [src/components/animations/infinite-marquee.tsx](src/components/animations/infinite-marquee.tsx) và [src/components/animations/kinetic-text.tsx](src/components/animations/kinetic-text.tsx).
- Template [src/app/[locale]/template.tsx](src/app/[locale]/template.tsx) giúp remount tree theo route để tránh freeze khi back/forward.

**3) 3D hero tối ưu hiệu năng**
- Scene 3D chỉ render khi viewport lớn và không bật reduced motion, lazy-load bằng IntersectionObserver trong [src/components/3d/lazy-hero-canvas.tsx](src/components/3d/lazy-hero-canvas.tsx).
- Canvas cấu hình ưu tiên hiệu năng trong [src/components/3d/hero-canvas.tsx](src/components/3d/hero-canvas.tsx).

**4) Quản lý state**
- Không dùng state management library.
- State nằm ở component level (React hooks), tập trung cho scroll, menu, và animation.

## Key Components (logic nổi bật)

- **Hero section**: Hero text + TechStackMarquee + 3D canvas (lazy), ở [src/app/[locale]/page.tsx](src/app/[locale]/page.tsx).
- **Work Gateways**: layout Category Gateways dạng accordion flex, ở [src/components/portfolio/project-gateways.tsx](src/components/portfolio/project-gateways.tsx).
- **Workflow + TOS**: quy trình làm việc và điều khoản dịch vụ, ở [src/components/portfolio/workflow-section.tsx](src/components/portfolio/workflow-section.tsx).
- **Contact**: layout 2 cột với danh sách socials, ở [src/components/portfolio/contact-section.tsx](src/components/portfolio/contact-section.tsx).
- **Header system**: spotlight nav + language toggle, sticky luôn hiển thị, ở [src/components/portfolio/portfolio-header.tsx](src/components/portfolio/portfolio-header.tsx).

## Style System

- Global theme variables và palette theo OKLCH trong [src/app/globals.css](src/app/globals.css).
- Font: Be Vietnam Pro (body + heading) và JetBrains Mono (mono) khai báo trong [src/app/layout.tsx](src/app/layout.tsx).
- Nền có radial gradients + grid overlay để tạo “atmosphere”.
- Các class nội bộ chính: `.portfolio-shell`, `.portfolio-atmosphere`, `.portfolio-grid-overlay`, `.nav-link`, `.nav-spotlight`, `.work-card`, `.editorial-link`, `.marquee-line`.
- Tailwind config theo CSS-first (không có file tailwind.config.js), sử dụng `@theme` và `@custom-variant` ngay trong globals.

## Gợi ý khi mở rộng

- Nếu cần CMS thật sự, có thể tích hợp Sanity dựa trên dependencies đã sẵn có.
- Nếu thêm animation phức tạp, tiếp tục dùng GSAP/ScrollTrigger để giữ tính đồng nhất.
- Nếu cần state toàn cục, có thể bổ sung store nhẹ (Zustand), nhưng hiện tại chưa cần.
