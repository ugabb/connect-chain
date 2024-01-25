"use client"
import React, { useEffect } from 'react'
import TextField from '../../components/inputs/TextField'
import Button from '../../components/buttons/Button'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { getToken } from 'next-auth/jwt'

type Props = {}
const secret = process.env.NEXTAUTH_SECRET
const Login = (props: Props) => {
    const { register, handleSubmit } = useForm()
    const { data: session } = useSession()
    useEffect(() => { console.log(session?.access_token) }, [session])

    const onSubmit = async (data: any) => {
        try {
            const result = await signIn("credentials", { username: data.username, password: data.password, redirect: false })

            if (result?.error) {
                return console.log("Fudeu", result.error)
            }
        } catch (error) {
            console.log("Submit Error", error)
        }
    }
    const handleGetAllUsers = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/users", {
            method: "GET",
            credentials: "include", // Include credentials
            headers: {
              Authorization: `Bearer ${session?.access_token}`, // Use the access token from cookies
            },
          });
          console.log(response.ok);
          if (!response.ok) {
            console.log(response.status, response.statusText);
          }
          return response.json();
        } catch (error) {
          console.log("All users", error);
        }
      };


    return (
        <div className='p-5 flex flex-col gap-5'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl font-bold'>Login</h1>
                <p className='text-grey'>Add your details below get back into the app</p>
                {session?.user && <p>{session?.user?.username}</p>}
            </div>

            <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <label>
                    <p className='text-sm text-darkGrey'>Email address</p>
                    <TextField registerName='username' register={register} icon='icon-email.svg' placeholder='e.g.gabriel@email.com' {...register("username")} />
                </label>
                <label>
                    <p className='text-sm text-darkGrey'>Password</p>
                    <TextField registerName='password' register={register} icon='icon-password.svg' placeholder='Enter your password' type='password' {...register("password")} />
                </label>

                <Button name='Login' variant='default' type='submit' />
                {/* <Button name='Sign Out' onClick={signOutHandler} variant='default' type='submit' /> */}
            </form>
            <div className='flex flex-col items-center justify-center'>
                <p className='text-grey'>Don't have an account</p>
                <Link href={'/sign-up'} className='text-purple hover:underline'>Create Account</Link>
            </div>
            <button onClick={handleGetAllUsers}>GET ALL USERS</button>
            <button onClick={() => signOut()}>Sign OUT</button>
        </div>
    )
}

export default Login;

