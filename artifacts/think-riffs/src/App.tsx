import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PostDetail from "@/pages/PostDetail";
import About from "@/pages/About";
import Art from "@/pages/Art";
import Navbar from "@/components/layout/Navbar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/post/:slug" component={PostDetail} />
      <Route path="/about" component={About} />
      <Route path="/art" component={Art} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <div className="min-h-screen flex flex-col w-full">
          <Navbar />
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
            <Router />
          </main>
        </div>
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
