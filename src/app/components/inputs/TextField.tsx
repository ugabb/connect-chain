"use client"

import React, { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string | "none";
    register: UseFormRegister<FieldValues>;
    registerName: string
}

const TextField: React.FC<Props> = ({ icon, register, registerName, ...props }: Props) => {
    const [onFocus, setOnFocus] = useState<boolean>(false);
    
    return (
        <div className={`flex items-center border rounded-lg w-full h-10 bg-white overflow-hidden py-2 px-3 gap-3 hover:border-purple hover:shadow-lg shadow-purple/10  ${onFocus ? 'border-purple shadow-lg shadow-purple/10' : 'border-greyBorder'} `}>
            {icon !== "none" && <Image width={12} height={12} alt='link icon' src={icon ? `/images/${icon}` : "/images/icon-link.svg"} />}

            <input
                className='w-full outline-none'
                {...props}
                {...register(registerName)}
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
            />
        </div>
    );
};

export default TextField;
