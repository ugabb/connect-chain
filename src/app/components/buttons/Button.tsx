import React, { ButtonHTMLAttributes, HTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
    variant: "default" | "outline"
}

const Button: React.FC<Props> = ({ name, variant, ...props }) => {
    return (
        <button className={`${variant === "outline" ? "border border-purple text-purple hover:bg-purple/10 hover:text-lightGrey" : "bg-purple text-white"} w-full text-md rounded-lg font-bold px-9 py-3 hover:bg-purple/80 transition-all ease-in-out disabled:opacity-30`} {...props}>{name}</button>
    )
}

export default Button 