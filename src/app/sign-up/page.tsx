import React from 'react'
import TextField from '../components/inputs/TextField'
import Button from '../components/buttons/Button'
import Link from 'next/link'

type Props = {}

const SignUp = (props: Props) => {
    return (
        <div className='p-5 flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-bold'>Create account</h1>
                <p className='text-grey'>Let's get your started sharing your links!</p>
            </div>

            <form className='flex flex-col gap-5'>
                <label>
                    <p className='text-sm text-darkGrey'>Email address</p>
                    <TextField icon='icon-email.svg' placeholder='e.g.gabriel@email.com' />
                </label>
                <label>
                    <p className='text-sm text-darkGrey'>Create password</p>
                    <TextField icon='icon-password.svg' placeholder='Enter your password' />
                </label>
                <label>
                    <p className='text-sm text-darkGrey'>Confirm password</p>
                    <TextField icon='icon-password.svg' placeholder='Enter your password' />
                </label>

                <Button name='Create new account' variant='default' />
            </form>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-grey'>Already have an account?</p>
                <Link href={'/login'} className='text-purple hover:underline'>Login</Link>
            </div>
        </div>
    )
}

export default SignUp