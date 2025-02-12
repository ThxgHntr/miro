import { Plus } from 'lucide-react'
import { OrganizationProfile } from '@clerk/nextjs'

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="justify-center">
                    <Plus className='h-4 w-4 mr-2' />
                    メンバーを招待
                </Button>
            </DialogTrigger>
            <DialogTitle />
            <DialogContent className="p-0 bg-transparent border-none max-w-fit">
                <OrganizationProfile routing="hash" />
            </DialogContent>
        </Dialog>
    )
}