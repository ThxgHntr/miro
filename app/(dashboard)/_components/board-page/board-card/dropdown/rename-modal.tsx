'use client'

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/dialog"
import { Input } from "../../../../../../components/ui/input"
import { Button } from "../../../../../../components/ui/button"
import { toast } from "sonner"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { useState } from "react"

interface RenameModalProps {
    children: React.ReactNode
    boardId: string
    title: string
    description: string
    name: string
}

export const RenameModal = (props: RenameModalProps) => {
    const { mutate, pending } = useApiMutation(api.board.update);
    const [newName, setNewName] = useState(props.name);
    const [open, setOpen] = useState(false);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newName === props.name) {
            toast.info("ボード名は変更されませんでした");
            return;
        }

        if (newName.length > 60) {
            toast.error("ボード名は60文字以下にしてください");
            return;
        }

        if (newName === "") {
            toast.error("ボード名を入力してください");
            return;
        }

        mutate({ boardId: props.boardId, title: newName })
            .then(() => {
                toast.success("ボード名を変更しました");
                setOpen(false);
            })
            .catch(() => {
                toast.error("ボード名の変更に失敗しました");
            });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {props.children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <Input
                        name="name"
                        maxLength={60}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)} // Set newName on change
                        placeholder="ボードタイトル"
                        required
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>キャンセル</Button>
                        </DialogClose>
                        <Button type="submit" variant="default" disabled={pending} onClick={(e) => e.stopPropagation()}>
                            保存
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};