# @xelbera/recase

[![npm version](https://img.shields.io/npm/v/@xelbera/recase?style=flat-square)](https://www.npmjs.com/package/@xelbera/recase)
[![MIT License](https://img.shields.io/npm/l/@xelbera/recase?style=flat-square)](./LICENSE)

> Convert strings between camelCase, PascalCase, snake_case, kebab-case, dot.case, COBOL-CASE and more — with optional abbreviation preservation.

---

## ✨ Features

- Convert between popular casing styles:
  - `camelCase`, `PascalCase`, `snake_case`, `UPPER_SNAKE_CASE`
  - `kebab-case`, `Train-Case`, `dot.case`, `COBOL-CASE`
- Detect case style from input
- Preserve known abbreviations like `API`, `HTML`, `URL`
- Convert keys of deeply nested objects
- Zero dependencies
- TypeScript-native

---

## 📦 Install

```bash
npm install @xelbera/recase
```

---

## 🛠 Usage

```ts
import {
  convertCase,
  detectCase,
  convertObjectKeys
} from '@xelbera/recase';

// Convert between styles
convertCase('userProfileID', 'snake');
// => 'user_profile_id'

convertCase('userHTMLData', 'camel', { preserveAbbreviations: true });
// => 'userHTMLData'

convertCase('userHTMLData', 'camel');
// => 'userHtmlData'

// Detect style
detectCase('USER-PROFILE-ID');
// => 'cobol'

// Convert object keys
convertObjectKeys({ userHTMLData: 123 }, 'snake', { preserveAbbreviations: true });
// => { user_HTML_data: 123 }
```

---

## 🔍 Supported Styles

| Style        | Example              |
|--------------|----------------------|
| `camel`      | `userProfileId`      |
| `pascal`     | `UserProfileId`      |
| `snake`      | `user_profile_id`    |
| `upper_snake`| `USER_PROFILE_ID`    |
| `kebab`      | `user-profile-id`    |
| `dot`        | `user.profile.id`    |
| `train`      | `User-Profile-Id`    |
| `cobol`      | `USER-PROFILE-ID`    |

---

## 📄 License

See [LICENSE](./LICENSE) for full details.

---
