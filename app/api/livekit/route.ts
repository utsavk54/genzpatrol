import { NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const room = searchParams.get("room");
  const username = searchParams.get("username");

  if (!room || !username) {
    return NextResponse.json({ error: "Missing room or username" }, { status: 400 });
  }

  // LiveKit credentials (from your LiveKit Cloud project settings)
  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;

  try {
    const at = new AccessToken(apiKey, apiSecret, {
      identity: username,
    });
    at.addGrant({ roomJoin: true, room });

    const token = await at.toJwt();

    return NextResponse.json({ token });
  } catch (err: unknown) {
    console.error("Error creating token:", err);
    return NextResponse.json({ error: "Failed to create token" }, { status: 500 });
  }
}
