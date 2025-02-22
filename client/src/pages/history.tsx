import { useQuery } from "@tanstack/react-query";
import { type Message } from "@shared/schema";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

export default function History() {
  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"]
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="h-32" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Message History</h1>
      <div className="space-y-4">
        {messages?.map((message) => (
          <Card key={message.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                {message.subject}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  From: {message.name} ({message.email})
                </p>
                <p className="text-gray-900">{message.message}</p>
                <p className="text-sm text-gray-500">
                  Sent {formatDistanceToNow(new Date(message.sentAt), { addSuffix: true })}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
