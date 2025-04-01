import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Lock, Unlock, SquareUserRound, TriangleAlert } from 'lucide-react'
import { Button, Loader } from '@mantine/core'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { LoginUser, signInWithGoogle } from '../Redux/slice/authSlice'
import GoogleIcon from '../../../server/controllers/GoogleIcon'
import { jwtDecode } from 'jwt-decode'; // ✅ Correct import


const LogIn = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { authenticated, preferences, loading } = useSelector((state) => state.auth)

    useEffect(() => {
        if (authenticated && preferences.length > 0) {
            navigate('/')
        }
        else if (authenticated && preferences.length <= 0) {
            navigate('/preferences')
        }

        // if(authenticated){
        //     navigate('/')
        // }
    }, [authenticated])

    const LoginSchema = z.object({
        email: z
            .string()
            .min(1, { message: "This field has to be filled" })
            .email("This is not a valid email."),
        password: z.string()
            .min(1, { message: "Password is required" })
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema)
    });

    // const onsubmit = (data) => {
    //     dispatch(LoginUser(data))
    //     console.log(data)
    //     // navigate('/')
    // }

    const onsubmit = async (data) => {
        const response = await dispatch(LoginUser(data)).unwrap();

        //console.log("Login Response:", response); // ✅ Debugging step

        if (response.token) {
            localStorage.setItem('token', response.token);
            const decoded = jwtDecode(response.token);

            //console.log("Decoded Token:", decoded); // ✅ Debugging step

            if (decoded.role === 'admin') {
                navigate('/adminDashboard');
            } else {
                navigate('/');
            }
        } else {
            //console.error("Token missing from response");
        }
    };

    const [isLock, setIsLock] = useState(false)
    const [isLockC, setIsLockC] = useState(false)
    const [changeInput, setChangeInput] = useState(false)

    const handleChange = () => {
        setIsLock(!isLock)
        setIsLockC(!isLockC)
        setChangeInput(!changeInput)
    }
    return (
        <div className='bg-gray-200 h-screen flex justify-center items-center'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='w-96 rounded-xl p-4 shadow-md bg-white'>
                <h1 className='text-center mb-4 font-bold'>Welcome back</h1>

                <form className='w-ful mx-5' onSubmit={handleSubmit(onsubmit)}>
                    <div className='flex gap-2 my-4'><Mail className='text-gray-600' size={20} />
                        <input type='email'
                            className={errors.email ? 'border-red-700 border-b focus:outline-none w-full' : 'focus:outline-none borber-b border-gray w-full border-b border-gray-400'}
                            placeholder='Enter Email'
                            {...register("email")} />
                    </div>

                    {errors.email && <p className='text-red-700 flex gap-1'><TriangleAlert size={20} /> {errors.email.message}</p>}

                    <div className='flex gap-2 mt-4 mb-2'><span onClick={handleChange} className='text-gray-600' >{isLock ? <Unlock size={20} /> : <Lock size={20} />}</span>
                        <input type={changeInput ? "text" : "password"}
                            className={errors.password ? 'border-red-700 border-b focus:outline-none w-full' : 'focus:outline-none borber-b border-gray w-full border-b border-gray-400'}
                            placeholder='Enter password'
                            {...register("password")} />
                    </div>

                    {errors.password && <p className='text-red-700 flex gap-1'><TriangleAlert size={20} /> {errors.password.message}</p>}
                    <div className='flex justify-end font-semibold text-gray-500 mb-3 text-xs'>
                        <Link>Forget password?</Link>
                    </div>
                    <Button fullWidth className='mt-5 mb-2' type='submit'>
                        {loading ? <Loader size={16} color='white' /> : "LogIn"}
                    </Button>
                    <p className='text-center text-gray-500 text-sm my-3 font-semibold'>Or Sign Up Using</p>

                    <Button className='my-2' fullWidth variant='outline' leftSection={<GoogleIcon />} onClick={() => dispatch(signInWithGoogle())}>Login with Google</Button>
                    <p className='text-center text-gray-500'>Don't have an account? <Link to='/register' className='text-blue-500 text-bold'>Register</Link></p>
                </form>
            </motion.div>
        </div>
    )
}

export default LogIn
