"use client";
import { usePathname } from "next/navigation";

usePathname;

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();

    return <div>{pathName !== "/login" && children}</div>;
};

export default ShowComponent;
