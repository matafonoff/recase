# @xelbera/recase

> Convert strings between camelCase, PascalCase, snake_case, kebab-case, dot.case, COBOL-CASE and more — with optional abbreviation preservation.

---

## ✨ Features

- Convert between popular casing styles:
  - `camelCase`, `PascalCase`, `snake_case`, `UPPER_SNAKE_CASE`
  - `kebab-case`, `Train-Case`, `dot.case`, `COBOL-CASE`
- Detect case style from input
- Preserve known abbreviations like `API`, `HTML`, `URL`
- Zero dependencies
- TypeScript-native

---

## 📦 Install

```bash
npm install @xelbera/recase
```
or
```bash
yarn add @xelbera/recase
```

---

## 🛠 Usage

```ts
import {
  convertCase,
  detectCase,
  splitToParts
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

// Split string into parts
splitToParts('userProfileID');
// => ['user', 'profile', 'id']

splitToParts('userHTMLData', true);
// => ['user', 'HTML', 'Data']

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

MIT © Stepan Matafonov
