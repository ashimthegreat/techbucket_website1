import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, Trash2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);

  const quotesQuery = trpc.quotes.list.useQuery();
  const updateStatusMutation = trpc.quotes.updateStatus.useMutation();
  const markAsReadMutation = trpc.quotes.markAsRead.useMutation();

  useEffect(() => {
    if (quotesQuery.data) {
      setQuotes(quotesQuery.data);
    }
  }, [quotesQuery.data]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id,
        status: status as any,
      });
      quotesQuery.refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsReadMutation.mutateAsync({ id });
      quotesQuery.refetch();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "responded":
        return "bg-green-100 text-green-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Quote Requests</h2>
        <p className="text-sm text-gray-600">Manage customer quote requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quotes List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Requests</CardTitle>
            <CardDescription>Total: {quotes.length} requests</CardDescription>
          </CardHeader>
          <CardContent>
            {quotesQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : quotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No quote requests found</div>
            ) : (
              <div className="space-y-3">
                {quotes.map((quote) => (
                  <div
                    key={quote.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                      !quote.isRead ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setSelectedQuote(quote);
                      if (!quote.isRead) {
                        handleMarkAsRead(quote.id);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{quote.customerName}</h3>
                        <p className="text-sm text-gray-600">{quote.customerEmail}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(quote.status)}>{quote.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quote Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedQuote ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                  <p className="text-sm">{selectedQuote.customerName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                  <p className="text-sm break-all">{selectedQuote.customerEmail}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                  <p className="text-sm">{selectedQuote.customerPhone}</p>
                </div>
                {selectedQuote.companyName && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Company</label>
                    <p className="text-sm">{selectedQuote.companyName}</p>
                  </div>
                )}
                {selectedQuote.quantity && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">
                      Quantity
                    </label>
                    <p className="text-sm">{selectedQuote.quantity}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
                  <p className="text-sm mt-1">{selectedQuote.message || "No message"}</p>
                </div>

                <div className="pt-4 space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase block">
                    Status
                  </label>
                  <select
                    value={selectedQuote.status}
                    onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="responded">Responded</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">Select a quote to view details</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
