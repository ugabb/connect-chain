import Image from 'next/image'
import React from 'react'
import SelectField from './inputs/SelectField'
import TextField from './inputs/TextField'

type Props = {}

const LinkCreation = (props: Props) => {
    return (
        <div className='flex flex-col gap-3 bg-lightGrey p-3 rounded-xl'>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Image src={"/images/icon-drag-and-drop.svg"} alt='icon order' width={12} height={12} />
                    <p className='font-bold text-grey'>Link #1</p>
                </div>
                <p className='text-grey'>Remove</p>
            </div>

            <label className='text-xs'>
                Platform
                <SelectField />
            </label>

            <label className='text-xs'>
                Link
                <TextField placeholder='e.g. https://www.github.com/' />
            </label>
        </div>
    )
}

export default LinkCreation