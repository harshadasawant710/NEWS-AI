import { Container, Avatar, Text, Tabs, Button, Divider } from '@mantine/core';
import { Bookmark, Bot, Cog, File, Heart, Pin } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getCookie } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getReadingHistory, clearReadingHistory } from '../Redux/slice/readingHistroy';
import { getBookmarks, removeBookmarks } from '../Redux/slice/BookMarkSlice';
import ListCompo from '../components/ListCompo';  // Import your new component

const Profile = () => {
    const dispatch = useDispatch();
    const { readingHistory } = useSelector((state) => state.readingHistory);
    const { bookmarks } = useSelector((state) => state.bookmarks);

    useEffect(() => {
        dispatch(getReadingHistory());
        dispatch(getBookmarks());
    }, [dispatch]);

    const handleDeleteHistory = (articleId) => {
        dispatch(clearReadingHistory(articleId)).then(() => dispatch(getReadingHistory()));
    };

    const handleDeleteBookmark = (articleUrl) => {
        dispatch(removeBookmarks(articleUrl)).then(() => dispatch(getBookmarks()));
    };

    return (
        <Container className='max-w-2xl mx-auto my-5'>
            <div className='flex justify-left items-center gap-2'>
                <Avatar size='xl' />
                <div>
                    <Text size='xl' fw={500}>{getCookie('name')}</Text>
                    <Text>{getCookie('email')}</Text>
                </div>
            </div>

            <div className='flex justify-left items-center gap-2 my-4'>
                <Button size="compact-md"><Pin size={20} color='orange' />Bookmark: {bookmarks.length}</Button>
                <Button size="compact-md"><File size={20} color='orange' />Reading History: {readingHistory.length}</Button>
            </div>

            <Button fullWidth variant='outline' className='px-5 py-1'>Edit Profile</Button>

            <Tabs defaultValue="Bookmarks">
                <Tabs.List>
                    <Tabs.Tab value="Bookmarks" leftSection={<Bookmark size={16} color='orange' />}>Bookmarks</Tabs.Tab>
                    <Tabs.Tab value="LikedNews" leftSection={<Heart size={16} color='red' />}>Liked News</Tabs.Tab>
                    <Tabs.Tab value="preferences" leftSection={<Cog size={16} color='blue' />}>Preferences AI</Tabs.Tab>
                    <Tabs.Tab value="ai-recommended" leftSection={<Bot size={16} color='green' />}>AI Recommended</Tabs.Tab>
                    <Tabs.Tab value="readingHistory" leftSection={<Bot size={16} color='green' />}>Reading History</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="Bookmarks">
                    <ListCompo data={bookmarks} handleDelete={handleDeleteBookmark} />
                </Tabs.Panel>

                <Tabs.Panel value="readingHistory">
                    <ListCompo data={readingHistory} handleDelete={handleDeleteHistory} />
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
};

export default Profile;
