import { ILinks } from "@/app/components/navigation/Customize";
import { useState } from "react";

function useSaveAllLinksByUser() {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const saveAllLinks = async (links: ILinks[], username: string) => {
    setSaveLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API + `/api/links/save-all/user/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(links),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      setSaveLoading(false);
      return data;
    } catch (error) {
      console.error(error);
      setSaveLoading(false);
      console.error("Failed to fetch data");
    }
  };

  return { saveAllLinks, saveLoading };
}

export { useSaveAllLinksByUser };
