# ShareCart - B2B Surplus Food Marketplace

A modern web application built with **Vite + React** that connects vendors with surplus food items to buyers looking for discounted bulk purchases.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run Express server (production)
npm start
```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint on all JS/JSX files |
| `npm start` | Run Express server serving dist/ folder |

## 🏗️ Project Structure

```
sharecart/
├── src/
│   ├── pages/              # Route pages (Home, Login, Products, etc)
│   ├── components/         # Reusable UI components
│   │   └── ui/            # UI primitives (Button, Input, Card, etc)
│   ├── context/           # React Context (Auth, Products)
│   ├── utils/             # Mock data and utilities
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles & Tailwind
├── dist/                  # Production build output
├── public/                # Static assets
└── package.json           # Dependencies & scripts
```

## 🔐 Authentication

- Phone-based login system
- Shop details during signup (image upload required)
- Session persistence using localStorage
- Protected routes with role-based redirects

## 📦 Features

✅ **Browse Products**
- Search and filter by category
- Filter by freshness level
- View detailed product information
- Vendor ratings and reviews

✅ **Vendor Management**
- Create new product listings
- Manage your own products
- View vendor profiles
- Track sales and inventory

✅ **Messaging**
- Chat with other vendors
- Real-time message notifications
- Message history

✅ **User Dashboard**
- Home with personalized recommendations
- Product management interface
- Profile settings
- Vendor directory

## 🎨 Design System

**Tech Stack:**
- **React 18** - UI framework
- **Vite 5** - Build tool
- **TailwindCSS 4** - Styling
- **React Router 7** - Routing
- **Lucide React** - Icons

**Color Palette:**
- Primary: Indigo to Violet gradient
- Success: Emerald to Teal
- Warning: Amber
- Danger: Red

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons and inputs
- Optimized navigation for all screen sizes

## 🚀 Deployment

### Deploy to Vercel/Netlify
```bash
npm run build
# Push dist/ folder or connect repo directly
```

### Deploy with Express Server
```bash
npm install
npm run build
npm start
# Runs on port 5000 (configurable with PORT env var)
```

## 📊 Performance

- **Build Size**: 281.79 KB JS + 55.62 KB CSS (gzipped)
- **Build Time**: ~3.5 seconds
- **Modules**: 1773 optimized modules
- **No external API calls** - uses mock data for demo

## 🔒 Security

- No sensitive data in environment variables
- localStorage used only for session persistence
- React automatically escapes XSS vulnerabilities
- HTTPS recommended for production

## 📖 Documentation

- See `CLAUDE.md` for detailed architecture
- See `IMPLEMENTATION_SUMMARY.md` for feature list
- See `DEPLOYMENT_CHECKLIST.md` for deployment readiness

## 🛠️ Development

The app uses mock data stored in `src/utils/mockData.jsx`. When backend API is ready, replace the data layer in `src/context/ProductContext.jsx`.

## 📄 License

MIT - See LICENSE file for details
