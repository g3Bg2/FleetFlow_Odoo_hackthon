import { ArrowRight, BarChart3, Route, Sparkles, Truck, Wrench } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { dummyUsers, roleLabels } from "@/lib/auth";

const features = [
  { icon: Truck, label: "Vehicle Tracking", desc: "Real-time fleet visibility" },
  { icon: Route, label: "Trip Management", desc: "Smart dispatch system" },
  { icon: Wrench, label: "Maintenance", desc: "Preventive care alerts" },
  { icon: BarChart3, label: "Analytics", desc: "Performance insights" },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = login(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Invalid credentials");
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const result = login(email, password);
    if (result.success) {
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute inset-0 bg-linear-to-br from-primary/90 via-violet-600/80 to-primary/70" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">FleetFlow</span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold leading-tight mb-4">
                Command your fleet
                <br />
                <span className="text-white/80">with precision</span>
              </h1>
              <p className="text-lg text-white/70 max-w-md">
                The modern fleet management platform that helps you track, manage, and optimize your
                operations in real-time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/15"
                >
                  <feature.icon className="w-5 h-5 mt-0.5 text-white/80" />
                  <div>
                    <div className="font-medium">{feature.label}</div>
                    <div className="text-sm text-white/60">{feature.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-white/60">
            <span>Trusted by 500+ companies</span>
            <span>•</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow-sm">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">FleetFlow</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to access your dashboard</p>
          </div>

          {/* Quick Login Cards */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Quick login as:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {dummyUsers.slice(0, 4).map((user) => (
                <button
                  key={user.email}
                  type="button"
                  onClick={() => handleQuickLogin(user.email, user.password)}
                  disabled={isLoading}
                  className="group text-left p-3 rounded-xl border-2 border-border bg-card hover:border-primary/50 hover:bg-accent/50 transition-all duration-200 disabled:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {user.role.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{roleLabels[user.role]}</div>
                      <div className="text-xs text-muted-foreground truncate">{user.name}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-slide-up">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
