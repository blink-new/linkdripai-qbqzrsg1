import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient"; // Mocked queryClient
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AuthProvider } from "@/hooks/use-auth"; // Mocked AuthProvider
import Dashboard from "@/pages/dashboard";
import AuthPage from "@/pages/auth-page";
import DripsSimplePage from "@/pages/drips-simple";
import RedirectWrapper from "@/pages/redirect-wrapper";
import SavedProspects from "@/pages/saved-prospects";
import EmailOutreach from "@/pages/email-outreach";
import EmailOutreachDemo from "@/pages/email-outreach-demo";
import MultiChannelOutreachPage from "@/pages/multi-channel-outreach";
import Analytics from "@/pages/analytics";
import LandingPage from "@/pages/landing-page";
import PricingPage from "@/pages/pricing-page";
import Onboarding from "@/pages/onboarding-improved";
import WebsitesPage from "@/pages/websites";
import BillingPage from "@/pages/billing";
import HelpPage from "@/pages/help";
import SettingsPage from "@/pages/settings";
import AccountPage from "@/pages/account-page";

// This Router uses components that will rely on the mocked AuthProvider and QueryClientProvider
function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/drips" component={DripsSimplePage} />
      <Route path="/opportunities" component={() => <RedirectWrapper to="/drips" />} />
      <Route path="/saved-prospects" component={SavedProspects} />
      <Route path="/email-outreach" component={EmailOutreach} />
      <Route path="/email-outreach-demo" component={EmailOutreachDemo} />
      <Route path="/outreach/:id" component={MultiChannelOutreachPage} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/onboarding/improved" component={Onboarding} />
      <Route path="/websites" component={WebsitesPage} />
      <Route path="/billing" component={BillingPage} />
      <Route path="/account" component={AccountPage} />
      <Route path="/help" component={HelpPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* This will use the mocked useAuth */} 
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
