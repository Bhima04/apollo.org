import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertPostSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import { ZodError } from "zod";
import multer from "multer";
import path from "path";
import express from 'express';
import { generateEmailTemplate } from "./services/openai-service";

export async function registerRoutes(app: Express) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  // Configure multer for file uploads
  const upload = multer({
    storage: multer.diskStorage({
      destination: './uploads',
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    }),
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB limit
    }
  });

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await storage.getUserByUsername(username);

    if (user && user.password === password) {
      // In a real app, we'd use sessions/JWT
      res.json({ id: user.id, username: user.username });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });

  app.get("/api/user", async (req, res) => {
    // This is a placeholder. In a real app, we'd check session/JWT
    const user = await storage.getUserByUsername("hexacomm");
    if (user) {
      res.json({ id: user.id, username: user.username });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  app.post("/api/posts", upload.array('files'), async (req, res) => {
    try {
      const files = (req.files as Express.Multer.File[])?.map(file => ({
        type: file.mimetype.startsWith('image/')
          ? 'image'
          : file.mimetype.startsWith('video/')
          ? 'video'
          : 'file',
        url: `/uploads/${file.filename}`,
        name: file.originalname
      })) || [];

      const postData = {
        caption: req.body.caption,
        files
      };

      const validatedData = insertPostSchema.parse(postData);
      const post = await storage.createPost(validatedData, 1); // Assuming user ID 1 for now
      res.json(post);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create post" });
      }
    }
  });

  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: 'contact@hexacomm.com',
        subject: messageData.subject,
        text: `From: ${messageData.name} <${messageData.email}>\n\n${messageData.message}`,
        replyTo: messageData.email
      });

      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: "Invalid input", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static('uploads'));

  app.post("/api/generate-template", async (req, res) => {
    try {
      const template = await generateEmailTemplate(req.body);
      res.json(template);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate template" });
    }
  });

  return createServer(app);
}