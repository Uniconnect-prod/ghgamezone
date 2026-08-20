# 🎮 GhanaWins

[![Vite](https://img.shields.io/badge/Vite-8.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.1.3-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Sass](https://img.shields.io/badge/Sass-1.83.4-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Oxlint](https://img.shields.io/badge/Oxlint-0_Errors_0_Warnings-00E676?style=for-the-badge)](https://github.com/oxc-project/oxc)

GhanaWins is a state-of-the-art, high-performance, responsive mini-games gaming web platform built with **React 19**, **Vite 8**, and **Sass**. Designed with a vibrant dark-mode cyberpunk aesthetic, glassmorphism UI elements, neon purple & blue glowing accents, rectangular game banner thumbnails, interactive hero game carousel, category-specific game pages, interactive popup modals, and functional footer policy documents.

---

## ✨ Features & Pages Overview

### 🏠 1. Home Page (`/`)
- **Fixed Cyberpunk Navbar**: Top header with logo, navigation links (`HOME`, `GAMES`, `ABOUT US`, `HOW TO PLAY`, `CONTACT`), search bar, and `SIGN IN` auth modal trigger.
- **Hero Banner & Interactive Carousel**: High-impact promotional hero section with gradient typography (`WELCOME TO GHANA WINS`), badge indicators, quick action buttons linking to `/games` and `/leaderboard`, and an auto-playing featured games carousel showcase with pause-on-hover, prev/next chevron navigation, and pagination dots.
- **Choose Your Vibe (Categories)**: Multi-column grid featuring 7 category vibes (`ACTION`, `PUZZLE`, `RACING`, `SPORTS`, `ARCADE`, `STRATEGY`, `ADVENTURE`). Clicking any category navigates to dedicated category pages (e.g., `/category/action`).
- **Rectangular Game Cards (Trending Games)**: Landscape rectangular game card banners (`aspect-ratio: 16/9`) that display game artwork cleanly without clipping.
- **Interactive Subscription Trigger**: Clicking ANY game card opens the **Subscribe to Play** popup modal (`₹10 FOR 10 TURNS`).
- **Leaderboard & Advantages**: Top player rankings sidebar and platform advantages section.
- **Functional Footer**: All quick links, support buttons (`Help Center`, `Terms of Service`, `Privacy Policy`, `Refund Policy`), and social channels are 100% interactive.

### 🎯 2. Category Games Pages (`/category/:categorySlug`)
- **Dedicated Category Hubs**: `/category/action`, `/category/puzzle`, `/category/racing`, `/category/sports`, `/category/arcade`, `/category/strategy`, `/category/adventure`.
- **Category Meta Header**: Category-specific icon, title, description, and attempts counter widget (`⚡ 42 / 50`).
- **Category Filter Pills**: Quick switcher to toggle between category vibes seamlessly.
- **Filtered Game Cards**: Displays all games under that specific category with rectangular banners and subscribe-on-click handlers.

### 🎮 3. Games Catalog (`/games`)
- **Attempts Counter Card**: Real-time attempt status widget (`⚡ 42 / 50 Attempts Remaining`) with a `BUY MORE ATTEMPTS` trigger.
- **Search & Filter Controls**: Live search bar with category pills filter (`ALL`, `ACTION`, `PUZZLE`, `RACING`, `SPORTS`, `ARCADE`).
- **Categorized Game Banners**: 🔥 **Trending Games**, ⭐ **New Releases**, and ⚔️ **Action Games**.

### 🏆 4. Leaderboard Page (`/leaderboard`)
- **Top 3 Podium**: Ranked podium cards for Champion `#1` (Gold 🥇), Runner-Up `#2` (Silver 🥈), and `#3` (Bronze 🥉).
- **Timeframe Filters**: Daily, Weekly, Monthly, and All-Time filter options.
- **Full Rankings List**: Detailed player ranks, avatars, win rates, and points.

### 👤 5. Profile / Account Page (`/profile`)
- **User Header Card**: Displays User Avatar, Username (`CYBERNINJA`), VIP PRO tag, and quick stats (`⚡ 42 Turns Left`, `#1 Global Rank`, `142 Matches`).
- **Match History Table**: Match log displaying game name, outcome (`VICTORY` / `DEFEAT`), turns spent, and points earned.

### 📖 6. About Us Page (`/about`)
- **Hero Header**: `LEVELING UP EVERY GAMING MOMENT` title with subtext and floating 3D neon controller podium graphic.
- **Our Story & Offer Grids**: Hex portal graphic, What We Offer 4-card grid, Our Values 3-card grid, and stat counters.

### 📜 7. How To Play Page (`/how-to-play`)
- **Subscription Promo Card**: Highlighted `₹10 FOR 10 TURNS` starter pack card.
- **How It Works & FAQ Accordion**: 4-step workflow, turns rules, and expandable Q&A accordions.

### 📬 8. Contact Us Page (`/contact`)
- **Interactive Contact Form**: Form with inputs for Name, Email, Subject, Message, and submission confirmation toast.
- **Contact Cards**: Email, Phone, Socials, and Location (`Noida, Uttar Pradesh, India`).

### ⚡ 9. Interactive Modals
- **Subscribe Modal (`SubscribeModal.jsx`)**: Triggered when clicking any game card or attempt purchase button.
- **Auth Modal (`AuthModal.jsx`)**: Sign In, Sign Up, and Google login drawer.
- **Policy Modal (`PolicyModal.jsx`)**: Displays interactive policy and support documents (`Terms & Conditions`, `Privacy Policy`, `Refund Policy`, `Help Center`) when footer support links are clicked.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| --- | --- |
| **React 19** | Core UI component library |
| **Vite 8** | Next-generation frontend build tool and dev server |
| **React Router DOM 7** | Client-side application routing |
| **Sass (SCSS)** | Component-scoped custom CSS & design tokens |
| **React Icons** | Icon set (FontAwesome, GameIcons, Feather, etc.) |
| **Oxlint** | High-speed JavaScript & JSX linter |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20.19.0+ or v22.12.0+
- **npm**: v10+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rishi-sr/ghana.git
   cd ghana
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 📜 Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Launches the Vite local dev server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles an optimized production build into the `dist/` directory. |
| `npm run preview` | Previews the compiled production build locally. |
| `npm run lint` | Runs `oxlint` code analysis across all source files. |

---

## 🧪 Verification Status

- **Oxlint**: `0 warnings, 0 errors` (Finished in 72ms across 37 files).
- **Vite Production Build**: `Built cleanly in 2.37s`.

---

© 2024 Ghana Wins. All rights reserved.
