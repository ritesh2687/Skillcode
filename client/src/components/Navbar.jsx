import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";


import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";

import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logoutUser();
    };
    console.log(user)
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "User logged out");
            navigate("/login");
        }
    }, [isSuccess,])
    return (
        <div className="h-16 dark:bg[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0  left-0 right-0 duration-300  z-10 ">
            {/* desktop */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className="flex items-center gap-2">
                    <School size={"25"} />

                    <h1 className=" md:block font-extrabold text-2xl"> SkillCode</h1>
                </div>
                {/* USERicon and darkmode icon */}
                <div className="flex items-center gap-8">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem> <Link to="my-skill">My Skill</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link to="profile">Edit Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                                </DropdownMenuGroup>

                                {
                                   user.role === "instructor" && (
                                    <>
                                       <DropdownMenuSeparator/>
                                       <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                    </>

                                   )
                                }

                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div>
                            <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                            <Button onClick={() => navigate("/login")}>Signup</Button>
                        </div>
                    )}

                    {/* dark and white MODE */}
                    <DarkMode />
                </div>
            </div>

            {/* ..Mobile */}
            <div className=" flex md:hidden items-center justify-between px-4 h-full">
                <h1 className=" font-extrabold text-2xl"> SkillCode</h1>
                <MobileNavbar />
            </div>
        </div>
    );
};

export default Navbar;




const MobileNavbar = () => {
    const role = "instructor"
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" className="rounded-full bg-gray-200 hover:bg-gray-200" variant="outline"><Menu /></Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mx-3 my-6 ">
                    <SheetTitle > SkillCode</SheetTitle>
                    <DarkMode />
                </SheetHeader>

                <Separator className="mr-2" />
                <nav className="flex flex-col px-8 space-y-4">
                    <span>My Skill</span>
                    <span>Edit Profiel</span>
                    <span>Log out</span>
                </nav>
                {
                    role === "instructor" && (

                        <SheetFooter className="py-10">
                            <SheetClose asChild>
                                <Button type="submit">Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )}
            </SheetContent>
        </Sheet>
    )
}