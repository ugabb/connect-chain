import React from 'react'
import TextField from '../components/inputs/TextField'
import Button from '../components/buttons/Button'
import Link from 'next/link'

type Props = {}

const Login = (props: Props) => {
    return (
        <div className='p-5 flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-bold'>Login</h1>
                <p className='text-grey'>Add your details below get back into the app</p>
            </div>

            <form className='flex flex-col gap-5'>
                <label>
                    <p className='text-sm text-darkGrey'>Email address</p>
                    <TextField icon='icon-email.svg' placeholder='e.g.gabriel@email.com' />
                </label>
                <label>
                    <p className='text-sm text-darkGrey'>Password</p>
                    <TextField icon='icon-password.svg' placeholder='Enter your password' />
                </label>

                <Button name='Login' variant='default' />
            </form>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-grey'>Don't have an account</p>
                <Link href={'/sign-up'} className='text-purple hover:underline'>Create Account</Link>
            </div>
        </div>
    )
}

export default Login