import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDocuments = query({
  handler: async (ctx) => {

    const identity = await ctx.auth.getUserIdentity();
    if(!identity) {
      throw new Error("Not authenticated")
    }

    const documents = await ctx.db.query("documents").collect();

    return documents 
  }
})

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents"))
  },
  /**
   * Async function to handle the logic for creating a new document in the database.
   */
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});
