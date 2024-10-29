'use client'

import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import { toast } from "sonner"

interface NewBoardButtonProps {
    orgId: string
    disabled?: boolean
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
    const { mutate, pending } = useApiMutation(api.board.create)

    const onClick = () => {
        mutate({ orgId, title: "無題のボード" })
            .then(() => {
                toast.success("作成されたボード")
            })
            .catch(() => {
                toast.error("ボードの作成に失敗しました")
            })
    }

    return (
        <button
            disabled={disabled}
            onClick={() => { onClick() }}
            className={cn("col-span-1 aspect-auto rounded-lg bg-blue-500 hover:bg-blue-700 flex flex-col items-center justify-center py-6", pending || disabled && "opacity-75 hover:bg-blue-600 cursor-not-allowed")}>
            <div />
            <Plus className="h-12 w-12 text-white stroke-2" />
            <p className="text-white font-semibold">ボードを作成</p>
        </button>
    )
}