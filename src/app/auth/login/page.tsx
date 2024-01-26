"use client"
import React from 'react'
import TextField from '../../components/inputs/TextField'
import Button from '../../components/buttons/Button'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { handleSignOut } from '@/hooks/user'
import { setCookie } from 'nookies'
import { useRouter } from 'next/navigation'


type Props = {}
const Login = (props: Props) => {
    const { register, handleSubmit } = useForm()
    const { data: session } = useSession()
    const router = useRouter()
    // useEffect(() => { console.log(session?.access_token) }, [session])

    const onSubmit = async (data: any) => {
        handleLogin(data)
    }

    const handleLogin = async (userData: { username: string, password: string }) => {
        try {
            const result = await signIn("credentials", { username: userData.username, password: userData.password, redirect: false })
            //@ts-ignore
            setCookie(null, "access_token", session?.access_token, {
                maxAge: 1 * 24 * 60 * 60, // 1 day
                path: "/",
                secure: true,
                sameSite: "lax",
            });

            if (result?.error) {
                throw new Error("Error to Sign In")
            }
            if (result?.ok) {
                router.push("/")
                return true
            }
        } catch (error) {
            console.log("Submit Error", error)
            return false
        }
    }

    const handleGetAllUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "GET",
                credentials: "include", // Include credentials
            });
            if (!response.ok) {
                console.log(response.status, response.statusText);
            }
            if (response.ok) {
                console.log(await response.json());
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
                {session?.user && <p className='text-3xl'>{session?.user?.username}</p>}
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
            <button onClick={() => handleSignOut()}>Sign OUT</button>
        </div>
    )
}

export default Login;

