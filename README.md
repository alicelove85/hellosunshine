# 🌞 Hello Sunshine - Surf Homestay Nias

A modern, multilingual booking website for Hello Sunshine surf homestay in Nias Island, Indonesia.

## ✨ Features

- **Multilingual Support**: English, Bahasa Indonesia, Korean (한국어)
- **Calendar-based Booking**: Interactive date picker for reservations
- **Responsive Design**: Beautiful on all devices
- **Modern UI**: Minimalist design with smooth animations
- **Room Showcase**: Ocean View Studio, Standard Room, Single Room
- **Services**: Surf lessons, board rental, airport pickup
- **Contact Integration**: WhatsApp, email, Instagram, Google Maps

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Calendar**: react-day-picker
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd hello-sunshine

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
hello-sunshine/
├── src/
│   ├── app/
│   │   ├── [locale]/        # Locale-based routing
│   │   │   ├── layout.tsx   # Root layout with i18n
│   │   │   └── page.tsx     # Home page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── RoomsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── BookingSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── messages/            # Translation files
│   │   ├── en.json
│   │   ├── id.json
│   │   └── ko.json
│   ├── i18n.ts              # i18n configuration
│   └── middleware.ts        # Locale middleware
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## 🌐 Supported Languages

| Language | Code | URL |
|----------|------|-----|
| English | en | /en |
| Indonesian | id | /id |
| Korean | ko | /ko |

## 💰 Room Prices

| Room Type | Price/Night |
|-----------|-------------|
| Ocean View Studio | IDR 400,000 |
| Standard Room | IDR 315,000 |
| Single Room | IDR 250,000 |

## 🔧 Customization

### Update Contact Information

Edit the following files:
- `src/components/Footer.tsx`
- `src/components/ContactSection.tsx`

### Update Room Prices

Edit `src/components/RoomsSection.tsx` and `src/components/BookingSection.tsx`

### Add New Language

1. Create new translation file: `src/messages/[locale].json`
2. Add locale to `src/i18n.ts`
3. Update middleware matcher in `src/middleware.ts`

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

Ready to deploy on:
- Vercel (recommended)
- Netlify
- Any Node.js hosting

## 📄 License

MIT License - Feel free to use this project for your own homestay!

---

Made with ☀️ for Hello Sunshine Nias

