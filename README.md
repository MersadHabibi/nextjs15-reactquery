This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Feature Flags System

This project includes a feature flags system that allows you to easily enable or disable entire sections of the application.

## How to Use Feature Flags

### 1. Define Features

All features are defined in `src/config/features.ts`. To add a new feature, add it to the `FeatureFlag` enum:

```typescript
export enum FeatureFlag {
  DASHBOARD = "DASHBOARD",
  FILES = "FILES",
  CATEGORIES = "CATEGORIES",
  PROFILE = "PROFILE",
  // Add your new feature here
  // MY_NEW_FEATURE = "MY_NEW_FEATURE",
}
```

### 2. Enable/Disable Features

To enable or disable a feature, modify the `ENABLED_FEATURES` array in `src/config/features.ts`:

```typescript
export const ENABLED_FEATURES: FeatureFlag[] = [
  FeatureFlag.DASHBOARD,
  FeatureFlag.FILES,
  FeatureFlag.CATEGORIES,
  // FeatureFlag.PROFILE, // Uncomment to enable profile section
  // FeatureFlag.MY_NEW_FEATURE, // Uncomment to enable your new feature
];
```

### 3. Feature-Gate Components

Use the `withFeature` higher-order component to conditionally render components based on feature flags:

```typescript
import { FeatureFlag } from "@/config/features";
import { withFeature } from "@/lib/withFeature";

function MyComponent() {
  // Component implementation
}

// Export the component wrapped with the feature flag
export default withFeature(MyComponent, FeatureFlag.MY_FEATURE);
```

### 4. Feature-Gate Pages

For Next.js pages, you can use the `isFeatureEnabled` function to redirect or show a 404 page:

```typescript
import { FeatureFlag, isFeatureEnabled } from "@/config/features";
import { notFound } from "next/navigation";

export default function MyPage() {
  // If the feature is disabled, return 404
  if (!isFeatureEnabled(FeatureFlag.MY_FEATURE)) {
    notFound();
  }

  return <div>My Page Content</div>;
}
```

### 5. Feature-Gate Routes

Routes in the menu are automatically filtered based on their associated feature flag:

```typescript
// src/app/(panel)/_components/routes.tsx
const allMenuItems: MenuItem[] = [
  {
    title: "My Feature",
    icon: <Icon />,
    href: "/dashboard/my-feature",
    feature: FeatureFlag.MY_FEATURE, // Associate with a feature flag
  },
];
```

## Benefits

- **Easy to add/remove sections**: Simply enable/disable a feature flag to add or remove entire sections
- **Clean code**: No need for complex conditional logic throughout the codebase
- **Consistent behavior**: All related components, pages, and routes are automatically enabled/disabled together
