import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { OrgSwitcher } from "./org-switcher";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"]
});

export const OrgSidebar = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get('favorites');

    return (

        <div className='hidden lg:flex flex-col space-y-6 w-[200px] pl-3 pt-3'>
            <Link href="/">
                <div className="flex items-center justify-between p-2">
                    <Image src="/logo.svg"
                        alt="Logo"
                        width={55}
                        height={55}
                    />
                    <span className={cn("font-semibold text-4xl", font.className)}>
                        ボード
                    </span>
                </div>
            </Link>
            <OrgSwitcher />
            <div className="space-y-1 w-full">
                <Button
                    variant={favorites ? "ghost" : "secondary"}
                    asChild
                    size="lg"
                    className="justify-start w-full px-2 font normal">
                    <Link href="/">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        チームボード
                    </Link>
                </Button>
                <Button
                    variant={favorites ? "secondary" : "ghost"}
                    asChild
                    size="lg"
                    className="justify-start w-full px-2 font normal">
                    <Link href={{
                        pathname: '/',
                        query: { favorites: true }
                    }}>
                        <Star className="mr-2 h-4 w-4" />
                        好きなボード
                    </Link>
                </Button>
            </div>
        </div>
    )
}