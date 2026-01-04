import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminSupport() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

  const inquiriesQuery = trpc.support.list.useQuery();
  const updateStatusMutation = trpc.support.updateStatus.useMutation();
  const markAsReadMutation = trpc.support.markAsRead.useMutation();

  useEffect(() => {
    if (inquiriesQuery.data) {
      setInquiries(inquiriesQuery.data);
    }
  }, [inquiriesQuery.data]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id,
        status: status as any,
      });
      inquiriesQuery.refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsReadMutation.mutateAsync({ id });
      inquiriesQuery.refetch();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Support Inquiries</h2>
        <p className="text-sm text-gray-600">Manage customer support requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Inquiries</CardTitle>
            <CardDescription>Total: {inquiries.length} inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            {inquiriesQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No support inquiries found</div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                      !inquiry.isRead ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setSelectedInquiry(inquiry);
                      if (!inquiry.isRead) {
                        handleMarkAsRead(inquiry.id);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{inquiry.name}</h3>
                        <p className="text-sm text-gray-600">{inquiry.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(inquiry.priority)}>
                          {inquiry.priority}
                        </Badge>
                        <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Inquiry Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedInquiry ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                  <p className="text-sm">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                  <p className="text-sm break-all">{selectedInquiry.email}</p>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                    <p className="text-sm">{selectedInquiry.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Subject</label>
                  <p className="text-sm">{selectedInquiry.subject}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
                  <p className="text-sm mt-1">{selectedInquiry.message}</p>
                </div>

                <div className="pt-4 space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase block">
                    Priority
                  </label>
                  <select
                    value={selectedInquiry.priority}
                    onChange={(e) => {
                      setSelectedInquiry({
                        ...selectedInquiry,
                        priority: e.target.value,
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase block">
                    Status
                  </label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">Select an inquiry to view details</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
