import Image from 'next/image'
import React from 'react'
import SelectField from './inputs/SelectField'
import TextField from './inputs/TextField'
import { useForm } from 'react-hook-form'

type Props = {
    removeLink: () => void;
    length: number
}

const LinkCreation = ({ removeLink, length }: Props) => {
    const {register} = useForm()
    return (
        <div className='flex flex-col gap-3 bg-lightGrey p-3 rounded-xl'>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Image src={"/images/icon-drag-and-drop.svg"} alt='icon order' width={12} height={12} />
                    <p className='font-bold text-grey'>Link # {length}</p>
                </div>
                <p className='text-grey cursor-pointer hover:text-purple' onClick={removeLink}>Remove</p>
            </div>

            <label className='text-xs'>
                Platform
                <SelectField />
            </label>

            <label className='text-xs'>
                Link
                <TextField register={register} registerName=''  placeholder='e.g. https://www.github.com/' />
            </label>
        </div>
    )
}

export default LinkCreation