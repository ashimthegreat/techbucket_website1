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
      // Direct link to your live API
      const API_URL = "https://techbucket-website1.onrender.com/api/trpc/admin.login";
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: { username, password }
        }),
      });

      const data = await response.json();

      if (data.error) {
        // Handle tRPC error format
        const msg = data.error.json?.message || data.error.message || "Invalid credentials";
        setError(msg);
      } else if (data.result?.data) {
        // Success: Store session and go to Dashboard
        localStorage.setItem("adminSession", JSON.stringify(data.result.data));
        setLocation("/admin/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("Cannot reach server. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Phase 2: Management Console</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                disabled={loading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
