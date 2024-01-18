"use client"
import React, { useEffect, useState } from 'react'
import Button from '../buttons/Button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import LinkCreation from '../LinkCreation'

type Props = {}

interface ILinks {
    id: number
    platform: string;
    link: string;
}

const Customize = (props: Props) => {
    const [links, setLinks] = useState<ILinks[]>([])

    const handleAddLink = (link: ILinks) => {
        setLinks(prev => [...prev, link])
    }
    const handleRemoveLink = (id: number) => {
        setLinks(prev => prev.filter(platform => platform.id !== id))
    }

    useEffect(() => {
        console.log(links)
    }, [links])
    return (
        <div className="flex flex-col gap-10 p-5 m-3 rounded-xl bg-white">
            <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold">Customize your links</h3>
                <p className="text-sm text-grey">Add/edit/remove links below and then share all your profiles with the world!</p>
            </div>
            <Button variant="outline" name="+ Add new link" onClick={() => handleAddLink({ id: links.length + 1, link: '', platform: '' })} />

            {links.length > 0 ?
                <div className="flex flex-col gap-8">
                    {links.map((link, i) => (
                        <LinkCreation length={i + 1} removeLink={() => handleRemoveLink(link.id)} />
                    ))}
                </div>
                :
                <div className='flex flex-col justify-center items-center gap-5 p-5 bg-lightGrey rounded-xl'>
                    <Image src={'/images/illustration-empty.svg'} width={124} height={80} alt={''} />
                    <h3 className='text-2xl font-bold text-center text-nowrap'>Let's get you started</h3>
                    <p className='text-base text-grey text-center leading-tight'>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
                </div>
            }




            <div className="flex flex-col gap-3">
                <Separator />
                <Button name='Save' variant='default' disabled={links.length > 0 ? false : true} />
            </div>
        </div>
    )
}

export default Customize