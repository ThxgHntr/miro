'use client'

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Link2, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { ConfirmModal } from "../../../confirm-modal"
import { Button } from "@/components/ui/button"
import { RenameModal } from "@/app/(dashboard)/_components/board-page/board-card/dropdown/rename-modal"
import { useState } from "react"

interface ActionsProps {
    children: React.ReactNode
    side?: DropdownMenuContentProps['side']
    sideOffset?: DropdownMenuContentProps['sideOffset']
    boardId: string
    title: string
}

export const Actions = (props: ActionsProps) => {
    const { mutate, pending } = useApiMutation(api.board.remove)
    const [open, setOpen] = useState(false);

    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/boards/${props.boardId}`)
            .then(() => {
                toast.success("リンクをコピーしました")
                setOpen(false)
            })
            .catch(() => toast.error("リンクのコピーに失敗しました"))
    }

    const onRemove = () => {
        mutate({ boardId: props.boardId })
            .then(() => {
                toast.success("ボードを削除しました");
                setOpen(false);
            })
            .catch(() => toast.error("ボードの削除に失敗しました"))
    }

    return (
        <div className="z-10">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    {props.children}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    onClick={(e) => e.stopPropagation()}
                    side={props.side}
                    sideOffset={props.sideOffset}
                    className="w-fit">
                    <DropdownMenuItem
                        className="p-3 cursor-pointer"
                        onClick={onCopyLink}>
                        <Link2 className="mr-2 h-4 w-4" />
                        リンクをコピー
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <RenameModal
                        title="ボードタイトルを編集"
                        description="このボードの新しいタイトルを入力してください"
                        boardId={props.boardId}
                        name={props.title}>
                        <Button
                            variant="ghost"
                            className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                            <Pencil className="mr-2 h-4 w-4" />
                            ボードタイトルを編集
                        </Button>
                    </RenameModal>
                    <DropdownMenuSeparator />
                    <ConfirmModal
                        title="ボードを削除しますか？"
                        description="ボードを削除すると元に戻すことはできません"
                        disabled={pending}
                        onConfirm={onRemove}>
                        <Button
                            variant="ghost"
                            className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                            <Trash2 className="mr-2 h-4 w-4" />
                            消去
                        </Button>
                    </ConfirmModal>
                </DropdownMenuContent>
            </DropdownMenu>
        </ div>
    )
}