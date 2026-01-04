import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use the environment variable for the backend URL
      // If not set, it defaults to your specific Render API URL
      const API_BASE_URL = import.meta.env.VITE_API_URL || "https://techbucket-website1.onrender.com";
      
      // We ensure the path is correct for tRPC mutations
      const response = await fetch(`${API_BASE_URL}/trpc/admin.login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // tRPC expects the data wrapped in an input object
          input: {
            username,
            password,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        // Handle tRPC specific error messages
        const errorMessage = data.error?.json?.message || data.error?.message || "Login failed";
        setError(errorMessage);
      } else {
        // Success: Store admin session
        // Note: tRPC results are usually nested in .result.data.json
        const sessionData = data.result?.data?.json || data.result?.data;
        localStorage.setItem("adminSession", JSON.stringify(sessionData));
        setLocation("/admin/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unable to connect to the server. Please check your internet or API status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Authorized personnel only.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
