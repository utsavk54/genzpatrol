import RoomEntryForm from "@/components/RoomEntry";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

export default function Home(){
  return(
    <div className="flex flex-col justify-center items-center w-full h-dvh bg-muted">
      <RoomEntryForm/>
    </div>
  )
}