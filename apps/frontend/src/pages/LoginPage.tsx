import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { dummyUsers, roleLabels } from "@/lib/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed");
    }
  };

  const handleQuickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    const result = login(email, password);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
        {/* Login Form */}
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">FleetFlow</CardTitle>
            <CardDescription>Sign in to manage your fleet operations</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@fleetflow.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-primary hover:underline font-medium">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-slate-50">
          <CardHeader>
            <CardTitle className="text-lg">Demo Credentials</CardTitle>
            <CardDescription>Click any role to quick-login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dummyUsers.map((user) => (
              <button
                key={user.email}
                type="button"
                onClick={() => handleQuickLogin(user.email, user.password)}
                className="w-full text-left p-3 rounded-lg border bg-white hover:border-primary hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{roleLabels[user.role]}</div>
                    <div className="text-sm text-muted-foreground">{user.name}</div>
                  </div>
                  <div className="text-xs text-muted-foreground bg-slate-100 px-2 py-1 rounded">
                    {user.role}
                  </div>
                </div>
              </button>
            ))}
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-amber-800">
                <strong>Permissions:</strong>
                <br />• Manager: Full access
                <br />• Dispatcher: Trips, Vehicles, Maintenance
                <br />• Safety: Drivers, Vehicles, Maintenance
                <br />• Finance: Analytics, Fuel, Maintenance
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
