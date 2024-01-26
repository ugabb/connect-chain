import React from 'react'
import Button from '../buttons/Button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

type Props = {}

const Preview = (props: Props) => {
    const { data: session } = useSession()
    return (
        <div className='flex flex-col justify-center items-center p-3 bg-white'>
            <div className='flex justify-center items-center gap-5'>
                <Button name='Back to Editor' variant='outline' />
                <Button name='Share Link' variant='default' />
            </div>

            <div className="flex flex-col justify-center items-center gap-5 mt-16">
                <Image className='border-2 border-purple rounded-full' width={100} height={100} alt='profile picture' src={'/images/icon-github.svg'} />
                <div className="flex flex-col gap-3">
                    <h2 className='font-bold text-4xl'>{session?.user.name}</h2>
                    <p className='text-grey'>{session?.user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Preview