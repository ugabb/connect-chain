// LinkCreation.tsx
import React from 'react'
import TextField from './inputs/TextField'
import { Control, FieldValues, UseFormRegister } from 'react-hook-form'
import options from "../data/selectData.json"
import { CiCircleRemove } from 'react-icons/ci'
import Image from 'next/image'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormControl, FormField, FormItem } from '@/components/ui/form'

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

const LinkCreation = ({ registerNameInput, registerNameSelect, register, removeLink, length, defaultInputvalue, defaultSelectvalue, control }: Props) => {
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

                {/* <select
                    defaultValue={defaultSelectvalue}
                    {...register(registerNameSelect)}
                    className="appearance-none border border-greyBorder hover:purple rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline focus:ring-purple focus:border-purple"
                >
                    <option value="" className="text-gray-500">Select</option>
                    {options.map((op) => (
                        <option
                            key={op.name}
                            value={op.name}
                            className="flex items-center hover:text-purple rounded-lg text-md hover:purple"
                        >
                            <p>{op.name}</p>
                        </option>
                    ))}
                </select> */}

                <FormField
                    control={control}
                    name={registerNameSelect}
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a platform" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        {options.map((op) => (
                                            <SelectItem value={op.name}>
                                                <div className="flex gap-3 items-center">
                                                    <Image src={`/images/${op.icon}`} height={16} width={16} alt={op.icon} />
                                                    <p>{op.name}</p>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />


            </label>



            <label className='text-xs'>
                Link
                <TextField defaultValue={defaultInputvalue} register={register} registerName={registerNameInput} placeholder='e.g. https://www.github.com/' />
            </label>
        </div >
    );
}

export default LinkCreation;
