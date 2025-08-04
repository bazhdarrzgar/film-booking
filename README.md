# 🎬 Flix - Premium Movie Booking Platform

<div align="center">

![Flix Logo](./images/black-banner.png)

**A modern, secure, and feature-rich movie booking platform built with Fresh Framework, TypeScript, and cutting-edge design**

[![Fresh Framework](https://img.shields.io/badge/Fresh-1.6.8-brightgreen.svg)](https://fresh.deno.dev/)
[![Deno](https://img.shields.io/badge/Deno-2.4.3-blue.svg)](https://deno.land/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-06B6D4.svg)](https://tailwindcss.com/)

[🚀 Live Demo](#getting-started) • [📖 Documentation](#documentation) • [🎨 Design Features](#design-features) • [🛠️ Tech Stack](#tech-stack)

</div>

---

## ✨ What's New - Enhanced Design

This platform now features a **completely modernized design** with:

- 🎨 **Premium Visual Design** - Glass morphism effects, gradients, and modern animations
- 🎬 **Cinematic Experience** - Dark theme optimized for movie browsing
- 📱 **Responsive Excellence** - Perfect on all devices with smooth interactions
- ⚡ **Performance Optimized** - 60fps animations with hardware acceleration
- 🔧 **Developer Experience** - Clean TypeScript code with modern patterns

## 🚀 Features

### 🎯 Core Functionality
- **🎟️ Advanced Booking System** - Interactive seat selection with real-time availability
- **🔐 Secure Authentication** - Modern crypto-based user management
- **🎬 Movie Discovery** - Smart search, filtering, and recommendations
- **👨‍💼 Admin Dashboard** - Complete movie and booking management
- **📱 Mobile-First Design** - Optimized for all screen sizes

### 🎨 Design Features
- **✨ Glass Morphism UI** - Modern translucent components with backdrop blur
- **🌈 Gradient System** - Sophisticated color gradients throughout
- **🎭 Interactive Animations** - Smooth hover effects and micro-interactions
- **🎪 3D Card Effects** - Movie cards with depth and dynamic shadows
- **🌙 Dark Theme** - Optimized for cinema-like viewing experience

### 🔒 Security & Performance
- **🛡️ Modern Cryptography** - Web Crypto API for secure password hashing
- **🍪 Secure Sessions** - HTTP-only cookies with proper expiration
- **🚨 Input Validation** - Comprehensive server-side validation
- **⚡ Optimized Performance** - Efficient animations and resource loading

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version | Description |
|----------|------------|---------|-------------|
| **Framework** | [Fresh](https://fresh.deno.dev/) | 1.6.8 | Modern web framework for Deno |
| **Runtime** | [Deno](https://deno.land/) | 2.4.3 | Secure TypeScript runtime |
| **Language** | TypeScript | 5.8.3 | Type-safe JavaScript |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | 3.4.17 | Utility-first CSS framework |
| **Fonts** | Google Fonts | Latest | Inter & Poppins for premium typography |
| **Database** | In-Memory | - | Easily replaceable with PostgreSQL/MongoDB |

</div>

## 📁 Project Architecture

```
📦 Flix Movie Booking Platform
├── 🎨 components/              # Reusable UI components
│   ├── Button.tsx             # Enhanced gradient buttons
│   ├── Footer.tsx             # Modern footer with glass effects
│   ├── Header.tsx             # Navigation with backdrop blur
│   ├── Hero.tsx               # Cinematic hero section
│   └── MovieCard.tsx          # 3D interactive movie cards
├── 🏝️ islands/                # Client-side interactive components
│   ├── BookingForm.tsx        # Interactive booking interface
│   └── Counter.tsx            # Real-time counters
├── 🛣️ routes/                 # File-based routing system
│   ├── api/                   # Backend API endpoints
│   ├── book/                  # Booking flow pages
│   ├── _app.tsx              # App layout wrapper
│   ├── index.tsx             # Enhanced homepage
│   ├── login.tsx             # Authentication pages
│   ├── movies.tsx            # Movie listing with filters
│   └── register.tsx          # User registration
├── 🎨 static/                 # Static assets & enhanced CSS
│   ├── styles.css            # Modern CSS with animations
│   ├── images/               # Movie posters & banners
│   └── icons/                # App icons & favicons
├── 🔧 utils/                  # Utility functions
│   ├── crypto.ts             # Security utilities
│   ├── database.ts           # Data management
│   ├── session.ts            # Session handling
│   └── validation.ts         # Input validation
└── 📝 types/                  # TypeScript definitions
    └── database.ts           # Data type definitions
```

## 🚀 Getting Started

### Prerequisites

Make sure you have [Deno](https://deno.land/) installed:

```bash
# Install Deno (if not already installed)
curl -fsSL https://deno.land/install.sh | sh

# Add Deno to your PATH
export PATH="$HOME/.deno/bin:$PATH"
```

### Quick Start

```bash
# Clone the repository
git clone https://github.com/bazhdarrzgar/film-booking.git
cd film-booking

# Start the development server
deno task start

# Open your browser
open http://localhost:8000
```

### Available Commands

```bash
# 🚀 Development
deno task start          # Start dev server with hot reload
deno task check          # Code formatting & linting
deno task build          # Build for production
deno task preview        # Preview production build

# 🔧 Maintenance  
deno task update         # Update Fresh framework
```

## 🎭 Demo Credentials

```bash
# Admin Access
Username: admin
Password: admin123

# Features Available:
✅ Movie management
✅ Booking analytics  
✅ User administration
✅ System settings
```

## 🎨 Design System

### Color Palette
```css
🔴 Primary Red:    #dc2626 → #b91c1c (gradients)
🟡 Accent Gold:    #fbbf24
🔵 Accent Blue:    #3b82f6  
⚫ Dark Themes:    #0f0f23 → #1a1a2e
🌫️ Glass Effects:  rgba(255,255,255,0.05) + backdrop-blur
```

### Typography
- **Primary Font**: Inter (Clean, modern sans-serif)
- **Display Font**: Poppins (Bold headings and CTAs)
- **Responsive Sizing**: `clamp()` functions for fluid typography

### Component Variants
- **Buttons**: Primary (gradient), Secondary (glass), Ghost (transparent)
- **Cards**: Movie cards with 3D hover effects
- **Forms**: Glass morphism inputs with floating labels
- **Navigation**: Backdrop blur with animated underlines

## 🎬 Key Features Showcase

### 🏠 Enhanced Homepage
- **Cinematic Hero Section** with dynamic backgrounds
- **Featured Movies Carousel** with interactive cards  
- **Modern UI Components** with glass effects
- **Smooth Animations** and micro-interactions

### 🎭 Movie Discovery
- **Advanced Search & Filtering** by genre, rating, language
- **Interactive Movie Cards** with hover animations
- **Detailed Movie Information** with rich metadata
- **Smart Recommendations** based on preferences

### 🎟️ Booking Experience  
- **Interactive Seat Selection** with real-time updates
- **Snack & Combo Ordering** with visual selection
- **Secure Payment Processing** with multiple options
- **Booking Confirmation** with QR codes

### 👨‍💼 Admin Dashboard
- **Movie Management** - Add, edit, remove movies
- **Screening Schedules** - Manage showtimes and theaters
- **Booking Analytics** - Revenue and occupancy reports
- **User Management** - Customer support tools

## 📱 Responsive Design

```
📱 Mobile First:     320px+ (Touch-optimized)
📱 Tablet:          768px+ (Enhanced layout)  
💻 Desktop:        1024px+ (Full features)
🖥️ Large Desktop:  1440px+ (Immersive experience)
```

## ♿ Accessibility Features

- **🎯 WCAG 2.1 Compliant** - AA accessibility standards
- **⌨️ Keyboard Navigation** - Full keyboard support
- **🔍 High Contrast Mode** - Support for visual impairments
- **🎭 Reduced Motion** - Respects user preferences
- **📖 Screen Reader** - Semantic HTML and ARIA labels

## 🔒 Security Features

- **🛡️ Modern Authentication** - Secure password hashing with Web Crypto API
- **🍪 Secure Sessions** - HTTP-only cookies with CSRF protection
- **🔐 Input Validation** - Comprehensive server-side validation
- **🚨 SQL Injection Prevention** - Parameterized queries
- **⚡ Rate Limiting** - API protection against abuse

## 🚀 Performance Optimizations

- **⚡ Server-Side Rendering** - Fast initial page loads
- **🎯 Optimized Assets** - Compressed images and efficient CSS
- **🔄 Smart Caching** - Strategic caching for better performance  
- **📱 Progressive Enhancement** - Works with JavaScript disabled
- **🏃‍♂️ Hardware Acceleration** - GPU-powered animations

## 🧪 Testing

```bash
# Run tests (when implemented)
deno task test

# Type checking
deno check **/*.ts **/*.tsx

# Linting  
deno lint

# Formatting
deno fmt
```

## 🚀 Deployment

### Environment Variables
```bash
# Production Configuration
DENO_ENV=production
DATABASE_URL=your_database_connection_string
SESSION_SECRET=your_session_secret_key
PAYMENT_API_KEY=your_payment_provider_key
ADMIN_EMAIL=admin@yoursite.com
```

### Build & Deploy
```bash
# Build for production
deno task build

# Deploy to Deno Deploy
deployctl deploy --project=flix-booking main.ts

# Or deploy to any Deno-compatible hosting
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md).

```bash
# Development Workflow
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper tests
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`  
6. Submit a Pull Request
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Fresh Framework](https://fresh.deno.dev/)** - For the amazing web framework
- **[Deno](https://deno.land/)** - For the secure TypeScript runtime  
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Preact](https://preactjs.com/)** - For the efficient React alternative
- **Community Contributors** - For feedback and improvements

## 📞 Support & Contact

<div align="center">

**Need Help?**

[![Email](https://img.shields.io/badge/Email-support%40flix.com-red?style=for-the-badge&logo=gmail)](mailto:support@flix.com)
[![Discord](https://img.shields.io/badge/Discord-Join%20Server-7289da?style=for-the-badge&logo=discord)](https://discord.gg/flix)
[![Twitter](https://img.shields.io/badge/Twitter-%40FlixBooking-1da1f2?style=for-the-badge&logo=twitter)](https://twitter.com/FlixBooking)

**⭐ If you like this project, please give it a star! ⭐**

</div>

---

<div align="center">

**Built with ❤️ using Fresh Framework, TypeScript, and Modern Web Standards**

*© 2025 Flix Movie Booking Platform. All rights reserved.*

</div>
