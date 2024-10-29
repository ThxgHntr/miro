import { v } from "convex/values";

import { query } from "./_generated/server";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorite: v.optional(v.boolean()),
    },

    handler: async (ctx, args) => {
        const indentity = await ctx.auth.getUserIdentity();

        const title = args.search

        if (!indentity) {
            throw new Error("不正");
        }

        if (args.favorite) {
            const favorites = await ctx.db
                .query("userFavorites")
                .withIndex("by_user_org",
                    (q) => q
                        .eq("userId", indentity.subject)
                        .eq("orgId", args.orgId)
                )
                .order("desc")
                .collect();

            const boards = await ctx.db
                .query("boards")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect()

            return boards.filter((board) => favorites.some((favorite) => favorite.boardId === board._id))
        }

        if (title) {
            return await ctx.db
                .query("boards")
                .withSearchIndex("search_title",
                    (q) => q
                        .search("title", title)
                        .eq("orgId", args.orgId))
                .collect();
        }

        return await ctx.db
            .query("boards")
            .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect()
    }
})