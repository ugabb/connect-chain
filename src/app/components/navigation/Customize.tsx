// Customize.tsx
import React, { useEffect, useState } from 'react';
import Button from '../buttons/Button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import LinkCreation from '../LinkCreation';
import { useForm, SubmitHandler, useFieldArray, FieldValues } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useGetAllLinksByUser } from '@/hooks/useGetUserLink';
import { AiOutlineCheck, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSaveAllLinksByUser } from '@/hooks/useSaveAllLinks';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ILinks } from '@/interfaces/ILink';
import platforms from "../../data/selectData.json"
import { Form, FormField } from '@/components/ui/form';

type Props = {};

export type FormData = {
    links: ILinks[];
};

const Customize = (props: Props) => {
    const [links, setLinks] = useState<ILinks[]>([]);

    const { register, handleSubmit, control, setValue, watch } = useForm({
        defaultValues: {
            links: links
        }
    });


    const { fields, append, remove } = useFieldArray({
        control,
        name: 'links',
    });

    const handleAddLink = () => {
        if (session?.user.id) {
            append({
                platform: '', url: '', userId: session.user.id, color: "", iconName: ""
            });
        }
    };

    const handleRemoveLink = (id: string) => {
        remove(fields.findIndex((link) => link.id == id));
    };


    const { data: session } = useSession()
    const username = session?.user.username

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        // Created an array to store updated links.
        const updatedLinks: ILinks[] = [];

        data.links.forEach((link) => {
            // For each link, find the respective platform data from the platforms array.
            const platformData = platforms.find((plat) => plat.name === link.platform);
            // Verify if it was found.
            if (platformData) {
                // Update the link to include color and iconName.
                const updatedLink = {
                    ...link,
                    color: platformData.color,
                    iconName: platformData.icon.slice(0, platformData.icon.indexOf(".svg")), // Cutting out the ".svg" part.
                };
                updatedLinks.push(updatedLink);
            }
        });

        setLinks(updatedLinks);
        if (username) {
            handleSaveAllLinks(updatedLinks, username)
        }
    };

    const { getAllLinksByUser, linksLoading } = useGetAllLinksByUser();
    const handleGetAllLinksByUser = async () => {
        if (username) {
            const data = await getAllLinksByUser(username)
            setLinks(data);
            // Set the default values for the 'links' field after fetching data
            setValue('links', data)
        }
    };

    const { saveAllLinks, saveLoading } = useSaveAllLinksByUser()

    const handleSaveAllLinks = async (links: ILinks[], username: string) => {
        if (links.length) {
            const linksSaved = await saveAllLinks(links, username);
            setLinks(linksSaved)
            setValue('links', linksSaved)
        }
    }


    useEffect(() => {
        handleGetAllLinksByUser()
    }, [])
    // useEffect(() => {
    //     console.log({ links }, { fields })
    // }, [links, fields])

    return (
        <div className="flex flex-col gap-10 p-5 m-3 rounded-xl bg-white">
            <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold">Customize your links</h3>
                <p className="text-sm text-grey">Add/edit/remove links below and then share all your profiles with the world!</p>
            </div>
            <Button variant="outline" name="+ Add new link" onClick={handleAddLink} />

            <Form {...useForm({ register, handleSubmit, control, setValue, watch })}>

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

                        {/* Dialo to wating to save links */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button name="Save" variant="default" type="submit" disabled={fields?.length <= 0} />
                            </DialogTrigger>
                            <DialogContent className='flex flex-col justify-center items-center'>
                                <DialogHeader>
                                    <DialogTitle className=' text-purple text-2xl'>Save Links</DialogTitle>
                                </DialogHeader>
                                {saveLoading ?
                                    <DialogDescription className='flex gap-3 items-center'>
                                        <h2 className='text-xl text-purple'>Saving Links</h2>
                                        <AiOutlineLoading3Quarters className='text-3xl animate-spin  text-purple' />
                                    </DialogDescription>
                                    :
                                    <DialogDescription className='flex gap-3 items-center'>
                                        <h2 className='text-xl text-purple'>Saved</h2>
                                        <AiOutlineCheck className='text-3xl  text-purple' />
                                    </DialogDescription>
                                }
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* <select name="test" id="test" {...register("links[0].platform")}>
                    <option value="3">3</option>
                </select> */}
                </form>

            </Form>



        </div>
    );
};

export default Customize;
