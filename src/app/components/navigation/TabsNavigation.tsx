import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Image from "next/image"
import React from 'react'
import Button from "../buttons/Button"
import Customize from "./Customize"

type Props = {}

const TabsNavigation = (props: Props) => {
    return (
        <Tabs defaultValue="account" className="w-full bg-lightGrey">
            <TabsList className="grid w-full grid-cols-4 bg-white">
                <TabsTrigger value="" className="pointer-events-none"><Image width={16} height={16} alt='link icon' src={"/images/logo-devlinks-small.svg"} /></TabsTrigger>
                <TabsTrigger value="customize"><Image width={16} height={16} alt='link icon' src={"/images/icon-link.svg"} /></TabsTrigger>
                <TabsTrigger value="password"><Image width={16} height={16} alt='link icon' src={"/images/icon-profile-details-header.svg"} /></TabsTrigger>
                <TabsTrigger value="preview"><Image width={16} height={16} alt='link icon' src={"/images/icon-preview-header.svg"} /></TabsTrigger>
            </TabsList>
            <TabsContent value="customize" >
                <Customize />
            </TabsContent>
            <TabsContent value="password">
                password
            </TabsContent>
            <TabsContent value="preview">
                preview
            </TabsContent>
        </Tabs>
    )
}

export default TabsNavigation