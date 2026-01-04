import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const [, setLocation] = useLocation();
  const slug = params?.slug as string;

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    companyName: "",
    quantity: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const productQuery = trpc.products.getBySlug.useQuery({ slug });
  const createQuoteMutation = trpc.quotes.create.useMutation();

  const product = productQuery.data;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createQuoteMutation.mutateAsync({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        productId: product?.id,
        companyName: formData.companyName || undefined,
        quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
        message: formData.message || undefined,
      });

      setSubmitted(true);
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        companyName: "",
        quantity: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitted(false);
        setLocation("/products");
      }, 3000);
    } catch (error) {
      console.error("Error submitting quote:", error);
    } finally {
      setLoading(false);
    }
  };

  if (productQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="ghost" className="mb-4 gap-2" onClick={() => setLocation("/products")}>
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Product not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="mb-4 gap-2"
            onClick={() => setLocation("/products")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Details */}
          <div className="lg:col-span-2">
            {product.image && (
              <div className="mb-8 rounded-lg overflow-hidden bg-gray-200 h-96">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {product.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                )}

                {product.specifications && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <pre className="text-sm text-gray-700 overflow-auto">
                        {product.specifications}
                      </pre>
                    </div>
                  </div>
                )}

                {product.price && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Price</h3>
                    <p className="text-2xl font-bold text-orange-600">${product.price}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quote Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <CardDescription>Fill in your details to get a quote</CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quote Submitted!</h3>
                    <p className="text-sm text-gray-600">
                      We will contact you soon with a detailed quote.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium block mb-1">Name *</label>
                      <Input
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({ ...formData, customerName: e.target.value })
                        }
                        placeholder="Your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Email *</label>
                      <Input
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, customerEmail: e.target.value })
                        }
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Phone *</label>
                      <Input
                        value={formData.customerPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, customerPhone: e.target.value })
                        }
                        placeholder="+977-1-XXXXXXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Company</label>
                      <Input
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData({ ...formData, companyName: e.target.value })
                        }
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Quantity</label>
                      <Input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        placeholder="1"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium block mb-1">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any additional details..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Get Quote"
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
