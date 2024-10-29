'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { useOthers, useSelf } from "@liveblocks/react"
import { UserAvatar } from "./user-avatar"

const MAX_SHOWN_USERS = 3

export const Participants = () => {
    const users = useOthers()
    const currentUser = useSelf()
    const hasMoreUsers = users.length > MAX_SHOWN_USERS

    if (users.length === 0) {

    }

    return (
        <div className="absolute flex items-center p-1.5 h-12 top-2 right-2 bg-white rounded-md shadow-md">
            <div className="flex gap-x-2">
                {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
                    <UserAvatar
                        key={connectionId}
                        name={info?.name}
                        imageUrl={info?.picture}
                        fallback={info?.name} />
                ))}

                {currentUser && (
                    <UserAvatar
                        name={currentUser.info?.name}
                        imageUrl={currentUser.info?.picture}
                        fallback={currentUser.info?.name?.[0]}
                        isCurrentUser={true} />
                )}

                {hasMoreUsers && (
                    <UserAvatar
                        name={`${users.length - MAX_SHOWN_USERS} もっと`}
                        imageUrl=""
                        fallback={`+ ${users.length - MAX_SHOWN_USERS}`} />
                )}
            </div>
        </div>
    )
}

export const ParticipantsSkeleton = () => {
    return (
        <div className="absolute flex items-center w-[100px] p-1.5 h-12 top-2 right-2 bg-white rounded-md shadow-md">
            <Skeleton className="h-full w-full bg-white" />
        </div>
    )
}