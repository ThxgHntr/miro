export const runtime = "nodejs";

import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

// Kiểm tra và lấy các biến môi trường
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const liveblocksSecretKey = process.env.LIVEBLOCKS_SECRET_KEY;

if (!convexUrl || !liveblocksSecretKey) {
  throw new Error(
    "Missing Convex URL or Liveblocks Secret Key in environment variables"
  );
}

const convex = new ConvexHttpClient(convexUrl);
const liveblocks = new Liveblocks({ secret: liveblocksSecretKey });

export async function POST(request: Request) {
  try {
    const authorization = await auth();
    const user = await currentUser();

    if (!authorization || !user) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();
    const board = await convex.query(api.board.get, { boardId: room });

    if (board?.orgId !== authorization.orgId) {
      return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
      name: user.firstName || "Anonymous",
      picture: user.imageUrl,
    };

    const session = liveblocks.prepareSession(user.id, { userInfo });

    if (room) {
      session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new Response(body, { status });
  } catch (error) {
    console.error("Error in POST /liveblocks-auth:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
