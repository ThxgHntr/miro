import { Hint } from "@/components/hint"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserAvatarProps {
    name?: string
    imageUrl?: string
    fallback?: string
    isCurrentUser?: boolean | false
}

export const UserAvatar = (props: UserAvatarProps) => {
    return (
        <Hint label={props.name || "匿名"} side="bottom" sideOffset={20}>
            <Avatar className={cn(props.isCurrentUser ? 'border-blue-500' : '', "h-8 w-8 border-2")}>
                <AvatarImage src={props.imageUrl}></AvatarImage>
                <AvatarFallback className="text-xs font-semibold">{props.fallback}</AvatarFallback>
            </Avatar>
        </Hint >
    )
}