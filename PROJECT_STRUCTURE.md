# Travel Web App - Project Structure

This document provides a comprehensive overview of the project structure, including the purpose of each file and directory.

## 📁 Root Directory

### Configuration Files

- **`package.json`** - Project dependencies, scripts, and metadata. Defines npm/yarn scripts for development, build, lint, and preview.
- **`package-lock.json`** / **`yarn.lock`** - Dependency lock files ensuring consistent package versions across environments.
- **`tsconfig.json`** - TypeScript root configuration that references app and node-specific configs.
- **`tsconfig.app.json`** - TypeScript configuration for application code (React components, source files).
- **`tsconfig.node.json`** - TypeScript configuration for Node.js tooling (Vite config, build scripts).
- **`vite.config.ts`** - Vite build tool configuration. Sets up React plugin and path aliases (`@` → `./src`).
- **`eslint.config.js`** - ESLint configuration for code quality and consistency. Includes React hooks and TypeScript rules.
- **`tailwind.config.js`** - Tailwind CSS configuration for utility-first styling.
- **`postcss.config.js`** - PostCSS configuration for processing CSS (Tailwind and Autoprefixer).
- **`.prettierrc`** - Prettier code formatter configuration.
- **`.commitlintrc.json`** - Commit message linting rules (Conventional Commits).
- **`.lintstagedrc.json`** - Lint-staged configuration for running linters on staged files.
- **`.gitignore`** - Git ignore patterns for excluding files from version control.

### Entry Files

- **`index.html`** - HTML entry point for the application. Contains the root div where React mounts.

### Directories

- **`dist/`** - Build output directory containing compiled and bundled production files.
- **`node_modules/`** - NPM/Yarn dependencies (excluded from version control).
- **`public/`** - Static assets served directly (e.g., `vite.svg`).
- **`src/`** - Main source code directory (see detailed structure below).

---

## 📁 Source Directory (`src/`)

### Root Source Files

- **`main.tsx`** - Application entry point. Initializes React root, wraps app with Radix UI Theme provider, and renders the App component.
- **`App.tsx`** - Main application component. Sets up React Router with BrowserRouter and route configuration.
- **`App.css`** - Global application styles.
- **`index.css`** - Base CSS styles and Tailwind directives.

### 📁 `assets/`

Static assets used in the application.

- **`react.svg`** - React logo SVG asset.

---

## 📁 `core/` - Core Application Logic

Core application architecture following clean architecture principles.

### 📁 `core/components/` - UI Components

Component library organized by atomic design principles.

#### Component Organization

- **`atoms/`** - Smallest UI components (buttons, inputs, labels).
  - **`index.ts`** - Exports all atom components.

- **`molecules/`** - Composed components made from atoms (form fields, search bars).
  - **`index.ts`** - Exports all molecule components.

- **`organisms/`** - Complex components made from molecules and atoms (headers, forms, cards).
  - **`index.ts`** - Exports all organism components.

- **`pages/`** - Full page components representing routes.
  - **`index.ts`** - Exports all page components.

  - **`auth/`** - Authentication-related page components.
    - **`auth-panel.tsx`** - Authentication panel component.
    - **`auth-tabs.tsx`** - Tab navigation for login/register.
    - **`auth.layout.tsx`** - Layout wrapper for authentication pages.
    - **`index.ts`** - Exports auth components.

  - **`home/`** - Home page component.
    - **`home.hook.ts`** - Custom hooks for home page logic.
    - **`home.props.tsx`** - TypeScript prop types/interfaces.
    - **`home.view.tsx`** - Home page view component.
    - **`index.ts`** - Exports home page components.

  - **`login/`** - Login page component.
    - **`login.hook.ts`** - Login page hooks (form handling, authentication).
    - **`login.props.tsx`** - Login page prop types.
    - **`login.view.tsx`** - Login page UI component.
    - **`index.ts`** - Exports login components.

  - **`register/`** - Registration page component.
    - **`register.hook.ts`** - Registration hooks (form validation, submission).
    - **`register.props.tsx`** - Registration prop types.
    - **`register.view.tsx`** - Registration page UI.
    - **`index.ts`** - Exports registration components.

  - **`dashboard/`** - User dashboard page (protected route).
    - **`dashboard.hook.ts`** - Dashboard hooks (data fetching, state management).
    - **`dashboard.props.tsx`** - Dashboard prop types.
    - **`dashboard.view.tsx`** - Dashboard UI component.
    - **`index.ts`** - Exports dashboard components.

  - **`not-found/`** - 404 error page.
    - **`not-found.hook.ts`** - NotFound page hooks.
    - **`not-found.props.tsx`** - NotFound prop types.
    - **`not-found.view.tsx`** - 404 page UI.
    - **`index.ts`** - Exports NotFound components.

  - **`unauthorized/`** - 403 unauthorized access page.
    - **`unauthorized.hook.ts`** - Unauthorized page hooks.
    - **`unauthorized.props.tsx`** - Unauthorized prop types.
    - **`unauthorized.view.tsx`** - Unauthorized page UI.
    - **`index.ts`** - Exports unauthorized components.

