import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import React from 'react'

type Props = {}

const TabsNavigation = (props: Props) => {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                WORKS
            </TabsContent>
            <TabsContent value="password">
                password
            </TabsContent>
        </Tabs>
    )
}

export default TabsNavigation