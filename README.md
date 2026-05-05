# Noirr — Designer Portfolio

Website portfolio cao cấp dành cho designer, tập trung vào storytelling thị giác, motion tinh tế và trải nghiệm số mượt mà. Dự án được xây dựng song ngữ VI/EN để dễ dàng chia sẻ cho khách hàng trong và ngoài nước.

## Tổng quan

- Mục tiêu: trình bày dự án, quy trình và năng lực thiết kế theo nhịp nội dung mang chất editorial.
- Định hướng: trải nghiệm mượt, giàu cảm xúc nhưng vẫn tối ưu hiệu năng và khả năng truy cập.
- Điều hướng: trang gốc tự chuyển về ngôn ngữ mặc định `/vi`, có thể chuyển sang `/en`.

## Tính năng nổi bật từ codebase

- Đa ngôn ngữ VI/EN với định tuyến theo locale, chuyển ngôn ngữ mượt bằng View Transition khi trình duyệt hỗ trợ.
- Motion mượt 60fps: GSAP + ScrollTrigger kết hợp Lenis cho smooth scroll, text reveal và parallax theo chiều cuộn.
- Hero 3D realtime bằng React Three Fiber/Three.js, lazy load theo viewport và tôn trọng `prefers-reduced-motion`.
- Header ẩn/hiện thông minh theo hành vi cuộn, giữ tập trung vào nội dung chính.
- Typography và layout có chủ đích (Be Vietnam Pro + JetBrains Mono), nhấn mạnh tinh thần portfolio designer.

## Tech Stack

**Core**
- Next.js (App Router)
- React 19
- TypeScript

**Styling & UI**
- Tailwind CSS v4
- shadcn/ui
- Base UI (`@base-ui/react`)
- class-variance-authority
- clsx
- tailwind-merge
- tw-animate-css

**Animation & Motion**
- GSAP (`gsap`, `@gsap/react`, `ScrollTrigger`)
- Lenis

**3D & Canvas**
- Three.js
- @react-three/fiber
- @react-three/drei

**Content / CMS-ready**
- next-sanity (chuẩn bị sẵn để mở rộng CMS)
- @portabletext/react
- @sanity/image-url

**Icons**
- lucide-react
- @phosphor-icons/react

**Tooling**
- ESLint
- PostCSS (`@tailwindcss/postcss`)
- Babel React Compiler (`babel-plugin-react-compiler`)

**Deploy**
- Vercel

## Hướng dẫn chạy Local (Dành cho Dev)

```bash
npm install
npm run dev
```

Mở http://localhost:3000 (sẽ tự điều hướng về `/vi`).

## Scripts hữu ích

```bash
npm run build
npm run start
npm run lint
```
