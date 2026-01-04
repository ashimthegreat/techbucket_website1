import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import {
  ChevronRight,
  Network,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Search,
  Menu,
  X,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();
  const productsQuery = trpc.products.featured.useQuery();
  const servicesQuery = trpc.services.featured.useQuery();

  const products = productsQuery.data || [];
  const services = servicesQuery.data || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TB</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TechBucket</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#products" className="text-gray-700 hover:text-orange-600 transition">
                Products
              </a>
              <a href="#services" className="text-gray-700 hover:text-orange-600 transition">
                Services
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 transition">
                Contact
              </a>
              <Button
                onClick={() => setLocation("/admin/login")}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Admin
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a
                href="#products"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Products
              </a>
              <a
                href="#services"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Services
              </a>
              <a href="#about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                About
              </a>
              <a
                href="#contact"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Contact
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Technology <span className="text-orange-500">Partner</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              TechBucket enables entrepreneurs, small businesses, and enterprises with the best
              technological expertise, guidance, and support for achieving efficiency and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white gap-2"
                onClick={() => setLocation("/products")}
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900 gap-2"
                onClick={() => setLocation("/contact")}
              >
                Get in Touch
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive IT solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.length > 0 ? (
              services.map((service) => (
                <Card
                  key={service.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setLocation(`/services/${service.slug}`)}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <Network className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No services available
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setLocation("/services")}
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enterprise-grade IT hardware from leading manufacturers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                  onClick={() => setLocation(`/products/${product.slug}`)}
                >
                  {product.image && (
                    <div className="w-full h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {product.price ? `$${product.price}` : "Contact for pricing"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    <Button
                      className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocation(`/products/${product.slug}`);
                      }}
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No products available
              </div>
            )}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => setLocation("/products")}
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TechBucket?
            </h2>
            <p className="text-xl text-gray-600">We stand out from the crowd with our expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Team",
                description: "Energetic and qualified professionals specializing in IT solutions",
              },
              {
                icon: Zap,
                title: "Fast Delivery",
                description: "Quick turnaround times without compromising on quality",
              },
              {
                icon: Shield,
                title: "Secure Solutions",
                description: "Enterprise-grade security for your business needs",
              },
              {
                icon: Network,
                title: "Integrated Support",
                description: "Comprehensive support from design to implementation",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss your technology needs and find the perfect solution
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100 gap-2"
            onClick={() => setLocation("/contact")}
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">TechBucket</h3>
              <p className="text-sm">Your trusted technology partner for business growth</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#products" className="hover:text-orange-500 transition">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-orange-500 transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-orange-500 transition">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: info@techbucket.com.np</li>
                <li>Phone: +977-1-XXXXXXX</li>
                <li>Location: Balaju, Kathmandu, Nepal</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#contact" className="hover:text-orange-500 transition">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="/admin/login" className="hover:text-orange-500 transition">
                    Admin Panel
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 TechBucket Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
