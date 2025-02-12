'use client'

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import qs from 'query-string'

export const SearchInput = () => {
    const router = useRouter()
    const [value, setValue] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const url = qs.stringifyUrl({
                url: '/',
                query: {
                    search: value,
                },
            }, { skipEmptyString: true, skipNull: true });
            router.push(url)
        }, 500)
        return () => clearTimeout(timer)
    }, [value, router])

    return (
        <div className="w-full relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
                className="w-full max-w-lg pl-10"
                placeholder="検索。。。"
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}