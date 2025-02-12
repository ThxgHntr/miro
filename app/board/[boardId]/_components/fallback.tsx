import { Loader2 } from "lucide-react"
import { InfoSkeleton } from "./info"
import { ParticipantsSkeleton } from "./participants"
import { ToolbarSkeleton } from "./toolbar"

export const Fallback = () => {
    return (
        <main className="relative flex items-center justify-center h-full w-full bg-neutral-100 touch-none">
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
            <InfoSkeleton />
            <ParticipantsSkeleton />
            <ToolbarSkeleton />
        </main>
    )
}
