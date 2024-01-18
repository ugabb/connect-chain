"use client"
import React from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import options from "@/app/data/selectData.json"
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'



type Props = {}

const SelectField = (props: Props) => {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Link" />
            </SelectTrigger>
            <SelectContent className='w-[500px]'>
                {options.map(option => (
                    <SelectItem key={option.name} value={option.name} className='cursor-pointer w-full'>
                        <div className="flex gap-3 hover:text-purple w-full items-center">
                            <Image src={"/images/" + option.icon} width={16} height={16} alt='' />
                            <p>{option.name}</p>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default SelectField