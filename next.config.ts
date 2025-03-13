import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    localSecretKey: process.env.LOCAL_SECRET_KEY,
    websiteDomain: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN,
    websiteDomainShop: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN_SHOP,
    websiteDomainPost: process.env.NEXT_PUBLIC_WEBSITE_DOMAIN_POST,
    websiteDomainShopCategories:
      process.env.NEXT_PUBLIC_WEBSITE_DOMAIN_SHOP_CATEGORIES,
    websiteDomainPostCategories:
      process.env.NEXT_PUBLIC_WEBSITE_DOMAIN_POST_CATEGORIES,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms-bucket-hadirasouli.storage.c2.liara.space",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
