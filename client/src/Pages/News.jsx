import { useEffect, useState } from 'react';
import { Container, Grid, Title, TextInput, Card, Pagination, Text } from '@mantine/core';
import { Landmark, Search, TrendingUp } from 'lucide-react';
import { fetchAllNews } from '../Redux/slice/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Briefcase, Laptop, Dumbbell, Heart, Film, FlaskConical } from 'lucide-react';
import { addReadingHistory } from '../Redux/slice/readingHistroy';

const categories = [
    { name: 'All', icon: null },
    { name: 'Trending', icon: <TrendingUp size={14} /> },
    { name: 'Business', icon: <Briefcase size={14} /> },
    { name: 'Technology', icon: <Laptop size={14} /> },
    { name: 'Sports', icon: <Dumbbell size={14} /> },
    { name: 'Health', icon: <Heart size={14} /> },
    { name: 'Entertainment', icon: <Film size={14} /> },
    { name: 'Science', icon: <FlaskConical size={14} /> },
    { name: 'Politics', icon: <Landmark size={14} /> },
];

export default function News() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');

    const { news, totalPages, totalCount } = useSelector((state) => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllNews({ currentPage: page, category: selectedCategory, search }));
        console.log("here",search)
    }, [page, selectedCategory, search]);
    

    const handleAddHistory = (news) => {
        console.log(news)
        const data = {
            article : {
                articleId : news._id,
                title : news.title,
                source : news.source.name,
                url : news.url,
                imageUrl : news.urlToImage,
                publishedAt : news.publishedAt
            }
        }
        dispatch(addReadingHistory(data))
    }

    return (
        <Container size="xl" my="lg">
            <Grid mt="lg" gutter="xl">
                <Grid.Col span={3}>
                    <Title order={4} mb="md">Categories</Title>
                    {categories.map(({ name, icon }) => (
                        <div
                            key={name}
                            onClick={() => {
                                setSelectedCategory(name === 'All' ? '' : name.toLowerCase());
                                setPage(1); // Reset to page 1 when category changes
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                fontWeight: selectedCategory === name.toLowerCase() ? 'bold' : 'normal',
                                color: selectedCategory === name.toLowerCase() ? '#1e90ff' : 'inherit',
                                marginBottom: '10px',
                            }}
                        >
                            {icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
                            {name}
                        </div>
                    ))}
                </Grid.Col>

                <Grid.Col span={9}>
                    <Title order={1}>Stay tuned for latest news</Title>
                    <Text size="lg" mt="sm">Get real-time content across the globe</Text>
                    <div>
                        {totalCount > 0 ? <span>Showing {totalCount} Results</span> : null}
                    </div>
                    <TextInput radius={10} placeholder='Search' leftSection={<Search size={16} />} onChange={(e) => setSearch(e.target.value)} />

                    {news.map((news) => (
                        <Card key={news.id} shadow="sm" p="lg" mb="md" radius="md" withBorder className='hover:bg-gray-500 mt-5'>
                            <a className='cursor-pointer flex gap-4 p-2 rounder-md' href={news.url} onClick={() => handleAddHistory(news)} target='_blank'>
                                <img className='h-28 w-36' src={news.urlToImage} alt={news.title} />
                                <div>
                                    <Title className='hover:text-cyan-500' order={3}>{news.title}</Title>
                                    <Text mt="sm">{news.description}</Text>
                                </div>
                            </a>
                        </Card>
                    ))}

                    <Pagination
                        total={totalPages}
                        value={page}
                        onChange={setPage}
                        mt="md"
                    />
                </Grid.Col>
            </Grid>
        </Container>
    );
}

