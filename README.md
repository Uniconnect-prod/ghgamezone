# GHGameZone

GHGameZone is a modern gaming portal built as a sleek React + Vite web application. The project is designed to feel like a digital game hub where users can browse games, explore categories, authenticate, and access paid subscription plans for unlimited gameplay.

This is not just a simple catalog — it is a more complete gaming experience with a polished landing page, interactive game cards, category pages, user account flow, subscription handling, and an overall app structure that feels close to a real gaming product.

## What this project is

GHGameZone is a front-end game discovery and play platform inspired by online gaming websites. It includes:

- A stylish home page with hero sections and featured games
- Game categories for arcade, sports, racing, strategy, puzzle, and action
- A trending section and leaderboard area
- Auth flow with login/signup and OTP-style mock verification
- Subscription plans for daily, weekly, and monthly access
- A profile screen for user information and account status
- Policy popup and support-style destinations like About, Contact, and How to Play pages
- A game launch flow that connects users to embedded game URLs and subscription checks

## What I built

I built this project as a complete front-end gaming experience with an app architecture that feels production-ready for a demo/product showcase.

### Core work included

- React app setup using Vite
- Responsive layout and reusable UI sections
- Navigation across multiple pages and sections
- Game catalog data with categories, ratings, descriptions, and images
- Authentication and local session management
- Subscription logic using mock backend storage and date-based expiry checks
- Token-based access flow for unlimited play
- Modal-based purchase and signup flows
- Custom styling using SCSS
- A clean app structure with reusable components and services

## Main features

### 1. User experience and design
The interface is built to feel engaging and modern, with bold sections, powerful call-to-action buttons, game tiles, and a layout designed for a gaming audience.

### 2. Game discovery
The app includes a catalog of games with metadata such as:

- game title
- category
- rating
- description
- player count
- new/trending status
- image position and thumbnail styling

### 3. Authentication flow
User sign-in and signup flows are implemented through a mock backend system. This includes:

- OTP sending and verification
- username signup flow
- session persistence in local storage
- user restoration on reload

### 4. Subscription system
A real-type subscription model is created for the app, including:

- Daily pass
- Weekly pass
- Monthly pass
- validation of subscription expiry
- unlocking of game access when subscription is active

### 5. Game launching logic
The app checks whether the user is logged in and subscribed before launching gameplay. If not, it redirects them to the subscription modal to continue.

## Tech stack

- React
- Vite
- React Router
- SCSS
- JavaScript
- Local mock backend storage with browser localStorage

## Project structure

```bash
ghgamezone/
├── public/
│   ├── avatars/
│   ├── fonts/
│   └── games/
├── src/
│   ├── App.jsx
│   ├── App.scss
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── hooks/
│   ├── Pages/
│   ├── services/
│   ├── styles/
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── public/_redirects
```

## Getting started

### Install dependencies

```bash
npm install
```

### Run the app locally

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Available scripts

```bash
npm run dev     # start local development server
npm run build   # create a production build
npm run preview # preview the production output
npm run lint    # run the linter
```

## Notes about this app

This project is built as a front-end demo/game portal, not a backend-connected production platform. It uses a mock backend layer to simulate authentication and subscription behavior in the browser.

That means the app works well for showcasing:

- UI/UX interaction
- gaming portal flow
- subscription logic
- local state management
- front-end product design

## Summary

GHGameZone is a gaming website concept that brings together multiple features into one polished app: browsing games, exploring categories, signing in, subscribing, and launching games in a smooth digital experience. This project reflects a lot of front-end work, product thinking, and game portal UX design built into a single cohesive application.

If you want, I can also create a second version of this README in a more professional startup style, a GitHub-style technical README, or a premium portfolio README for showcasing this project.
