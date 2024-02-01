// Customize.tsx
import React, { useEffect, useState } from 'react';
import Button from '../buttons/Button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import LinkCreation from '../LinkCreation';
import { useForm, SubmitHandler, useFieldArray, FieldValues } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useGetAllLinksByUser } from '@/hooks/useGetUserLink';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type Props = {};

export interface ILinks {
    id?: number;
    platform: string;
    url: string;
    userId?: string;
}

export type FormData = {
    links: ILinks[];
};

const Customize = (props: Props) => {
    const [links, setLinks] = useState<ILinks[]>([]);

    const [editIndex, setEditIndex] = useState<number | null>(null); // Keep track of the index being edited

    const { register, handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            links: links
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data.links);
        setLinks(data.links);
        saveLinks(data.links)
        setEditIndex(null); // Reset edit mode
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'links',
    });

    const handleAddLink = () => {
        if (session?.user.id) {
            append({ platform: '', url: '', userId: session.user.id });
        }
    };

    const handleRemoveLink = (id: string) => {
        remove(fields.findIndex((link) => link.id == id));
    };


    const { data: session } = useSession()
    const username = session?.user.username
    // api

    const { getAllLinksByUser, linksLoading } = useGetAllLinksByUser();
    const handleGetAllLinksByUser = async () => {
        if (username) {
            const data = await getAllLinksByUser(username)
            setLinks(data);
            // Set the default values for the 'links' field after fetching data
            setValue('links', data)

            // try {
            //     const { data, linksLoading } = await useGetAllLinksByUser(username);
            //     setLinks(data);
            //     // Set the default values for the 'links' field after fetching data
            //     setValue('links', data)
            // } catch (error) {
            //     console.error(error);
            // }
        }
    };

    async function saveLinks(links: ILinks[]) {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API + `/api/links/save-all/user/${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(links),
            });

            if (!response.ok) {
                // Check for any HTTP status codes outside the 2xx range
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);

            // You can return responseData or perform additional actions here
            return responseData;
        } catch (error) {
            console.error("Error while saving links:", error);
            // You can throw the error again if you want to propagate it to the caller
            // throw error;
        }
    }



    useEffect(() => {
        handleGetAllLinksByUser()
    }, [])
    useEffect(() => {
        console.log(links, fields)
    }, [links, fields])

    return (
        <div className="flex flex-col gap-10 p-5 m-3 rounded-xl bg-white">
            <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold">Customize your links</h3>
                <p className="text-sm text-grey">Add/edit/remove links below and then share all your profiles with the world!</p>
            </div>
            <Button variant="outline" name="+ Add new link" onClick={handleAddLink} />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
                {!linksLoading && fields?.map((link, index) => (
                    <LinkCreation
                        key={link.id}
                        register={register}
                        registerNameInput={`links[${index}].url`}
                        registerNameSelect={`links[${index}].platform`}
                        removeLink={() => handleRemoveLink(link.id)}
                        length={index + 1}
                        control={control}
                        defaultInputvalue={link.url}
                        defaultSelectvalue={link.platform}
                    />
                ))}
                {linksLoading &&
                    <div className='flex flex-col justify-center items-center text-purple gap-3 m-20'>
                        <AiOutlineLoading3Quarters className='text-4xl animate-spin' />
                        <p className='text-sm'>checking for links...</p>
                    </div>
                }

                <div className="flex flex-col gap-3">
                    <Separator />
                    <Button name="Save" variant="default" type="submit" disabled={fields?.length <= 0} />
                </div>

                {/* <select name="test" id="test" {...register("links[0].platform")}>
                    <option value="3">3</option>
                </select> */}
            </form>
        </div>
    );
};

export default Customize;
