# 🛒 Modern E-Commerce Product Listing

A responsive, feature-rich e-commerce product listing application built with Next.js 15, TypeScript, and modern web technologies. This project demonstrates advanced React patterns, state management, and user experience design.

## ✨ Features

### 🎯 Core Functionality
- **Product Grid Display** - Responsive grid layout showcasing products from Fake Store API
- **Advanced Search & Filtering** - Real-time search by product name and category filtering
- **Product Details Modal** - Detailed product view with image gallery and specifications
- **Shopping Cart System** - Full cart functionality with quantity management and checkout
- **Add Product Form** - Form to add new products with comprehensive validation

### 🔧 Technical Features
- **Global State Management** - Zustand for efficient state handling
- **Data Fetching** - React Query for optimized API calls and caching
- **Form Validation** - React Hook Form with Zod schema validation
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Loading States** - Skeleton loaders and smooth transitions
- **Error Handling** - Comprehensive error boundaries and user feedback

## 🚀 Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **API**: Fake Store API

## 📦 Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/ecommerce-fp.git
   cd ecommerce-fp
   \`\`\`



4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and design tokens
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── add-product-form.tsx    # Product creation form
│   ├── header.tsx              # Navigation header
│   ├── product-card.tsx        # Individual product display
│   ├── product-details-modal.tsx  # Product detail view
│   ├── product-grid.tsx        # Products grid layout
│   ├── search-and-filter.tsx   # Search and filter controls
│   └── shopping-cart.tsx       # Cart management
├── lib/
│   ├── api.ts              # API functions
│   ├── react-query-provider.tsx  # React Query setup
│   ├── store.ts            # Zustand store configuration
│   ├── utils.ts            # Utility functions
│   └── validations.ts      # Zod schemas
└── hooks/
    └── use-mobile.tsx      # Mobile detection hook
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Cyan (600-700) - Modern, trustworthy brand color
- **Secondary**: Lime (400-500) - Energetic accent for CTAs
- **Neutrals**: Slate grays for text and backgrounds
- **Success**: Emerald for positive actions
- **Warning**: Amber for alerts

### Typography
- **Headings**: Inter font family with multiple weights
- **Body**: Optimized for readability with proper line heights
- **Responsive**: Fluid typography scaling across devices

## 🔄 State Management

The application uses Zustand for global state management with the following stores:

- **Search & Filter State**: Query terms and category filters
- **Shopping Cart**: Cart items, quantities, and totals
- **UI State**: Modal visibility and loading states

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices with progressive enhancement
- **Breakpoints**: Tailored layouts for mobile, tablet, and desktop
- **Touch Friendly**: Appropriate touch targets and gestures
- **Performance**: Optimized images and lazy loading

## 🧪 Key Features Implementation

### Product Grid
- Fetches products from Fake Store API using React Query
- Implements skeleton loading states
- Responsive grid layout (1-4 columns based on screen size)

### Search & Filtering
- Client-side filtering for optimal performance
- Real-time search with debouncing
- Category-based filtering with dynamic options

### Shopping Cart
- Persistent cart state across sessions
- Quantity management with validation
- Price calculations and totals
- Slide-out cart interface

### Form Validation
- Zod schemas for type-safe validation
- Real-time error feedback
- Accessible form controls

## 🚀 Performance Optimizations

- **React Query Caching**: Efficient data fetching and caching
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Bundle Analysis**: Optimized bundle size and tree shaking

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced filtering (price range, ratings)
- [ ] Product comparison feature
- [ ] Order history and tracking
- [ ] Payment integration
- [ ] Admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for providing the product data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for seamless deployment

---

**Built with ❤️ using modern web technologies**
