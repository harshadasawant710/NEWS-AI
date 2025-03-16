import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Mail, Lock, Unlock, SquareUserRound, TriangleAlert  } from 'lucide-react'
import { Button, Loader } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { registerUser } from '../Redux/slice/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { z } from 'zod'
import { zodResolver} from '@hookform/resolvers/zod'


const Register = () => {

    const passwordSchema = z.string().min(4, { message: "Password should be atleast 4 character long" }).superRefine((value,ctx)=>{
        console.log(value)
        
        if(!/[A-Z]/.test(value)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Must required atleast one uppercase.`,
              });
        }

        if(!/[a-z]/.test(value)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Must required atleast one lowercase.`,
              });
        }

        if(!/[0-9]/.test(value)){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Must required atleast one digit.`,
              });
        }
    })

    const registerSchema = z.object({
        name: z.string().min(1, { message: 'Name should contain atleast 1 character' }),
        email: z
            .string()
            .min(1, { message: "This field has to be filled" })
            .email("This is not a valid email."),
        password: passwordSchema,
        confirmPassword : z.string()
        .min(4, { message: "Please confirm password" }),
    }).refine((data) => data.password === data.confirmPassword, {
        message:'Passwor do not match',
        path :[
            'confirmPassword'
        ]
    })

    const {register, handleSubmit, formState:{errors},} = useForm({
                resolver: zodResolver(registerSchema)
        
    });
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)

    //console.log(loading)

    const onSubmitPass = (data, e) => {
        e.preventDefault();
        dispatch(registerUser(data))
        console.log(data);
    }

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
                <h1 className='text-center mb-4 font-bold'>Create your account</h1>

                <form className='w-full' onSubmit={handleSubmit(onSubmitPass)}>
                    <div className='flex items-center gap-2 my-4'><SquareUserRound className='text-gray-600' size={20} />
                        <input type='Text'
                            className='focus:outline-none borber-b border-gray w-full'
                            placeholder='Enter Name'
                            {...register("name")} />
                    </div>
                    {errors.name && <p className='text-red-700 flex gap-1 text-sm'><TriangleAlert size={15} /> {errors.name.message}</p>}

                    <div className='flex items-center gap-2 my-4'><Mail className='text-gray-600' size={20} />
                        <input type='email'
                            className='focus:outline-none borber-b border-gray w-full'
                            placeholder='Enter Email'
                            {...register("email")} />
                    </div>
                    {errors.email && <p className='text-red-700 flex gap-1 text-sm text-sm'><TriangleAlert size={15} /> {errors.email.message}</p>}

                    <div className='flex items-center gap-2 my-4'><span onClick={handleChange} className='text-gray-600' >{isLock ? <Unlock size={20} /> : <Lock size={20} />}</span>
                        <input type={changeInput ? "text" : "password"}
                            className='focus:outline-none borber-b border-gray w-full'
                            placeholder='Enter password'
                            {...register("password")} />
                    </div>
                    {errors.password && <p className='text-red-700 flex gap-1'><TriangleAlert size={20} /> {errors.password.message}</p>}

                    <div className='flex items-center gap-2 my-4'><span onClick={handleChange} className='text-gray-600'>{isLockC ? <Unlock size={20} /> : <Lock size={20} />}</span>
                        <input type={changeInput ? "text" : "password"}
                            className='focus:outline-none borber-b border-gray w-full'
                            placeholder='Confirm password'
                            {...register("confirmPassword")} />
                    </div>
                    {errors.confirmPassword && <p className='text-red-700 flex gap-1'><TriangleAlert size={20} /> {errors.confirmPassword.message}</p>}

                    <Button fullWidth className='w-full font-semibold rounded-lg shadow-md hover:scale-105' type='submit'>{loading ? <Loader size={16} color='white' /> : "SignUp"}</Button>
                    <p className='text-center text-gray-500'>Already have an account? <Link to='/login' className='text-blue-500 text-bold'>LogIn</Link></p>
                </form>
            </motion.div>
        </div>
    )
}

export default Register
