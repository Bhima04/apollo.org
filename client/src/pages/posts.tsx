import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertPostSchema, type InsertPost, type Post } from "@shared/schema";
import { ImagePlus, FileUp, Film } from "lucide-react";

export default function Posts() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<InsertPost>({
    resolver: zodResolver(insertPostSchema),
    defaultValues: {
      caption: "",
      files: []
    }
  });

  const { data: posts } = useQuery<Post[]>({
    queryKey: ["/api/posts"]
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to create post');
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Post created",
        description: "Your post has been created successfully.",
      });
      form.reset();
      setSelectedFiles([]);
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (values: InsertPost) => {
    const formData = new FormData();
    formData.append('caption', values.caption);
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="caption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caption</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write your caption here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel>Upload Files</FormLabel>
                <Input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,image/*,video/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setSelectedFiles(files);
                  }}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted px-3 py-1 rounded-lg">
                    {file.type.startsWith('image/') && <ImagePlus className="w-4 h-4" />}
                    {file.type.startsWith('video/') && <Film className="w-4 h-4" />}
                    {!file.type.startsWith('image/') && !file.type.startsWith('video/') && (
                      <FileUp className="w-4 h-4" />
                    )}
                    <span className="text-sm">{file.name}</span>
                  </div>
                ))}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Creating post..." : "Create Post"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        {posts?.map((post) => (
          <Card key={post.id}>
            <CardContent className="pt-6">
              <p className="mb-4">{post.caption}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {post.files.map((file, index) => (
                  <div key={index} className="relative aspect-square">
                    {file.type === "image" && (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className="object-cover rounded-lg w-full h-full"
                      />
                    )}
                    {file.type === "video" && (
                      <video 
                        src={file.url} 
                        controls 
                        className="object-cover rounded-lg w-full h-full"
                      />
                    )}
                    {file.type === "file" && (
                      <a 
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="flex flex-col items-center justify-center w-full h-full bg-muted rounded-lg p-4"
                      >
                        <FileUp className="w-8 h-8 mb-2" />
                        <span className="text-sm text-center break-words">{file.name}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Posted {new Date(post.createdAt!).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
