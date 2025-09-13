"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { usePatrolStore } from "@/lib/usePatrolStore"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "./ui/button"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"

export default function RoomEntryForm() {

    const [value, setValue] = React.useState("")
    const { patrolId, setPatrolId } = usePatrolStore();
    const router = useRouter();

    const checkIfGastiExists = async () => {

        const { data, error } = await supabase
            .from("Gasti")
            .select("*").eq("id", value).single()

        if(data){
            const patrolId = data.id;
            setPatrolId(patrolId);
            router.push(`/patrol/${patrolId}`);
        }
        else{
            toast("Supplied Patrol ID doesn't match any active patrol.");
            setValue("");
        }
            
    };

    const redirectToPatrolPage = function () {
        checkIfGastiExists()
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">GenZPatrol</h1>
            <p className="text-muted-foreground text-sm text-balance">
                Enter your Patrol ID below to join.
            </p>
            <div className="space-y-2">
                <InputOTP
                    maxLength={9}
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <InputOTPGroup className="h-20">
                        <InputOTPSlot className="h-4/5 w-14" index={0} />
                        <InputOTPSlot className="h-4/5 w-14" index={1} />
                        <InputOTPSlot className="h-4/5 w-14" index={2} />
                        <InputOTPSlot className="h-4/5 w-14" index={3} />
                        <InputOTPSlot className="h-4/5 w-14" index={4} />
                        <InputOTPSlot className="h-4/5 w-14" index={5} />
                        <InputOTPSlot className="h-4/5 w-14" index={6} />
                        <InputOTPSlot className="h-4/5 w-14" index={7} />
                        <InputOTPSlot className="h-4/5 w-14" index={8} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <Button onClick={redirectToPatrolPage}>Join</Button>
        </div>

    )
}
