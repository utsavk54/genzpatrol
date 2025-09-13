"use client";


import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePatrolStore } from "@/lib/usePatrolStore";
import { useUserStore } from "@/lib/userStore";

interface TokenResponse {
  token: string;
}

export default function NameForm() {
  const { patrolId, setPatrolId } = usePatrolStore();

  const [liveKitToken, setLiveKitToken] = useState("");
  const [loading, setLoading] = useState(true);

  const firstName = useUserStore((state) => state.firstName);
  const lastName = useUserStore((state) => state.lastName);
  const setFirstName = useUserStore((state) => state.setFirstName);
  const setLastName = useUserStore((state) => state.setLastName);

  const fetchToken = async () => {
      try {
        const res = await fetch(`/api/livekit?room=${patrolId}&username=${firstName+' '+lastName}`);
        if (!res.ok) throw new Error("Failed to fetch token");

        const data: TokenResponse = await res.json();
        setLiveKitToken(data.token);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetchToken();
  }

  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Almost there!</CardTitle>
          <CardDescription>
            Enter your full name to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="Utsav"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Khadka"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}