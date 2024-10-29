'use client'

import { Plus } from 'lucide-react'
import { CreateOrganization } from '@clerk/nextjs'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Hint } from '@/components/hint'

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square relative">
                    <Hint
                        label='組織を作成'
                        side="right"
                        align='center'
                        sideOffset={10}>
                        <button className='flex items-center justify-center h-[36px] w-[36px] bg-white/25 rounded-md opacity-60 hover:opacity-100 transition'>
                            <Plus className='text-white' />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogTitle />
            <DialogContent className='p-0 max-w-fit max-h-fit'>
                <CreateOrganization routing='hash' />
            </DialogContent>
        </Dialog>
    )
}