import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    licenseNumber: "",
    licenseCategory: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // In a real app, this would call an API
    // For demo, we just redirect to login
    alert("Registration successful! Please login with your credentials.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">FleetFlow</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@fleetflow.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 555-0100"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={formData.role} onValueChange={(v) => handleChange("role", v)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Fleet Manager</SelectItem>
                  <SelectItem value="dispatcher">Dispatcher</SelectItem>
                  <SelectItem value="safety">Safety Officer</SelectItem>
                  <SelectItem value="finance">Financial Analyst</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.role === "dispatcher" || formData.role === "safety") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">License Number</Label>
                  <Input
                    id="licenseNumber"
                    placeholder="DL-123456"
                    value={formData.licenseNumber}
                    onChange={(e) => handleChange("licenseNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>License Category</Label>
                  <Select
                    value={formData.licenseCategory}
                    onValueChange={(v) => handleChange("licenseCategory", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="bike">Bike</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                required
              />
            </div>

            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <span>Already have an account? </span>
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
