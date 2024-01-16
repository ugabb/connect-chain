"use client"

import React, { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
}

const TextField: React.FC<Props> = ({ icon, ...props }: Props) => {
    const [onFocus, setOnFocus] = useState<boolean>(false);

    return (
        <div className={`flex items-center border rounded-lg w-full overflow-hidden py-2 px-3 gap-3 ${onFocus ? 'border-purple shadow-lg shadow-purple/10' : 'border-greyBorder'} `}>
            <Image width={16} height={16} alt='link icon' src={icon ? `/images/${icon}` : "/images/icon-link.svg"} />
            <input
                className='w-full outline-none'
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
                {...props}
            />
        </div>
    );
};

export default TextField;
