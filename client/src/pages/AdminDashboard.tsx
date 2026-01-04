import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";
import { LogOut, Package, Wrench, MessageSquare, Mail, LifeBuoy } from "lucide-react";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminServices from "@/components/admin/AdminServices";
import AdminQuotes from "@/components/admin/AdminQuotes";
import AdminContacts from "@/components/admin/AdminContacts";
import AdminSupport from "@/components/admin/AdminSupport";

export default function AdminDashboard() {
  const [adminSession, setAdminSession] = useState<any>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const session = localStorage.getItem("adminSession");
    if (!session) {
      setLocation("/admin/login");
      return;
    }
    setAdminSession(JSON.parse(session));
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    setLocation("/admin/login");
  };

  if (!adminSession) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">TechBucket Admin</h1>
            <p className="text-sm text-gray-600">Welcome, {adminSession.username}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">Total products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">Total services</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Quote Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">Pending quotes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-gray-500">New messages</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="products" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Products</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Quotes</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contacts</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="gap-2">
              <LifeBuoy className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <AdminProducts />
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <AdminServices />
          </TabsContent>

          <TabsContent value="quotes" className="mt-6">
            <AdminQuotes />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <AdminContacts />
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <AdminSupport />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
