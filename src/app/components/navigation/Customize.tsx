"use client"
import React, { useState } from 'react'
import Button from '../buttons/Button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import LinkCreation from '../LinkCreation'

type Props = {}

const Customize = (props: Props) => {
    const [links, setLinks] = useState([{ platform: "GitHub", link: "http://github.com/ugabb" }, { platform: "GitHub", link: "http://github.com/ugabb" }])
    return (
        <div className="flex flex-col gap-10 p-5 m-3 rounded-xl bg-white">
            <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold">Customize your links</h3>
                <p className="text-sm text-grey">Add/edit/remove links below and then share all your profiles with the world!</p>
            </div>
            <Button variant="outline" name="+ Add new link" />

            {links ?
                <div className="flex flex-col gap-8">
                    {links.map(link => (
                        <LinkCreation />
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
                <Button name='Save' variant='default' disabled />
            </div>
        </div>
    )
}

export default Customize