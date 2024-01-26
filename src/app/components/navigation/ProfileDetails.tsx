import Image from 'next/image'
import React from 'react'
import TextField from '../inputs/TextField'
import { Separator } from '@/components/ui/separator'
import Button from '../buttons/Button'
import { useForm } from 'react-hook-form'

type Props = {}

const ProfileDetails = (props: Props) => {
    const { register } = useForm()
    return (
        <div className="flex flex-col gap-10 p-5 m-3 rounded-xl bg-white">
            <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold">Profile Details</h3>
                <p className="text-sm text-grey">Add your details to create a personal touch to your profile.</p>
            </div>

            <form className='flex flex-col gap-5'>
                <div className="flex flex-col gap-3 bg-lightGrey p-5 rounded-lg">
                    <p className='text-grey'>Profile picture</p>
                    <label className="relative flex flex-col justify-center items-center w-[190px] h-[190px] cursor-pointer p-20 bg-lightPurple rounded-lg group  hover:shadow-lg hover:shadow-purple/30 transition-all ease-in">
                        <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                        <span className="p-2 text-purple font-bold rounded-md text-nowrap flex flex-col justify-center items-center">
                            <Image src={'/images/icon-upload-image.svg'} height={40} width={40} alt='upload image' className='group-hover:text-lightPurple' />
                            + Upload Image
                        </span>
                    </label>
                    <p className='text-grey text-xs'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
                </div>

                <div className="flex flex-col gap-3 bg-lightGrey p-5 rounded-lg">
                    <label className='text-xs'>
                        First Name*
                        <TextField register={register} registerName='firstName' icon='none' />
                    </label>
                    <label className='text-xs'>
                        Last Name*
                        <TextField register={register} registerName='lastName' icon='none' />
                    </label>
                    <label className='text-xs'>
                        Email*
                        <TextField register={register} registerName='email' icon='none' />
                    </label>
                </div>
            </form>

            <div className="flex flex-col gap-3">
                <Separator />
                <Button name='Save' variant='default' disabled />
            </div>
        </div>
    )
}

export default ProfileDetails