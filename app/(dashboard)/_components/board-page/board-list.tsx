'use client';

import { useQuery } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Board } from "./board-card/board";
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from '@/hooks/use-api-mutation';
import { BoardCard } from './board-card';
import { NewBoardButton } from './new-board-button';

interface BoardListProps {
    orgId: string
}

export const BoardList = ({ orgId }: BoardListProps) => {
    const searchParams = useSearchParams()

    const search = searchParams.get('search') || ""
    const favorite = searchParams.get('favorites') === 'true'
    const data = useQuery(api.boards.get, { orgId, search, favorite });

    const { organization } = useOrganization()
    const { mutate, pending } = useApiMutation(api.board.create)

    const onClick = () => {
        if (!organization) return
        mutate({
            orgId: organization.id,
            title: "無題のボード",
        })
            .then(() => {
                toast.success("作成されたボード")
            })
            .catch(() => {
                toast.error("ボードの作成に失敗しました")
            })
    }

    if (data === undefined) {
        return (
            <div className="flex-1 h-[calc(100vh-60px)] p-6">
                <h2 className='text-3xl'>
                    {searchParams.get('favorites') ? "好きなボード" : "チームボード"}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6 pb-10'>
                    <NewBoardButton orgId={orgId} disabled />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>
        )
    }

    if (!data?.length && searchParams.get('search')) {
        return (
            <div className="flex-1 h-[calc(100vh-60px)] p-6">
                <Board
                    imgUrl="/result.svg"
                    title="結果は見つかりません！"
                    description="何か他のものを探してみてください" />
            </div>
        )
    }

    if (!data?.length && searchParams.get('favorites')) {
        return (
            <div className="flex-1 h-[calc(100vh-60px)] p-6">
                <Board
                    imgUrl="/favorite.svg"
                    title="お気に入りのボードはありません！"
                    description="ボードを支持してみてください" />
            </div>
        )
    }

    if (!data?.length) {
        return (
            <div className="flex-1 h-[calc(100vh-60px)] p-6">
                <Board
                    imgUrl="/note.svg"
                    title="最初のボードを作成します"
                    description="組織用のボードを作成することから始めます">
                    <Button disabled={pending} onClick={onClick} className="m-4 size-fit">
                        ボードを作成
                    </Button>
                </Board>
            </div>
        )
    }

    return (
        <div className="flex-1 h-[calc(100vh-60px)] p-6">
            <h2 className='text-3xl'>
                {searchParams.get('favorites') ? "好きなボード" : "チームボード"}
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6 pb-10'>
                <NewBoardButton orgId={orgId} />

                {data?.map((board) => (
                    <BoardCard
                        key={board._id}
                        boardId={board._id}
                        title={board.title}
                        imageUrl={board.imgUrl}
                        authorId={board.authorId}
                        authorName={board.authorName}
                        orgId={board.orgId}
                        createdAt={board._creationTime} />
                ))}
            </div>
        </div>
    )
}