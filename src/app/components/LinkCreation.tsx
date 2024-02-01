// LinkCreation.tsx
import React from 'react'
import SelectField from './inputs/SelectField'
import TextField from './inputs/TextField'
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import { ILinks } from './navigation/Customize'
import options from "../data/selectData.json"
import Image from 'next/image'
import { CiCircleRemove } from 'react-icons/ci'

type Props = {
    removeLink: () => void;
    length: number;
    register: UseFormRegister<FieldValues>;
    registerNameInput: string;
    registerNameSelect: string;
    control: Control<FieldValues>;
    defaultInputvalue: string;
    defaultSelectvalue: string;
};

const LinkCreation = ({ registerNameInput, registerNameSelect, register, removeLink, length, defaultInputvalue, defaultSelectvalue }: Props) => {
    return (
        <div className='flex flex-col gap-3 bg-lightGrey p-3 rounded-xl'>
            <div className="flex justify-between">
                {/* ... (existing code) */}
                <div className="flex gap-2 justify-between w-full">
                    <p className='text-grey'>Link {length}</p>
                    <p className='text-grey cursor-pointer hover:text-purple' onClick={removeLink}><CiCircleRemove className='text-3xl hover:text-purple' /></p>
                </div>
            </div>
            {/* 
            <label className='text-xs'>
                Platform
                <SelectField register={register} registerName={registerNameSelect} control={control} />
            </label> */}
            <label className='text-xs'>
                Platform

                <select
                    defaultValue={defaultSelectvalue}
                    {...register(registerNameSelect)}
                    className="appearance-none border border-greyBorder rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline focus:ring-purple focus:border-purple"
                >
                    <option value="" className="text-gray-500">Select</option>
                    {options.map(op => (
                        <option
                            key={op.name}
                            value={op.name}
                            className="flex items-center hover:text-purple rounded-lg"
                        >
                            {/* <Image src={`/images/${op.icon}`} width={16} height={16} alt='' /> */}
                            {op.name}
                        </option>
                    ))}
                </select>

            </label>



            <label className='text-xs'>
                Link
                <TextField defaultValue={defaultInputvalue} register={register} registerName={registerNameInput} placeholder='e.g. https://www.github.com/' />
            </label>
        </div>
    );
}

export default LinkCreation;
