 # AlienSoft Product Management App

Vue 3 + Composition API + Pinia + Vue Router + Tailwind CSS

## Live Demo
https://boonerd.github.io/alien-soft-internship-test/

## Login Credentials (DummyJSON)
- `emilys` / `emilyspass`
- `michaelw` / `michaelwpass`
- `sophiab` / `sophiabpass`
- `jamesd` / `jamesdpass`

## Features Implemented
- User authentication with DummyJSON + token persistence in localStorage
- Protected routes (login required for all pages except /login)
- Full product listing with search and client-side pagination (10 per page)
- View single product details
- Add new product (form with validation)
- State management with Pinia
- Responsive layout closely matching the provided mockups
- Primary color: `#000080` (as specified)

## Tech Stack
- Vue 3 (Composition API + `<script setup>`)
- Pinia for state management
- Vue Router with route guards
- Tailwind CSS v3 (no external component library)
- Vite as build tool
- Deployed via GitHub Pages

## Project Structure
src/
├── components/     → Reusable components (AppLayout.vue)
├── stores/         → Pinia stores (authStore, productStore)
├── views/          → Page components (LoginView, ProductsView, etc.)
├── router/         → Route definitions + auth guards
└── App.vue, m

## Setup & Run Locally
```bash
git clone https://github.com/boonerd/alien-soft-internship-test.git
cd alien-soft-internship-test
npm install
npm run dev

Open http://localhost:5173

Deployment
Built and deployed with:
npm run build
npm run deploy   # uses gh-pages package

Assumptions & Notes
Products are fetched from https://dummyjson.com/products
Added products are stored in Pinia (in-memory, resets on refresh — as per test scope)
No backend persistence required
Used base: '/alien-soft-internship-test/' in vite.config.js (required for correct GitHub Pages deployment)

Thank you AlienSoft for this opportunity!
I'm excited to join the team and contribute from day one.
— Patriciah Mbua

Final live link (working 100%):
https://boonerd.github.io/alien-soft-internship-test/
