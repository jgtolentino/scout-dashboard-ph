# Scout Analytics Dashboard

A comprehensive retail analytics dashboard built with Next.js, TypeScript, and Tailwind CSS, featuring Power BI-style filtering and Mosaic Lite UI components.

## 🚀 Features

- **Power BI-style Filtering System**: Global filter bar with persistent state and URL synchronization
- **Drill-down Navigation**: Breadcrumb navigation with filter context preservation
- **Comprehensive Analytics**: 
  - Transaction Trends
  - Product Mix/SKU Analysis
  - Consumer Behavior Analysis
  - Consumer Profiling & Cohort Analysis
  - AI Recommendations Panel
- **Modern UI**: Built with Tailwind CSS and Lucide React icons
- **State Management**: Zustand with Immer for immutable state updates
- **Responsive Design**: Mobile-friendly layout

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.3.4, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with Immer
- **Charts**: React Chart.js 2 & Chart.js
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📦 Installation

```bash
# Clone the repository
git clone [repository-url]
cd scout-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Usage

### Filter System

The global filter bar includes:
- **Date Range Picker**: Select custom date ranges
- **Region Filter**: Multi-select dropdown for geographic regions
- **Brand Filter**: Multi-select for brand filtering
- **Category Filter**: Product category selection
- **Store Filter**: Individual store selection
- **Quick Presets**: Pre-configured filter combinations

### Drill-down Navigation

- Click on any data point to drill down
- Use breadcrumb navigation to go back to previous levels
- Filter context is preserved at each drill-down level

### AI Recommendations

The AI panel provides intelligent insights based on current filters:
- Stock recommendations
- Demand alerts
- Cross-sell opportunities
- Promotional suggestions

## 🏗️ Project Structure

```
scout-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── GlobalFilterBar.tsx
│   │   ├── DrilldownBreadcrumb.tsx
│   │   ├── FilterSummary.tsx
│   │   ├── TransactionTrends.tsx
│   │   ├── ProductMixSKU.tsx
│   │   ├── ConsumerBehavior.tsx
│   │   ├── ConsumerProfiling.tsx
│   │   └── AIRecommendationPanel.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useFilterStore.ts
│   │   └── useFilterSync.ts
│   ├── pages/              # Next.js pages
│   │   ├── index.tsx       # Main dashboard
│   │   ├── trends.tsx
│   │   ├── products.tsx
│   │   ├── consumers.tsx
│   │   └── ai-chat.tsx
│   └── styles/
│       └── globals.css
├── public/                 # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json
```

## 🔧 Configuration

### Filter Store

The filter store (`useFilterStore`) manages:
- Date ranges
- Selected regions, brands, categories, stores
- Drill-down path history
- Filter presets

### URL Synchronization

Filters are automatically synchronized with the URL for:
- Bookmarkable states
- Browser back/forward navigation
- Deep linking support

## 🎨 Customization

### Adding New Filters

1. Update the `FilterState` interface in `useFilterStore.ts`
2. Add toggle functions for new filter types
3. Create UI components in `GlobalFilterBar.tsx`
4. Update URL sync in `useFilterSync.ts`

### Adding New Charts

1. Create new component files in `src/components/`
2. Import and use in the main dashboard (`src/pages/index.tsx`)
3. Connect to filter store for data filtering

### Styling

Modify `tailwind.config.js` to customize:
- Color schemes
- Typography
- Spacing
- Breakpoints

## 📊 Data Integration

To connect real data:

1. Create API endpoints in `src/pages/api/`
2. Add data fetching hooks
3. Update components to use real data
4. Implement loading states and error handling

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please open a GitHub issue or contact the development team.