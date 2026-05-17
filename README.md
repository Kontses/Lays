# 🥔 Lay's Premium E-Commerce Demo

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-yellow?logo=vite&logoColor=white)](https://vite.dev/)
[![Material UI](https://img.shields.io/badge/Material--UI-9.0-blue?logo=mui&logoColor=white)](https://mui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer--Motion-12.3-pink?logo=framer&logoColor=white)](https://www.framer.com/motion/)

A premium, high-fidelity **Figma-to-Code** implementation of a modern, interactive e-commerce interface for **Lay's Chips**. This project showcases pixel-perfect design accuracy, custom design tokens, fluid spring-physics transitions, and highly responsive user-experience micro-interactions.

---

## 🌟 Live Demo & Visuals

Designed to deliver an engaging user experience, this application features a sleek dark/vibrant gradient background tailored to each chip flavor, interactive chip-bag physics, slide-peeks of the next products, and glassmorphic UI elements.

- **Dynamic Visual Transitions:** Auto-updating background gradients synchronized with product selection.
- **Spring-Physics Animation:** Ultra-smooth 3D-like product rotations and displacements using `Framer Motion`.
- **Glassmorphism Design:** A modern, visual UI using translucent panels and custom-themed Material UI elements.

---

## 🛠️ Technology Stack

This application is built with a modern frontend stack that mirrors industry-standard enterprise requirements:

### **Core Frontend**
*   **React 19:** Utilizing the latest declarative UI paradigms, component state hooks (`useState`), and optimized rendering lifecycles.
*   **TypeScript 6.0:** Full static typing across components, models, and theme parameters, ensuring codebase safety, easy refactoring, and auto-documentation.
*   **ES6+ JavaScript:** Native modern syntax (destructuring, arrow functions, template literals, async concepts).

### **Styling & UI Library**
*   **Material UI (MUI 9.0) & Emotion:** Customized layout elements using responsive grid configurations and system layout parameters (`sx`). Full integration of `CssBaseline` and customized palette tokens.
*   **Framer Motion 12.3:** Implementation of spring mechanics, hardware-accelerated animations (`AnimatePresence`), entry/exit variants, and dynamic interactive feedback.

### **Build Tooling & Pipeline**
*   **Vite 8.0:** Hot Module Replacement (HMR) for instant development feedback, and Rollup-based production builds.
*   **ESLint 10.3:** Standardized strict rulesets (`globals`, `typescript-eslint`) keeping the code clean, robust, and free of lint errors.

---

## 💼 Core Competencies & Technical Standards Showcase

This repository is engineered to demonstrate high-level industry competencies, modern development workflows, and frontend engineering best practices:

| Target Technical Competence | Project Implementation & Proof-of-Skill |
| :--- | :--- |
| **Advanced React.js Architecture** | Built with fully modular, clean functional components, state hooks, and declarative rendering structures. |
| **Modern React Workflows** | Dynamic component-driven flow, state synchronization between slider, header components, and external dataset. |
| **Material UI (MUI) Integration** | Full high-end custom implementation of **Material UI (MUI v9)**, overrides, and fluid layouts with Emotion styles. |
| **Figma-to-Code Fidelity** | 1-to-1 pixel-perfect Figma translation, featuring custom typography pairing (Mona Sans), spacing scales, and custom icon assets. |
| **Modern Frontend Build Pipelines** | Powered by **Vite 8.0** and **TypeScript 6.0**, incorporating linting standards via ESLint. |
| **E-Commerce Application Design** | E-Commerce demo structure including pricing systems, shopping bag counters, interactive buying buttons, and catalog routing placeholders. |
| **Testing & Verification Readiness** | Clean separation of concerns (presentation vs. business data in `src/data.ts`) to easily enable robust Unit, Integration, and System testing. |
| **Performance & Audit Compliance** | Hardware-accelerated transitions, optimized layouts, high Lighthouse audit compliance, and minimal layout shifts (CLS). |
| **Agile & Version Control Standards** | Production-ready, highly readable folder structure with descriptive naming conventions, fully documented components, and clean Git commits. |

---

## 📂 Project Architecture

```directory
Lays/
├── public/                 # Static assets, SVG icons, and raw images
├── src/
│   ├── assets/             # Project visual resources
│   ├── components/
│   │   ├── Header.tsx      # Responsive glassmorphic navigation bar
│   │   └── Slider.tsx      # Core interactive carousel with Framer Motion
│   ├── data.ts             # Decoupled mock database of Lays products (Gradients, Images, Copy)
│   ├── theme.ts            # Material UI Theme configuration (Typography, Colors)
│   ├── App.tsx             # Theme provider and main layout entrypoint
│   ├── main.tsx            # DOM root renderer
│   └── index.css           # Global custom typography and resets
├── eslint.config.js        # Strict ESLint configuration
├── tsconfig.json           # Compiler rules for TypeScript
└── vite.config.ts          # Vite pipeline config
```

---

## 🚀 Getting Started

Follow these simple instructions to run the project locally on your machine.

### **Prerequisites**
Make sure you have **Node.js** (v18+) and **npm** installed.

### **1. Clone the repository**
```bash
git clone https://github.com/Kontses/Lays.git
cd Lays
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Start the Development Server**
Runs the app in development mode with active HMR.
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application.

### **4. Production Build**
Compiles and optimizes the TypeScript project for production.
```bash
npm run build
```

### **5. Code Linting**
Inspects code for style discrepancies and typescript errors.
```bash
npm run lint
```

---

## 🎨 UI/UX Features Highlights
*   **Dynamic Custom Cursor / Hover Indicators:** Highly detailed interactive buttons with beautiful micro-animations for increased CTR.
*   **Intelligent Responsive Scaling:** Dynamic resizing using custom typography rules to guarantee readability from mobile layouts up to widescreen monitors.
*   **Accessible Semantic Markup:** Fully compliant with accessibility requirements, including customized `aria-labels` on all icon triggers and keyboard controls capability.
