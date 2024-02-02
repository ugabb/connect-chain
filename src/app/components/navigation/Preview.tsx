import React, { useEffect, useState } from 'react'
import Button from '../buttons/Button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useGetAllLinksByUser } from '@/hooks/useGetUserLink'
import Link from 'next/link'
import { ILinks } from '@/interfaces/ILink'

type Props = {}

const Preview = (props: Props) => {
    const [links, setLinks] = useState<ILinks[]>()
    const { data: session } = useSession()
    const username = session?.user.username

    const { getAllLinksByUser, linksLoading } = useGetAllLinksByUser()

    const handleGetAllLinksByUser = async () => {
        if (username) {
            const data = await getAllLinksByUser(username)
            setLinks(data);
        }
    };

    useEffect(() => {
        handleGetAllLinksByUser()
    }, [])
    useEffect(() => {
        console.log(links)
    }, [links])
    return (
        <div className='flex flex-col items-center p-3 bg-gradient-to-t from-purple/30 h-screen'>
            <div className='flex justify-center items-center gap-5'>
                <Button name='Back to Editor' variant='outline' />

                {/* NEXT_PUBLIC_API/user-link-chain/{username} */}
                <Button name='Share Link' variant='default' />
            </div>

            <div className="flex flex-col justify-center items-center gap-5 mt-16">
                {session?.user.profileImage &&
                    <Image className='border-2 border-purple rounded-full' width={100} height={100} alt='profile picture' src={session?.user?.profileImage} />
                }
                <div className="flex flex-col gap-3 text-center">
                    <h2 className='font-bold text-4xl'>{session?.user.firstName} {session?.user.lastName}</h2>
                    <p className='text-grey'>{session?.user.email}</p>
                </div>

                {
                    linksLoading ?
                        <p>loading</p>
                        :
                        <div className="flex flex-col gap-5">
                            {links?.map(link => (
                                <Link href={link.url} target='_blank' className={`flex gap-20 justify-between items-center p-4 rounded-lg  hover:shadow-md hover:shadow-purple/50 hover:scale-105 transition-all `} style={{ backgroundColor: link.color }} key={link.platform}>
                                    <div className="flex gap-3">
                                        <Image src={`/images/${link.iconName}.svg`} className='fill-white' width={20} height={20} alt={link.iconName} />
                                        <p className='text-white'>{link.platform}</p>
                                    </div>
                                    <Image src={'/images/icon-arrow-right.svg'} width={20} height={20} alt='arrow right icon' />
                                </Link>
                            ))}
                        </div>
                }
            </div>
        </div>
    )
}

export default Preview