# Brooklyn Purchase — Rental P&L

All-cash rental investment analysis for Brooklyn purchases. Model monthly cash flow, cap rate, cash-on-cash return, and multi-year exit scenarios.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy to Netlify

This repo includes a [`netlify.toml`](netlify.toml) config. Connect the GitHub repo to Netlify, or deploy from the CLI:

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

Netlify assigns a free `*.netlify.app` URL — no custom domain required.

## Features

- Editable purchase price, rent, and monthly expenses
- Listing URL field with PDF export (Save as PDF in print dialog)
- Shareable scenario links via URL parameters
- Auto-save to browser localStorage
