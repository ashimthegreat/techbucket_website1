import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Services() {
  const [, setLocation] = useLocation();
  const servicesQuery = trpc.services.list.useQuery();

  const services = servicesQuery.data || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="mb-4 gap-2" onClick={() => setLocation("/")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Services</h1>
          <p className="text-gray-600">Comprehensive IT solutions for your business</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No services available at the moment</p>
          </div>
        ) : (
          <div className="space-y-8">
            {services.map((service: any, idx: number) => (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                  {service.image && (
                    <div className="lg:col-span-1 h-48 lg:h-auto rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className={service.image ? "lg:col-span-2" : "lg:col-span-3"}>
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>

                    {service.features && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {(() => {
                            try {
                              const features = JSON.parse(service.features);
                              return features.map((feature: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 text-gray-600">
                                  <span className="text-orange-600 font-bold mt-1">•</span>
                                  <span>{feature}</span>
                                </li>
                              ));
                            } catch {
                              return (
                                <li className="text-gray-600">{service.features}</li>
                              );
                            }
                          })()}
                        </ul>
                      </div>
                    )}

                    <Button
                      className="bg-orange-600 hover:bg-orange-700 gap-2"
                      onClick={() => setLocation("/contact")}
                    >
                      Request Quote
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
