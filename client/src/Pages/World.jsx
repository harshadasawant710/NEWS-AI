import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorldNews } from '../Redux/slice/newsSlice';
import { addBookmarks, removeBookmarks } from '../Redux/slice/BookMarkSlice';
import { Card, Image, Text, Group, Button, Badge, ActionIcon, Tooltip } from '@mantine/core';
import { Bookmark } from 'lucide-react';

const World = () => {
    const dispatch = useDispatch();
    const { worldNews, loading, error } = useSelector(state => state.news);
    const bookmarkedArticles = useSelector(state => state.bookmarks) || [];

    useEffect(() => {
        dispatch(fetchWorldNews());
    }, [dispatch]);

    const toggleBookmarks = (article) => {
        const data = {
            title: article.title,
            source: article.source.name,
            url: article.url,
            imageUrl: article.urlToImage,
            publishedAt: article.publishedAt,
            author: article.author
        };

        if (bookmarkedArticles.some(b => b.url === article.url)) {
            dispatch(removeBookmarks(article.url));
        } else {
            dispatch(addBookmarks(data));
        }
    };

    if (loading) return <Text>Loading world news...</Text>;
    if (error) return <Text color="red">Error fetching world news: {error}</Text>;

    return (
        <div>
            <h1 className="text-6xl font-extrabold text-black m-5"><span className="text-cyan-500">World </span>at a Glance</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {worldNews?.length > 0 ? (
    worldNews
        .filter((article, index, self) => 
            index === self.findIndex((a) => a.url === article.url) // Remove duplicates
        )
        .map((article, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                {article.urlToImage && (
                    <Card.Section>
                        <Image 
                            src={article.urlToImage} 
                            style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
                            alt={article.title} 
                        />
                    </Card.Section>
                )}
                <Text weight={600} size="lg" mt="md">{article.title}</Text>
                <Text size="sm" color="dimmed" mt="sm" lineClamp={3}>
                    {article.description || "No description available."}
                </Text>
                <Group position="right" mt="md">
                    <Badge color="gray" variant="light">{article.author || 'Unknown Author'}</Badge>
                </Group>
            </Card>
        ))
) : (
    <p>No world news available.</p>
)}



            </div>
        </div>
    );
};

export default World;
