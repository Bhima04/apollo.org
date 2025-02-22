import { messages, users, posts, type Message, type InsertMessage, type User, type InsertUser, type Post, type InsertPost } from "@shared/schema";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createPost(post: InsertPost, userId: number): Promise<Post>;
  getPosts(): Promise<Post[]>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Message>;
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private currentMessageId: number;
  private currentUserId: number;
  private currentPostId: number;

  constructor() {
    this.messages = new Map();
    this.users = new Map();
    this.posts = new Map();
    this.currentMessageId = 1;
    this.currentUserId = 1;
    this.currentPostId = 1;

    // Initialize with default admin user
    this.initializeDefaultUser();
  }

  private async initializeDefaultUser() {
    const defaultUser: InsertUser = {
      username: "hexacomm",
      password: "hexaaa080910" // In real app, this should be hashed
    };
    const user: User = { ...defaultUser, id: this.currentUserId++ };
    this.users.set(user.id, user);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      sentAt: new Date(),
      status: 'sent'
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values())
      .sort((a, b) => (b.sentAt?.getTime() || 0) - (a.sentAt?.getTime() || 0));
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createPost(insertPost: InsertPost, userId: number): Promise<Post> {
    const id = this.currentPostId++;
    const post: Post = {
      ...insertPost,
      id,
      userId,
      createdAt: new Date()
    };
    this.posts.set(id, post);
    return post;
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
}

export const storage = new MemStorage();