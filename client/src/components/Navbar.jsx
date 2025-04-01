import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from "motion/react"
import { Button } from '@mantine/core'
import { X, Menu } from 'lucide-react'
import { useSelector } from 'react-redux'
import ProfileDropDown from './ProfileDropDown'
import BellIcone from '../components/BellIcon'
import LiveSearch from './LiveSearch'

const Navbar = () => {
    const { authenticated } = useSelector((state) => state.auth)
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="h-16 p-2 sticky top-0 z-50 bg-white border-b-5 border-gray-400 shadow-md shadow-gray-400">
            <div className='flex items-center justify-between mx-6'>
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-2xl font-bold cursor-pointer'
                >
                    <Link to='/'>
                    NEWS
                    </Link>
                </motion.h1>

                <div className='w-1/3 '><LiveSearch /></div>
                
                <ul className='hidden md:flex gap-4'>
                    {['Home', 'News', 'World', 'About'].map((item) => {
                        const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`
                        return (
                            <motion.li
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                                key={item}
                                className={`hover:text-gray-700 ${location.pathname === path ? 'text-cyan-500 font-bold' : ''}`}
                            >
                                <Link to={path}>{item}</Link>
                            </motion.li>
                        )
                    })}
                </ul>

                <div className='flex space-x-4 items-center justify-center'>
                    {!authenticated &&
                        <>
                            <Link to='/login' className='hidden md:block'>
                                <Button className='mx-1' variant="outline">LogIn</Button>
                            </Link>
                            <Link to='/register' className='hidden md:block'>
                                <Button className='mx-1' variant="outline">Register</Button>
                            </Link>
                        </>
                    }
                    {authenticated && (
                        <>
                            <BellIcone />
                            <ProfileDropDown />
                        </>
                    )}

                    <button className='md:hidden' onClick={handleClick}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className='absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 md:hidden'
                >
                    {['Home', 'Categories', 'Channels', 'About'].map((item) => {
                        const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`
                        return (
                            <Link
                                key={item}
                                to={path}
                                className={`text-lg hover:text-gray-700 ${location.pathname === path ? 'text-cyan-500 font-bold' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        )
                    })}

                    {!authenticated &&
                        <>
                            <Link to='/login' className='w-full text-center' onClick={() => setIsOpen(false)}>
                                <Button className='w-3/4' variant="outline">LogIn</Button>
                            </Link>
                            <Link to='/register' className='w-full text-center' onClick={() => setIsOpen(false)}>
                                <Button className='w-3/4' variant="outline">Register</Button>
                            </Link>
                        </>
                    }
                    {authenticated && <ProfileDropDown />}
                </motion.div>
            )}
        </nav>
    )
}

export default Navbar
