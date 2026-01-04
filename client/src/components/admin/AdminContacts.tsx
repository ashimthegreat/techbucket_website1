import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const contactsQuery = trpc.contacts.list.useQuery();
  const updateStatusMutation = trpc.contacts.updateStatus.useMutation();
  const markAsReadMutation = trpc.contacts.markAsRead.useMutation();

  useEffect(() => {
    if (contactsQuery.data) {
      setContacts(contactsQuery.data);
    }
  }, [contactsQuery.data]);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({
        id,
        status: status as any,
      });
      contactsQuery.refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsReadMutation.mutateAsync({ id });
      contactsQuery.refetch();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800";
      case "read":
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
        <h2 className="text-xl font-bold">Contact Submissions</h2>
        <p className="text-sm text-gray-600">Manage contact form submissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>All Submissions</CardTitle>
            <CardDescription>Total: {contacts.length} submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {contactsQuery.isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No contact submissions found</div>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition ${
                      !contact.isRead ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      setSelectedContact(contact);
                      if (!contact.isRead) {
                        handleMarkAsRead(contact.id);
                      }
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.subject}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContact ? (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                  <p className="text-sm">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                  <p className="text-sm break-all">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                    <p className="text-sm">{selectedContact.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Subject</label>
                  <p className="text-sm">{selectedContact.subject}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Message</label>
                  <p className="text-sm mt-1">{selectedContact.message}</p>
                </div>

                <div className="pt-4 space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase block">
                    Status
                  </label>
                  <select
                    value={selectedContact.status}
                    onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">Select a submission to view details</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
