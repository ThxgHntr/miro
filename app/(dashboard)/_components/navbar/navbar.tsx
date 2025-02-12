'use client';

import { UserButton, useOrganization } from "@clerk/clerk-react";
import { SearchInput } from "./search-input";
import { OrgSwitcher } from "../org-sidebar/org-switcher";
import { InviteButton } from "./invite-button";

export const Navbar = () => {
    const { organization } = useOrganization();

    return (
        <div className="flex items-center justify-between gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <div className="block lg:hidden flex-1 max-w-md">
                <OrgSwitcher maxWidth="max-w-lg" />
            </div>
            {organization && <InviteButton />}
            <UserButton />
        </div>
    )
}