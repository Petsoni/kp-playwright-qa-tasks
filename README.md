# Playwright Automation Framework | KupujemProdajem QA Tasks

This repository contains a E2E automation framework built with **Playwright** and **TypeScript**, targeting the [KupujemProdajem](https://www.kupujemprodajem.com) platform.

## 🌟 Key Engineering Highlights

* **Page Object Model (POM):** Implemented to decouple test logic from UI selectors.
* **Custom Fixture Extensions:** Overloaded the base Playwright `test` to create reusable `categoryPage` fixtures, reducing boilerplate setup in test files.

---

## 🛠️ Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Petsoni/kp-playwright-qa-tasks.git
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```


### Execution

* **Headless execution:** `npx playwright test`
* **Interactive UI Mode:** `npx playwright test --ui`
* **Debugging:** `npx playwright test --debug`
