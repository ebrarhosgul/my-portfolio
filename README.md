# Ebrar Hosgul | Frontend Developer & UI Architect

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-white?style=for-the-badge&logo=three.js&logoColor=black)](https://docs.pmnd.rs/react-three-fiber)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Architecting Digital Perfection.**
>
> High-performance, cinematic, and scalable personal portfolio built with modern web technologies.

## 🚀 Overview

This repository hosts the source code for my personal portfolio, engineered to bridge the gap between **complex backend logic** and **pixel-perfect frontend experiences**.

It is designed not just as a showcase of projects, but as a testament to **web performance**, **accessibility**, and **immersive UI/UX**.

🔗 **Live URL:** [ebrarhosgul.com](https://ebrarhosgul.com)

## ⚡ Key Features

- **Immersive 3D & Motion:**
  - **React Three Fiber (R3F):** Custom shaders and particle systems (Beams, LightRays) running on the GPU.
  - **GSAP (GreenSock):** Scroll-driven animations and micro-interactions.
- **Modern Architecture:**
  - **Next.js 16 (App Router):** Leveraging Server Components (RSC) for initial load speed.
  - **Type-Safe:** 100% TypeScript coverage with strict strict type checking.
- **Analytics:** Integrate GA4 for custom event tracking.
- **SEO Optimized:** Dynamic metadata generation, semantic HTML structure, and Open Graph protocol implementation.

## 🛠 Tech Stack

| Category          | Technology                                  |
| ----------------- | ------------------------------------------- |
| **Framework**     | Next.js 16 (App Router)                     |
| **Language**      | TypeScript                                  |
| **Styling**       | Tailwind CSS                                |
| **Animation**     | GSAP                                        |
| **3D / WebGL**    | Three.js, React Three Fiber, Drei           |
| **Form Handling** | Server Actions (React 19), Zod (Validation) |
| **Email Service** | Resend API                                  |
| **Deployment**    | Vercel                                      |

## 📂 Project Structure

```bash
├── actions/
├── app/
├── components/
│   ├── Hero/
│   ├── About/
│   ├── Projects/
│   └── Contact/
├── lib/
├── public/
└── types/
```

## 🚦 Running Locally

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/ebrarhosgul/my-portfolio.git](https://github.com/ebrarhosgul/my-portfolio.git)
    cd my-portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:

    ```env
    RESEND_API_KEY=123456789
    CONTACT_EMAIL=yourmail@example.com
    NEXT_PUBLIC_GA_ID=G-XXXXXXXXX
    ```

4.  **Run the development server:**

    ```
    npm run dev
    ```

5.  **Open the website:**

    ```bash
    http://localhost:3000
    ```

## 🤝 Contact

I am currently open to Frontend Developer roles where I can contribute to scalable products.

LinkedIn: [Ebrar Muhammed Hosgul](https://www.linkedin.com/in/ebrarhosgul)

## 📝 License

This project is [MIT](LICENSE) licensed
