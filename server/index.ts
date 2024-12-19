import { procedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const appRouter = router({
  //AUTHOR
  getAuthors: procedure.query(async () => {
    return await prisma.author.findMany({
      include: { posts: true },
    });
  }),

  getAuthorById: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.author.findUnique({
        where: { id: input.id },
        include: {
          posts: true,
        },
      });
    }),

  createAuthor: procedure.input(z.string()).mutation(async (req) => {
    return await prisma.author.create({
      data: {
        name: req.input,
      },
    });
  }),

  updateAuthor: procedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.author.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    }),

  deleteAuthor: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.author.delete({
        where: { id: input.id },
      });
    }),

  //POST
  getPosts: procedure.query(async () => {
    return await prisma.post.findMany({
      include: { author: true },
    });
  }),

  getPostById: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.post.findUnique({
        where: { id: input.id },
        include: {
          author: true,
        },
      });
    }),

  createPost: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.number(),
      })
    )
    .mutation(async (req) => {
      return await prisma.post.create({
        data: req.input,
      });
    }),

  updatePost: procedure
    .input(z.object({ id: z.number(), title: z.string(), content: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.post.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),

  deletePost: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.post.delete({
        where: { id: input.id },
      });
    }),
});

export type AppRouter = typeof appRouter;
