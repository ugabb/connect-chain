
"use client"
import { useSession } from "next-auth/react";
import TabsNavigation from "./components/navigation/TabsNavigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  // useEffect(() => {
  //   if (!session?.access_token) {
  //     router.push("/auth/login")
  //   }
  // }, [session?.access_token])
  return (
    <main className="bg-lightGrey">
      <TabsNavigation />
    </main>
  )
}