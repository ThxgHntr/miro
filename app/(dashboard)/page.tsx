'use client'

import { CreateOrganization, useOrganization } from "@clerk/clerk-react"
import { Board } from "./_components/board-page/board-card/board"
import { BoardList } from "./_components/board-page/board-list"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"

const DashboardPage = () => {
    const { organization } = useOrganization()

    return (
        <div className="flex-1 h-[calc(100vh-60px)] p-6">
            {!organization ? (
                <Board
                    imgUrl="/pro.svg"
                    title="ボードへようこそ"
                    description="開始する組織を作成します">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="m-4 size-fit">
                                組織を作成
                            </Button>
                        </DialogTrigger>
                        <DialogTitle />
                        <DialogContent className="p-0 bg-transparent border-none max-w-fit">
                            <CreateOrganization routing="hash" />
                        </DialogContent>
                    </Dialog>
                </Board>
            ) : (
                <BoardList orgId={organization?.id || ''} />
            )}
        </div>
    )
}

export default DashboardPage