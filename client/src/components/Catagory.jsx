import { Tabs } from '@mantine/core'
import React, { useState, } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleCard from './ArticleCard'
import { Skeleton } from '@mantine/core'

const Catagory = () => {
    const [category, setCategory] = useState('General');
    console.log(category)

    const categories = ['General', 'Sports', 'Politics', 'Business', 'Entertainment', 'Health', 'Science']

    const fetchNewsByCategory = async ({ pageParam = 1 }) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/news/${category}`, { params: { page: pageParam } });
            return res.data;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw new Error('Failed to fetch news');
        }
    };

    const { data, hasNextPage, fetchNextPage, isLoading, status, } = useInfiniteQuery({
        queryKey: ['category', category],
        queryFn: fetchNewsByCategory,
        getNextPageParam: (lastPage) => lastPage?.nextPage ?? false, // Ensure it stops if no nextPage
    });

    console.log(data)

    return (
        <div className='mt-5 mx-10'>
            <h1 className='text-center font-bold space-y-10 text-2xl'>Categories</h1>
            <div className='flex justify-center my-3'>
                <Tabs value={category} onChange={setCategory}>
                    <Tabs.List>
                        {categories.map((cat) => (
                            <Tabs.Tab key={cat} value={cat}>{cat}</Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs>
            </div>
            <div>
                {isLoading ? (
                    <h4>Loading...</h4>
                ) : (
                    <InfiniteScroll
                        dataLength={data?.pages.length >= 0 && data?.pages.reduce((total, page) => total + page.length, 0 || 0)}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={<h4>Loading more...</h4>}
                        endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                    >

                        {isLoading ? (<div className='space-y-6'>
                            <Skeleton height={300} />
                            <Skeleton height={20} />
                            <Skeleton height={30} />
                        </div>) : (<div className='space-y-6'>
                            {data?.pages.length >= 0 && data?.pages.map((page, Index) => (
                                <div key={Index}>
                                    {page.news.map((article, articleIndex) => (
                                        <ArticleCard key={article.id} article={{ ...article, category }} />

                                    )
                                    )}
                                </div>
                            ))}
                        </div>)}

                    </InfiniteScroll>
                )}
            </div>
        </div>
    );
};

export default Catagory;

