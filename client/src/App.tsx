import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/navigation";
import { ProtectedRoute } from "@/components/protected-route";
import Home from "@/pages/home";
import History from "@/pages/history";
import Dashboard from "@/pages/dashboard";
import Posts from "@/pages/posts";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard">
        <ProtectedRoute>
          <Navigation />
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/posts">
        <ProtectedRoute>
          <Navigation />
          <Posts />
        </ProtectedRoute>
      </Route>
      <Route path="/history">
        <ProtectedRoute>
          <Navigation />
          <History />
        </ProtectedRoute>
      </Route>
      <Route path="/contact">
        <ProtectedRoute>
          <Navigation />
          <Home />
        </ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;