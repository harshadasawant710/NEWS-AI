import React from 'react'
import { Avatar, Menu, Button, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { signOut } from '../Redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { Bell, Bookmark, History, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCookie } from '../utils/utils';


const BellIcon = () => {
    return (
        <div>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Bell radius="xl" />
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

                    <Menu.Item color="red" leftSection={<LogOut size={16} />}>
                        Sign Out
                    </Menu.Item>
                    <Menu.Item>
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
    )
}

export default BellIcon
