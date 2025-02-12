import { OrganizationSwitcher } from "@clerk/nextjs"

interface orgSwitcherProps {
    maxWidth?: string
}

export const OrgSwitcher = (props: orgSwitcherProps) => {
    return (
        <OrganizationSwitcher
            hidePersonal
            appearance={{
                elements: {
                    rootBox: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: props.maxWidth ?? "100%",
                    },
                    organizationSwitcherTrigger: {
                        padding: "6px",
                        width: "100%",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                        justifyContent: "space-between",
                    },
                }
            }}
        />
    )
}