- **`templates/`** - Page layout templates.
  - **`index.ts`** - Exports template components.

- **`index.ts`** - Main component exports.

### 📁 `core/helpers/` - Utility Functions

Helper functions and utilities.

- **`toast.helper.ts`** - Toast notification helper functions (success, error, info messages).
- **`index.ts`** - Exports all helper functions.

### 📁 `core/hocs/` - Higher-Order Components

HOCs for component composition and cross-cutting concerns.

- **`withAuth.tsx`** - HOC that protects components requiring authentication. Redirects to login if not authenticated.
- **`withRole.tsx`** - HOC for role-based access control. Restricts access based on user roles.
- **`index.ts`** - Exports all HOCs.

### 📁 `core/hooks/` - Custom React Hooks

Reusable custom hooks.

- **`index.ts`** - Exports all custom hooks.

### 📁 `core/routes/` - Routing Configuration

Application routing setup.

- **`routes.config.tsx`** - Route definitions using React Router. Includes public routes, protected routes, and role-based routes.
- **`index.ts`** - Exports route configuration.

### 📁 `core/types/` - TypeScript Type Definitions

Shared TypeScript types and interfaces.

- **`index.ts`** - Exports all type definitions.

### 📁 `core/index.ts` - Core Module Exports

Main export file for the core module.

---

## 📁 `data/` - Data Layer

Data management layer following repository pattern with React Query.

### 📁 `data/configs/` - Configuration

API and query configuration.

- **`apiEndpoints.ts`** - Centralized API endpoint definitions. Functions that return endpoint URLs for all API routes (auth, users, plans, jobs, conversations, messages, health).
- **`queryKeys.ts`** - React Query key factory for consistent cache key management.
- **`index.ts`** - Exports configuration.

### 📁 `data/entities/` - Domain Entities

TypeScript interfaces representing domain entities.

- **`user.entities.ts`** - User entity type definitions.
- **`plan.entities.ts`** - Travel plan entity definitions.
- **`job.entities.ts`** - Job entity definitions.
- **`conversation.entities.ts`** - Conversation entity definitions.
- **`message.entities.ts`** - Message entity definitions.
- **`index.ts`** - Exports all entities.

### 📁 `data/enums/` - Enumerations

TypeScript enums for constants.

- **`userRole.enums.ts`** - User role enumerations (USER, ADMIN, etc.).
- **`userStatus.enums.ts`** - User status enumerations.
- **`jobState.enums.ts`** - Job state enumerations.
- **`messageRole.enums.ts`** - Message role enumerations (USER, ASSISTANT, etc.).
- **`index.ts`** - Exports all enums.

### 📁 `data/models/` - Data Transfer Objects (DTOs)

Request/response models for API communication.

- **`auth.models.ts`** - Authentication DTOs (RegisterRequest, LoginRequest, AuthResponse, etc.).
- **`user.models.ts`** - User-related DTOs.
- **`plan.models.ts`** - Plan-related DTOs.
- **`job.models.ts`** - Job-related DTOs.
- **`conversation.models.ts`** - Conversation-related DTOs.
- **`message.models.ts`** - Message-related DTOs.
- **`health.models.ts`** - Health check response models.
- **`index.ts`** - Exports all models.

### 📁 `data/mutations/` - React Query Mutations

Mutation hooks for data modifications (create, update, delete).

