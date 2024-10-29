import { Room } from "@/components/room"
import { Canvas } from "./_components/canvas"
import { Id } from "@/convex/_generated/dataModel"
import { Fallback } from "./_components/fallback"

interface BoardIdPageProps {
    params: Promise<{
        boardId: Id<"boards">
    }>
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    const pr = await params

    return (
        <Room boardId={pr.boardId} fallback={<Fallback />}>
            <Canvas boardId={pr.boardId} />
        </Room>
    )
}

export default BoardIdPage