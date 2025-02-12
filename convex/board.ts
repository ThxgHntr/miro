import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

const images = [
    "/placeholders/1.svg",
    "/placeholders/2.svg",
    "/placeholders/3.svg",
    "/placeholders/4.svg",
    "/placeholders/5.svg",
    "/placeholders/6.svg",
    "/placeholders/7.svg",
    "/placeholders/8.svg",
    "/placeholders/9.svg",
    "/placeholders/10.svg",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("不正");
        }

        const randomImg = images[Math.floor(Math.random() * images.length)];

        console.log(randomImg);

        const board = await ctx.db.insert("boards", {
            authorId: identity.subject,
            authorName: identity.name!,
            imgUrl: randomImg,
            orgId: args.orgId,
            title: args.title,
        });

        return board;
    },
})

export const update = mutation({
    args: {
        boardId: v.id("boards"),
        title: v.string(),
    },

    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("不正");
        }

        const title = args.title.trim();
        if (!title) {
            throw new Error("タイトルが必要です");
        }

        if (title.length > 60) {
            throw new Error("タイトルは60文学以下にしてください");
        }

        const board = await ctx.db.patch(args.boardId, {
            title: args.title,
        });

        return board;
    },
})

export const remove = mutation({
    args: {
        boardId: v.id("boards"),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("不正");
        }

        await ctx.db.delete(args.boardId);

        const favorites = await ctx.db
            .query("userFavorites")
            .withIndex("by_board", (q) => q.eq("boardId", args.boardId))
            .collect();

        for (const favorite of favorites) {
            await ctx.db.delete(favorite._id);
        }
    },
})

export const getFavorites = query({
    args: {
        boardId: v.id("boards"),
        orgId: v.string(),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("不正");
        }

        const favorites = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board_org",
                (q) => q
                    .eq("userId", identity.subject)
                    .eq("boardId", args.boardId)
                    .eq("orgId", args.orgId)
            )
            .collect();

        return favorites;
    }
})

export const favorite = mutation({
    args: {
        boardId: v.id("boards"),
        orgId: v.string(),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("不正");
        }

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_board_org",
                (q) => q
                    .eq("userId", identity.subject)
                    .eq("boardId", args.boardId)
                    .eq("orgId", args.orgId)
            )
            .unique();

        if (existingFavorite) {
            return await ctx.db.delete(existingFavorite._id);
        } else {
            return await ctx.db.insert("userFavorites", {
                boardId: args.boardId,
                orgId: args.orgId,
                userId: identity.subject
            })
        }
    }
})

export const get = query({
    args: {
        boardId: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const board = await ctx.db.get(args.boardId);

        return board;
    }
})

