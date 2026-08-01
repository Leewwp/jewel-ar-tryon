# Repository Guidelines

## Project Structure & Module Organization

This repository is an initialized technical PoC. Product and architecture decisions are in [`决策文档.md`](决策文档.md). The scaffold keeps the WeChat mini-program client separate from cloud services:

- `miniprogram/`: pages, components, state, and `wx.createVKSession`/three.js AR code.
- `cloudfunctions/`: small, independently deployable cloud functions.
- `tests/`: unit and integration tests mirroring client modules.
- `assets/models/`, `assets/images/`: approved sample models and images (avoid large production files).
- `docs/`: technical notes and decisions; update `决策文档.md` when product scope changes.

Organize AR tracking by wearable category (necklace/earring, wrist, ankle) and keep rendering, tracking, and product data concerns separate.

## Build, Test, and Development Commands

Use Node.js 20 or later. Run `npm install` to install development dependencies, `npm run check` for linting, formatting, unit tests, and project validation, and `npm run preview` for the browser-based UI verification preview. Import the repository root in WeChat DevTools for mini-program checks; validate real AR behavior on representative devices.

## Coding Style & Naming Conventions

Use the scaffold’s formatter and linter (normally ESLint + Prettier for JavaScript/TypeScript). Prefer two-space indentation, formatter-approved semicolons, and single-purpose modules. Use `PascalCase` for components/classes, `camelCase` for functions and variables, and `UPPER_SNAKE_CASE` only for constants. Name pages and category modules descriptively (for example, `pages/product-detail` and `tracking/wrist`). Keep domain terms consistent with the decision document.

## Testing Guidelines

Add unit tests for tracking transforms, orientation, model scaling, and validation; add integration tests for merchant upload and user try-on flows. Name tests after the behavior they verify (for example, `wristAnchor.test.ts`). Check every AR change on representative Android and iOS devices as well as the simulator, and record notable device or lighting limitations.

## Commit & Pull Request Guidelines

Use short, imperative subjects with an optional scope, such as `feat(ar): anchor bracelet to wrist`. Keep unrelated changes separate. Pull requests should explain the user-visible effect, link the relevant decision or issue, list test commands and real-device results, and attach screenshots or a short recording for UI/AR changes. Call out new cloud configuration or model assets.

## Security & Configuration

Never commit API keys, cloud credentials, user images, or private model URLs. Keep environment-specific values in local WeChat/cloud configuration, provide a redacted example, and review storage permissions and uploaded-content validation before enabling merchant uploads.

## Agent skills

### Issue tracker

Issues are tracked in the dedicated GitHub repository `Leewwp/jewel-ar-tryon`. See `docs/agents/issue-tracker.md`.

### Triage labels

Triage uses the five default canonical labels. See `docs/agents/triage-labels.md`.

### Domain docs

Domain documentation uses the single-context layout. See `docs/agents/domain.md`.
