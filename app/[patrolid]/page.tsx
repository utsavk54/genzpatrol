"use client";

import { useEffect, useState } from "react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
  ParticipantTile,
} from "@livekit/components-react";
import { Track } from "livekit-client";

export default function AudioRoom({
  room,
  username,
}: {
  room: string;
  username: string;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function getToken() {
      const res = await fetch(`/api/livekit?room=${room}&username=${username}`);
      const data = await res.json();
      setToken(data.token);
      console.log(token)
    }
    getToken();
  }, [room, username]);

  if (!token) {
    return <p>Loading...</p>;
  }

  return (
    <LiveKitRoom
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect={true}
      audio={true}
      video={false} // audio-only room
      data-lk-theme="default"
      style={{ height: "100vh" }}
    >
      {/* Renders remote participants */}

      {/* Handles remote audio playback */}
      <RoomAudioRenderer />

      {/* Mic toggle button, etc. */}
      <ControlBar />
    </LiveKitRoom>
  );
}