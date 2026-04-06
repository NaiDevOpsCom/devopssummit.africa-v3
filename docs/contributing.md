# Contributing to Africa DevOps Summit Hub

First off, thank you for considering contributing to the Africa DevOps Summit Hub! It's people like you that make this open-source community such a great place to learn, inspire, and create.

This document serves as a comprehensive guide for all contributors, helping ensure our codebase remains clean, maintainable, and highly collaborative.

## Project Mindset

Before diving in, please keep our core philosophy in mind:
- **Clean, Maintainable, Scalable Code:** We prioritize readability and long-term maintainability over clever but complex solutions.
- **Respect Existing Conventions:** Follow the established architecture and patterns you see in the codebase.
- **Purposeful Refactoring:** Avoid unnecessary refactoring unless strictly required for a bug fix or approved architectural update.

---

## Branching Strategy

To keep our deployments stable, we employ a strict pull request and branching process based on two protected branches:

- **`main`**: The production branch. It contains only stable, production-ready code. **Never commit directly or open PRs to this branch (except for hotfixes).**
- **`staging`**: The development/integration branch. All new features and bug fixes land here first.

### Visual Workflow

```text
main           ────o────────────────────────────────────o────o────
                   │                                    ^    │
                   │ (Periodic release)                 │    │
staging        ────o────o──────────────o──────────o─────┼────o────
                        │              ^          │     │    ^
                        v              │          v     │    │
feature/* or fix/*      └──o───o───o───┘          │     │    │
                                                  │     │    │
hotfix/* (Urgent)                                 └──o──┴────┘
```

- Features branch off `staging` and merge back into `staging`.
- Hotfixes branch off `main` and merge into BOTH `main` and `staging` to ensure fixes aren't lost in upcoming releases.
- Maintainers handle promoting `staging` to `main`.

### Naming Conventions
Use descriptive branch names with the following prefixes:
- `feature/<name>` for new features or enhancements (e.g., `feature/speaker-cards`)
- `fix/<name>` for bug fixes (e.g., `fix/navbar-mobile-menu`)
- `chore/<name>` for tooling, config, or dependency updates (e.g., `chore/update-vite`)
- `hotfix/<name>` for urgent production fixes branching from `main` (e.g., `hotfix/broken-payment-link`)

---

## Mandatory Pre-Work Requirement

Before making any changes or writing a single line of code, contributors **MUST**:
1. **Read and Understand the Docs:** Review the project documentation (such as `.agents/CONTEXT.md` and architecture docs).
2. **Analyze the Project Structure:** Understand the folder layout, core components, and general architecture.
3. **Identify Affected Files:** Trace exactly which files, components, and state will be impacted by your changes.
4. **Ensure Consistency:** Verify that your proposed approach aligns with existing patterns. (If in doubt, open an issue to discuss it first!)

*Note: These mandatory pre-work steps primarily apply to code changes. Minor documentation edits or typo fixes may be exempt from the full process.*

---

## Local Setup & Prerequisites

**Node.js**: Version **^20.19.0** or **>=22.12.0** is required.
We recommend using [nvm](https://github.com/nvm-sh/nvm):
```bash
nvm install 22
nvm use 22
```

**Installation**:
```bash
git clone git@github.com:NaiDevOpsCom/devopssummit.africa-v3.git
cd devopssummit.africa-v3
npm install
```

### Environment Variables
- Copy the example environment file: `cp .env.example .env.local`
- **Never commit `.env.local`**. Ensure your `.gitignore` includes `.env.local`.
- **Note**: This is a static frontend app — all env vars are baked in at build time and visible in the browser bundle. Do not store secrets in `VITE_` variables.

### Available Scripts
- `npm run dev`: Start the local development server at `http://localhost:5173`
- `npm run build`: Build the production-ready site into `dist/`
- `npm run lint`: Run ESLint across the codebase
- `npm run typecheck`: Run TypeScript type checking without emitting files

---

## Development Workflow

1. **Sync with Upstream:**
   Always pull the latest changes from `staging` before starting new work.
   ```bash
   git checkout staging
   git pull origin staging
   ```

2. **Create Your Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Develop and Commit:**
   Make your changes following the code quality standards. Write clear, descriptive commit messages.

4. **Open a Pull Request:**
   Push your branch and open a PR targeting the **`staging`** branch (NOT `main`).

---

## Code Style & Conventions

This project uses React, Vite, and TypeScript. All contributions must adhere to the following standards:

### TypeScript & React
- **TypeScript Best Practices:** Utilize strict typing. Avoid the use of `any` wherever possible. Define explicit interfaces for your data.
- **Component Architecture:** Ensure components are reusable, modular, small, and focused on a single responsibility. Use plain function declarations for components (not `React.FC`).
- **File Naming:** Use PascalCase for components (`Navbar.tsx`), camelCase for hooks and utilities (`useMobile.ts`, `cn.ts`).

### Styling (Tailwind CSS)
- Follow utility-first styling with Tailwind CSS.
- Use semantic CSS variables defined in our design system (e.g., `bg-primary`, `text-foreground`). Avoid hardcoding hex colors.

### Imports
- Always use the `@/` alias for absolute imports within the `src` directory (e.g., `import { cn } from "@/lib/utils";`).

### shadcn/ui Components
- **Warning:** Do not manually edit or create files inside `src/components/ui/`. These are generated code.
- To add or update a component, always use the CLI:
  ```bash
  npx shadcn@latest add [component-name]
  ```

---

## Testing & Validation

All contributors are responsible for validating their code before opening a PR:

- **Build Check:** Ensure the application builds successfully without errors.
  ```bash
  npm run build
  ```
- **Linting:** Run the linter and fix all identified issues before submitting.
  ```bash
  npm run lint
  ```
- **Manual QA:** Manually test affected features in the browser to ensure the UI and UX remain intact.

---

## Pull Request Guidelines

To expedite the review process, ensure your PR meets these criteria:
- **Target the Right Branch:** Remember, target `staging` (unless it's a hotfix).
- **Clear Title & Description:** Clearly explain *what* was changed and *why*.
- **Reference Issues:** Link any related bug or feature tracking issues (e.g., `Closes #42`).
- **Include Visuals:** For UI changes, attach screenshots or a screen recording showing the before and after.
- **Keep It Focused:** Limit your PR to a single concern or feature. Smaller PRs are reviewed and merged much faster!

---

## CI/CD Awareness

Please be aware that opening a PR will trigger automated pipeline checks:
- Automated tests, linting, and build validation will run.
- **Your PR must pass all CI/CD checks before it can be merged.**
- If a check fails, review the logs, push a fix to your branch, and the checks will run again.

---

## Hotfix Workflow (For Critical Production Bugs)

If you are addressing an urgent bug currently in production:
1. Ensure your local `main` branch is up to date:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Create your hotfix branch directly off `main`:
   ```bash
   git checkout -b hotfix/describe-the-bug
   ```
3. Fix the issue, and test it thoroughly to ensure no regressions.
4. Open ONE PR targeting `main` with the prefix `[HOTFIX]` in the title for immediate production deployment.  
   Once merged, maintainers will cherry-pick changes into `staging`.

*(Note: There is no automation for this dual-merge; the backporting is a manual step performed by maintainers.)*

---

Thank you for contributing! Your efforts help make this project better for everyone.