import { ILinks } from "@/app/components/navigation/Customize";
import { useState } from "react";

function useGetAllLinksByUser() {
  const [linksLoading, setLinksLoading] = useState<boolean>(false);

  const getAllLinksByUser = async (username: string) => {
    setLinksLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API + `/api/links/${username}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      setLinksLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setLinksLoading(false);
      console.error("Failed to fetch data");
    }
  };

  return { getAllLinksByUser, linksLoading };
}

export { useGetAllLinksByUser };
