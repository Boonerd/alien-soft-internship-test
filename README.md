# AlienSoft Frontend Test - Patriciah Mbua

Vue 3 + Pinia + Vue Router + Tailwind CSS Product Management App

## Live Demo
https://patriciahmbua.github.io/alien-product-app/

## Login Credentials
- Username: `kminchelle`
- Password: `0lelplR`

## Features Implemented
- Full authentication using DummyJSON API
- Token persistence with Pinia + localStorage (session survives refresh)
- Protected routes (only logged-in users can access /products)
- Product listing with real-time search
- Add new product
- View product details
- Delete product with confirmation
- Responsive design with Tailwind CSS
- Primary color: #000080 (navy blue)
- Clean, modern UI with loading states

## Tech Stack
- Vue 3 (Composition API + `<script setup>`)
- Pinia (auth & product stores)
- Vue Router (with guards)
- Tailwind CSS v3
- Vite

## Setup & Run
```bash
npm install
npm run dev