# Frontend - StockFlow MVP

Next.js/React application for inventory management UI.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Pages

### Public Pages
- `/` - Landing page
- `/signup` - Create account
- `/login` - Login

### Authenticated Pages
- `/dashboard` - Inventory summary & low-stock alerts
- `/products` - Product list & management
- `/settings` - Organization settings

## Key Components

### Pages
- `pages/index.js` - Homepage
- `pages/login.js` - Login form
- `pages/signup.js` - Signup form
- `pages/dashboard.js` - Dashboard with stats
- `pages/products.js` - Products CRUD
- `pages/settings.js` - Settings management

### Libraries
- `lib/api.js` - API client with axios
- `lib/auth.js` - Authentication hook

### Styles
- CSS Modules in `styles/` for component isolation
- Mobile-responsive design
- Consistent color scheme (purple/blue gradient)

## Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in all API requests via interceptor
5. Logout clears token and redirects to login

## Key Features

### Dashboard
- Total product count
- Total inventory quantity
- Low-stock items table
- Navigation to products & settings

### Products
- Search by name or SKU
- Create new products
- Delete products
- Inline editing (via modal/form)
- Stock quantity display

### Settings
- Global low-stock threshold
- Organization-wide default
- Save confirmation

## Styling

Using CSS Modules for scoped styles:
- Color scheme: `#667eea` (primary) & `#764ba2` (accent)
- Responsive grid layouts
- Form validation styling
- Consistent spacing & typography

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## API Client

Configured in `lib/api.js`:
- Automatic Bearer token injection
- Base URL from environment
- Error handling per endpoint
- Organized by resource (auth, products, dashboard, settings)

## Authentication Guard

Protected pages redirect to `/login` if not authenticated using:
- localStorage token check
- useAuth hook
- Next.js router

## Error Handling

- API errors display in UI
- Form validation feedback
- Confirmation dialogs for destructive actions
- Loading states during async operations
