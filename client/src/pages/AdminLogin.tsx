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
      const API_URL = "https://techbucket-website1.onrender.com/api/trpc/admin.login?batch=1";
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-trpc-source": "react"
        },
        body: JSON.stringify({
          "0": {
            json: { username, password }
          }
        }),
      });

      const resJson = await response.json();
      const data = Array.isArray(resJson) ? resJson[0] : resJson;

      if (data.error) {
        const msg = data.error.json?.message || data.error.message || "Invalid credentials";
        setError(msg);
      } else if (data.result?.data?.json || data.result?.data) {
        const adminData = data.result.data.json || data.result.data;
        localStorage.setItem("adminSession", JSON.stringify(adminData));
        setLocation("/admin/dashboard");
      } else {
        setError("Login failed. Check credentials.");
      }
    } catch (err) {
      setError("Network error. Backend might be sleeping.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>TechBucket Phase 2</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
            <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
