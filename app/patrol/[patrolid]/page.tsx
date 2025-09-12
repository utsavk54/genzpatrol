"use client"

import { usePatrolStore } from "@/lib/usePatrolStore"

export default function PatrolPage(){

const { patrolId, setPatrolId } = usePatrolStore();

return(
    <p>Current room is {patrolId}</p>
)
}