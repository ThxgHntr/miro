import { List } from "./list"
import { NewButton } from "./new-button"

export const Sidebar = () => {
    return (
        <aside className="fixed z-[1] h-full left-0 bg-blue-950 w-[60px] flex p-3 flex-col gap-y-4 text-white">
            <List />
            <NewButton />
        </aside>
    )
}