- **`auth.mutation.ts`** - Authentication mutations (login, register, logout).
- **`user.mutation.ts`** - User mutations (update profile, etc.).
- **`plan.mutation.ts`** - Plan mutations (create, update, delete plans).
- **`job.mutation.ts`** - Job mutations (create, update, cancel jobs).
- **`conversation.mutation.ts`** - Conversation mutations (create conversations).
- **`message.mutation.ts`** - Message mutations (send messages).
- **`index.ts`** - Exports all mutations.

### 📁 `data/queries/` - React Query Queries

Query hooks for data fetching (read operations).

- **`user.query.ts`** - User queries (get current user, get user by ID).
- **`plan.query.ts`** - Plan queries (list plans, get plan by ID).
- **`job.query.ts`** - Job queries (list jobs, get job by ID).
- **`conversation.query.ts`** - Conversation queries (list conversations, get by ID).
- **`message.query.ts`** - Message queries (list messages in conversation).
- **`index.ts`** - Exports all queries.

### 📁 `data/repositories/` - Repository Layer

Repository functions that abstract API calls.

- **`auth.repo.ts`** - Authentication repository functions (register, login, refresh, logout).
- **`user.repo.ts`** - User repository functions.
- **`plan.repo.ts`** - Plan repository functions.
- **`job.repo.ts`** - Job repository functions.
- **`conversation.repo.ts`** - Conversation repository functions.
- **`message.repo.ts`** - Message repository functions.
- **`health.repo.ts`** - Health check repository functions.
- **`index.ts`** - Exports all repositories.

### 📁 `data/index.ts` - Data Module Exports

Main export file for the data layer.

---

## 📁 `package/` - Package/Utility Layer

Reusable packages and utilities that can be used across the application.

### 📁 `package/http/` - HTTP Client

HTTP communication layer using Axios.

- **`client.ts`** - HTTP client class with typed methods (get, post, put, patch, delete). Handles API responses and errors. Singleton instance exported.
- **`interceptors.ts`** - Axios request/response interceptors (token injection, error handling, token refresh).
- **`types.ts`** - HTTP-related TypeScript types (ApiResponse, ApiError, HttpClientConfig).
- **`index.ts`** - Exports HTTP client and utilities.

### 📁 `package/storage/` - Storage Management

Browser storage abstraction layer.

- **`storage.ts`** - Generic storage interface and implementation (localStorage wrapper).
- **`travelLocalStorage.ts`** - Travel app-specific storage implementation.
- **`tokenManager.ts`** - Token management utility. Handles access/refresh token storage, validation, expiration checks, and token decoding.
- **`storage.constants.ts`** - Storage key constants.
- **`index.ts`** - Exports storage utilities.

### 📁 `package/index.ts` - Package Module Exports

Main export file for the package layer.

---

## 🏗️ Architecture Overview

### Design Patterns

1. **Atomic Design** - Components organized as atoms, molecules, organisms, and pages.
2. **Repository Pattern** - Data access abstracted through repository functions.
3. **HOC Pattern** - Higher-order components for cross-cutting concerns (auth, roles).
4. **Custom Hooks** - Business logic extracted into reusable hooks.
5. **Separation of Concerns** - Clear separation between UI (components), business logic (hooks), and data (repositories/queries).

### Technology Stack

- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM v7
- **State Management**: Zustand (global state), React Query (server state)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS + Radix UI Themes
- **Forms**: React Hook Form
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier, Husky, Commitlint

### Data Flow

1. **UI Components** → Trigger actions via hooks
2. **Custom Hooks** → Use React Query mutations/queries
3. **React Query** → Calls repository functions
4. **Repositories** → Use HTTP client to make API calls
5. **HTTP Client** → Sends requests with interceptors (token injection)
6. **Storage** → Manages tokens and local data
7. **Response** → Flows back through the chain to update UI

---

## 📝 Notes

- All directories include `index.ts` files for clean imports.
- Page components follow a consistent pattern: `*.hook.ts`, `*.props.tsx`, `*.view.tsx`.
- The project uses path aliases (`@/`) for cleaner imports.
- Environment variables should be prefixed with `VITE_` for Vite to expose them.
- The application uses React Query for server state management and caching.
