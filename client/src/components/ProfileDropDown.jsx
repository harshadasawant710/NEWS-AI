import React from 'react'
import { Avatar, Menu, Button, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { signOut } from '../Redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { Bookmark, History, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCookie } from '../utils/utils';

const getInitials = (name) => {
    if (!name) return "U"; // Default to 'U' if no name
    const words = name.split(" ");
    return words.length > 1 
        ? words[0][0] + words[1][0] 
        : words[0][0];
};

const ProfileDropDown = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut = () => {
        dispatch(signOut())
        navigate('/login')
    }

    const email = getCookie('email');
    const userName = getCookie('name'); // Get stored username from cookies
    const initials = getInitials(userName).toUpperCase();

    return (
        <div className='me-25' style={{cursor:'pointer'}}>
            {/* <Avatar color="cyan" radius="xl">MK</Avatar> */}

            <Menu shadow="md" width={200}>
                <Menu.Target>
                    {/* <Avatar radius="xl" /> */}
                    <Avatar color="cyan" radius="xl">{initials}</Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Profile</Menu.Label>
                    <Link to='/profile'>
                        <Menu.Item leftSection={<User size={16} />}>
                            Profile
                        </Menu.Item>
                    </Link>
                    <Menu.Item leftSection={<Bookmark size={16} />}>
                        Bookmarks
                    </Menu.Item>
                    <Menu.Item leftSection={<History size={16} />}>
                        Reading History
                    </Menu.Item>

                    <Menu.Item color="red" onClick={handleSignOut} leftSection={<LogOut size={16} />}>
                        Sign Out
                    </Menu.Item>
                    <Menu.Item>{email.length > 20 ? (
                        <>
                            {email.substring(0, 20)}
                            <br />
                            {email.substring(20)}
                        </>
                    ) : (
                        <span>{email}</span>
                    )}</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export default ProfileDropDown
