# Jerpai Project

This is a Next.js project bootstrapped with `create-next-app`, designed with a modern enterprise stack. It focuses on modular architecture, type safety, strict adherence to localization, performance, and creating interfaces that are flawlessly responsive across all device sizes.

## Project Overview

Jerpai is built to provide a robust and scalable foundation for web applications. It leverages the latest features of Next.js and React to deliver a high-performance and maintainable codebase.

**Key Features:**

*   **Next.js 16+ (App Router):** Utilizes the latest Next.js features for server-side rendering, routing, and API routes.
*   **TypeScript (Strict Mode):** Ensures type safety across the entire application, reducing bugs and improving code quality.
*   **React 19 RC (with React Compiler):** Benefits from the performance optimizations and new features of React 19, with the React Compiler enabled for enhanced rendering.
*   **Shadcn UI (Tailwind CSS):** Provides a beautiful and accessible component library, styled with Tailwind CSS for rapid UI development and customization.
*   **`ky` HTTP Client:** Exclusively used for all API interactions, offering a lightweight and powerful alternative to `fetch` or `axios`.
*   **`zod` Validation:** Mandatory for all input/output boundaries, ensuring data integrity and robust validation.
*   **`zustand` State Management:** Used for global client-side state management, providing a fast and flexible solution. Server Actions are used for mutations.
*   **Internationalization (`src/lang`):** All visible text is managed through language keys, ensuring easy localization and multi-language support.
*   **Mobile-First Design:** Prioritizes mobile user experience with fluid typography and responsive grids.
*   **ESLint Strict Compliance:** Enforces high code quality and consistency across the project.

## Architecture

The project follows a Feature-Sliced Design methodology, organizing code by domain logic to enhance modularity and maintainability.

*   **`src/app` (Router Layer):**
    *   Strictly uses Server Components for routing, metadata, and layout composition.
    *   Imports containers/components from `src/features`.
    *   Avoids client-side state (`useState`, `useEffect`) and Client Components unless absolutely necessary.
*   **`src/features` (Domain Layer):**
    *   Contains all core domain logic (e.g., authentication, shopping cart, user dashboard).
    *   Each feature has its own directory with sub-folders for `components`, `actions`, `services`, `store`, `types`, and `providers`.
*   **`src/components` (Global UI Layer):**
    *   Houses pure, dumb, and presentational components.
    *   Includes Shadcn UI base components and generic reusable UI atoms.
    *   Does not contain business logic or feature-specific store calls.
*   **`src/infrastructure` (Adapter Layer):**
    *   Configures the base `ky` instance with interceptors for authentication tokens and error handling.
    *   Manages logging services and analytics setups.
*   **`src/lang` (Dictionary Layer):**
    *   Stores JSON or TypeScript dictionaries for translations. All UI text must reference keys from these files.

## Installation

To get started with the Jerpai project, follow these steps:

### Prerequisites

*   Node.js (version 18 or higher recommended)
*   npm, Yarn, pnpm, or Bun

### Clone the Repository

```bash
git clone <repository-url>
cd jerpai
```

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Usage

### Development Server

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit the files.

### Building the Application

To build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Linting and Formatting

To lint and automatically fix code style issues:

```bash
npm run lint:fix
# or
yarn lint:fix
# or
pnpm lint:fix
# or
bun lint:fix
```

## Configuration

### Next.js Configuration

The `next.config.ts` file handles Next.js specific configurations, including:

*   **React Compiler:** Enabled by default for performance optimizations.
*   **Image Optimization:** Remote patterns for image sources are defined to ensure secure and efficient image loading.

```typescript
// next.config.ts
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bodo.nerpai.space",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
```

### Styling with Tailwind CSS

Tailwind CSS is configured via `postcss.config.mjs` and integrated with Shadcn UI for utility-first styling.

```javascript
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### Internationalization

All application text is managed in the `src/lang` directory. To add new languages or update existing translations, modify the corresponding files within this directory.

## Contribution Guidelines

We welcome contributions to the Jerpai project. Please adhere to the following guidelines:

*   **Feature-Sliced Design:** All new features and modifications must align with the Feature-Sliced Design architecture.
*   **TypeScript Strictness:** Maintain strict TypeScript typing throughout the codebase. Avoid `any` types.
*   **Mobile-First Development:** Design and implement UI components with a mobile-first approach.
*   **Data Handling:**
    *   Use `ky` for all HTTP requests.
    *   Validate all input and output data using `zod` schemas.
    *   Manage client-side state with `zustand` and server-side mutations with Server Actions.
*   **Code Quality:**
    *   Ensure all exported functions and components have JSDoc comments.
    *   Run `npm run lint --fix` before committing to ensure code style and quality.
    *   `husky` and `lint-staged` are configured to enforce linting and formatting on pre-commit.

## License

This project is licensed under the MIT License.

## Project Status

Jerpai is currently under active development.

## Resources

*   [Next.js Documentation](https://nextjs.org/docs)
*   [React Documentation](https://react.dev/docs)
*   [TypeScript Documentation](https://www.typescriptlang.org/docs/)
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs)
*   [Shadcn UI Documentation](https://ui.shadcn.com/)
*   [Ky Documentation](https://github.com/sindresorhus/ky)
*   [Zod Documentation](https://zod.dev/)
*   [Zustand Documentation](https://zustand-bear.pmnd.rs/)
