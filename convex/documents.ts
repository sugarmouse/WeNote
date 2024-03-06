import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", q =>
        q
          .eq("userId", userId)
          .eq("parentDocument", args.parentDocument)
      )
      .filter(q => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  }
});

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


export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity)
      throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("You do not have access to this document");
    }

    /**
     * Recursively archives the document and its children.
     */
    const recursiveArchive = async (documentId: Id<'documents'>) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", q => q.eq("userId", userId).eq("parentDocument", documentId))
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    recursiveArchive(args.id);

    return document;

  }
});