// This file now mocks all API requests for demo purposes
import { QueryClient } from "@tanstack/react-query";

// Demo data
const demoStats = {
  splashes: { available: 1, total: 1 },
};
const demoWebsites = [
  { id: 1, name: "Demo Site", url: "https://demo.com", niche: "SaaS", monthlyCredits: 30, usedCredits: 5, opportunities: 12 },
];
const demoOpportunities = [
  {
    id: 1,
    siteName: "MarketingPro",
    siteType: "Blog",
    domain: "marketingpro.com",
    url: "https://marketingpro.com/guest-post",
    domainAuthority: 54,
    pageAuthority: 40,
    spamScore: 2,
    description: "Accepting guest posts in SaaS and marketing niches.",
    category: "Guest Post",
    relevanceScore: 92,
    isPremium: false,
    matchExplanation: {},
    websiteId: 1,
    niche: "SaaS",
    createdAt: null,
    contactInfo: { email: "editor@marketingpro.com" },
    isHidden: false,
  },
  {
    id: 2,
    siteName: "TechDirectory",
    siteType: "Directory",
    domain: "techdirectory.com",
    url: "https://techdirectory.com/submit",
    domainAuthority: 67,
    pageAuthority: 50,
    spamScore: 1,
    description: "Submit your SaaS to our curated tech directory.",
    category: "Directory",
    relevanceScore: 88,
    isPremium: true,
    matchExplanation: {},
    websiteId: 1,
    niche: "SaaS",
    createdAt: null,
    contactInfo: { email: "listings@techdirectory.com" },
    isHidden: false,
  },
  {
    id: 3,
    siteName: "GrowthHacker Blog",
    siteType: "Blog",
    domain: "growthhacker.com",
    url: "https://growthhacker.com/contribute",
    domainAuthority: 60,
    pageAuthority: 45,
    spamScore: 3,
    description: "Looking for SaaS growth stories.",
    category: "Guest Post",
    relevanceScore: 85,
    isPremium: false,
    matchExplanation: {},
    websiteId: 1,
    niche: "SaaS",
    createdAt: null,
    contactInfo: { email: "editor@growthhacker.com" },
    isHidden: false,
  },
];

export async function apiRequest(method: string, url: string, data?: unknown) {
  console.log(`Mock API Request: ${method} ${url}`, data);
  // Return demo data based on URL
  if (url.includes("/api/stats")) return { json: async () => demoStats, ok: true };
  if (url.includes("/api/websites")) return { json: async () => demoWebsites, ok: true };
  if (url.includes("/api/prospects/daily") || url.includes("/api/drips/opportunities")) return { json: async () => demoOpportunities, ok: true };
  if (url.includes("/api/user")) return { json: async () => ({ ...demoWebsites[0], ...{ firstName: "Demo", lastName: "User", username: "demo", email: "demo@linkdrip.ai", subscription: "Free Trial", onboardingCompleted: true } }), ok: true };
  // For all others, just resolve
  return { json: async () => ({ ok: true }), ok: true };
}

export const getQueryFn = <T = unknown>(options?: { on401?: string }) => async ({ queryKey }: { queryKey: readonly [string, ...any[]] }): Promise<T | null> => {
  const url = queryKey[0];
  console.log(`Mock Query: ${url}`);
  if (url.includes("/api/stats")) return demoStats as T;
  if (url.includes("/api/websites")) return demoWebsites as T;
  if (url.includes("/api/prospects/daily") || url.includes("/api/drips/opportunities")) return demoOpportunities as T;
  if (url.includes("/api/user")) return { ...demoWebsites[0], ...{ firstName: "Demo", lastName: "User", username: "demo", email: "demo@linkdrip.ai", subscription: "Free Trial", onboardingCompleted: true } } as T;
  return null;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
