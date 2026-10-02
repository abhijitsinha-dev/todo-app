# 📝 Git Commit Convention

This document defines the **commit message convention** used in this project.  
It ensures consistent, clear, and meaningful commits across the codebase.

---

## 🧩 Commit Message Format

Each commit **must** follow this format:

```
type(scope): [emoji] message header

- body line 1
- body line 2

- footer line 1
- footer line 2
```

---

## 🧠 Formatting Rules

### Header

- **Lowercase letters** (uppercase allowed only for filenames that are uppercase, e.g. `docs/STRUCTURE.md`, `README.md`)
- **No full stop at the end**
- **Maximum 50 characters**

### Body & Footer (optional)

- **Lowercase letters** (uppercase allowed only for filenames that are uppercase, e.g. `docs/STRUCTURE.md`, `README.md`)
- **Each point on a new line**
- **No trailing punctuation (like full stops)**
- **Maximum 72 characters per line**

### General Rule

- **Use one space after a colon (`:`)**

---

### ✅ Validation Rules

- ❌ **error** if type is invalid
- ❌ **error** if any line ends with a full stop (`.`)
- ⚠️ **warning** if no space after colon

### 💡 Recommendations

- It is recommended to use the mentioned scopes and emoji
- No error or warning for omitting scope or emoji
- **Filename Casing**: Uppercase should only be used if the file name itself is in uppercase (e.g. `docs/STRUCTURE.md`, `README.md`, `docs/PLAN.md`, `AGENTS.md`). All standard prose, descriptions, types, and scopes should remain in lowercase

---

## 🔖 Types

| Commit Type | Title                    | Description                                                                                             | Emoji |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------------------------- | :---: |
| `feat`      | Features                 | A new feature                                                                                           |  ✨   |
| `fix`       | Bug Fixes                | A bug fix                                                                                               |  🐛   |
| `docs`      | Documentation            | Documentation only changes                                                                              |  📚   |
| `style`     | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.) |  💎   |
| `refactor`  | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                               |  📦   |
| `perf`      | Performance Improvements | A code change that improves performance                                                                 |  🚀   |
| `test`      | Tests                    | Adding missing tests or correcting existing tests                                                       |  🚨   |
| `build`     | Builds                   | Changes that affect the build system or external dependencies                                           |   🛠   |
| `ci`        | Continuous Integrations  | Changes to CI configuration files and scripts                                                           |  ⚙️   |
| `chore`     | Chores                   | Other changes that don't modify src or test files                                                       |  ♻️   |
| `revert`    | Reverts                  | Reverts a previous commit                                                                               |   🗑   |

---

## 🎯 Scopes (Recommended)

| Commit Scope    | Description                                                     | Example                                                        |
| --------------- | --------------------------------------------------------------- | -------------------------------------------------------------- |
| `app`           | Overall app-level changes, configurations                       | `feat(app): ✨ add new splash screen config`                   |
| `ui`            | Changes to UI components, layouts, or styling                   | `fix(ui): 🐛 adjust padding on login screen`                   |
| `navigation`    | Changes related to navigation, routes, tabs                     | `feat(navigation): ✨ add settings stack navigator`            |
| `auth`          | Authentication logic                                            | `feat(auth): ✨ implement forgot password flow`                |
| `api`           | API integration or network-related changes                      | `refactor(api): ✨ update base url and headers`                |
| `store`         | State management                                                | `feat(store): ✨ add user slice for profile management`        |
| `hooks`         | Custom React hooks or updates to existing ones                  | `feat(hooks): ✨ create usefetchdata hook`                     |
| `components`    | Shared reusable components (buttons, cards, modals)             | `feat(components): ✨ add reusable modal component`            |
| `screens`       | Changes specific to app screens/views                           | `feat(screens): ✨ create onboarding screen`                   |
| `assets`        | Adding or updating images, fonts, icons, or other static assets | `chore(assets): ♻️ replace logo with updated version`          |
| `config`        | Environment variables, build config                             | `chore(config): ♻️ update expo sdk version`                    |
| `permissions`   | Device permissions (camera, location, notifications)            | `feat(permissions): ✨ request location access on home screen` |
| `notifications` | Push notifications setup or logic                               | `feat(notifications): ✨ integrate firebase cloud messaging`   |
| `analytics`     | Analytics, tracking, or logging changes                         | `feat(analytics): ✨ add screen tracking for user flow`        |
| `i18n`          | Internationalization or localization updates                    | `feat(i18n): ✨ add spanish translations`                      |
| `dependencies`  | Package installations, upgrades, or removals                    | `chore(dependencies): ♻️ upgrade react-native-paper to v6`     |
| `security`      | Security patches or improvements                                | `fix(security): 🐛 sanitize user input before api call`        |
| `utils`         | Utility/helper functions                                        | `feat(utils): ✨ add date formatting helper`                   |

---

## 📝 Commit Message Examples

### Simple Commits (Header Only)

```
feat(auth): ✨ add biometric authentication
```

```
fix(ui): 🐛 resolve button alignment on profile screen
```

```
docs(navigation): 📚 update navigation flow documentation
```

```
style(components): 💎 format code with prettier
```

```
refactor(store): 📦 reorganize redux slices
```

```
perf(images): 🚀 implement lazy loading for images
```

```
test(hooks): 🚨 add tests for useauth hook
```

```
build(dependencies): 🛠 update expo sdk to v49
```

```
ci(github): ⚙️ add automated testing workflow
```

```
chore(assets): ♻️ optimize app icons
```

```
revert(api): 🗑 revert authentication endpoint change
```

### Commits with Body

```
feat(components): ✨ create reusable modal component

- add base modal with backdrop
- implement customizable content area
- include close button and animations
- support different modal sizes
```

### Full Commits with Body and Footer

```
feat(ui): ✨ implement dark mode toggle

- add theme context and provider
- create theme toggle component
- update all screens to support dark mode
- add persistence using async storage

closes #123
breaking change: theme context api updated
```
