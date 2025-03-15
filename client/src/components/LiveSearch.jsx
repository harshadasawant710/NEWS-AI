import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from '@mantine/core'
import { Loader, Search } from 'lucide-react'
import axios from 'axios'
import { motion } from 'motion/react'

const LiveSearch = () => {
    const [query, setQuery] = useState('')
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const searchRef = useRef()

    console.log(query)

    // useEffect(() => {
    //     const handleOutsideClick = (event) => {
    //         console.log(searchRef.current)
    //         console.log(searchRef.current.contains(event.target))
    //         if (searchRef.current && !searchRef.current.contains(event.target)) {
    //             setDropdown(false)
    //         }
    //     }
    //     window.addEventListener('click', handleOutsideClick)
    //     return () => window.removeEventListener('click', handleOutsideClick)

    // })

    useEffect(() => {

        if (query.length < 1) {
            setResult([])
            setDropdown(false)
            return
        }
        const fetchData = async () => {
            setLoading(true)
            setDropdown(true)

            try {
                const res = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=62a2a823b5db43f880977da2e0bc698d`);

                console.log(res.data.articles);
                setResult(res.data.articles)
                setLoading(false)
            }
            catch (error) {
                setLoading(false)
                setDropdown(false)
            }
        }
        const timeOut = setTimeout(fetchData(), 1000)
        return () => clearTimeout(timeOut)
    }, [query])

    return (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className='relative rounded-md' ref={searchRef}>
            <TextInput radius={10} placeholder='Search' leftSection={<Search size={16} />} onChange={(e) => setQuery(e.target.value)} />
            {dropdown && <div className='absolute p-2 mt-3 max-h-[300px] overflow-y-scroll bg-white w-full shadow rounded-sm'>
                {loading ? (<div className='flex justify-center items-center gap-4 px-4 py-10'>
                    <Loader size={20} /> <p>Searching</p>
                </div>) :
                    (result.length > 0 ?
                        (<div>
                            {result?.map((d) => (
                                <a href={d.url} target='_blank' className='flex gap-2 hover:bg-gray-100 p-2 cursor-pointer rounder-md'>
                                    <img className='h-16 w-16 object-cover rounded-md' src={d.urlToImage || 'https://placehold.co/16*16'} />
                                    <p>{d.title}</p>
                                </a>
                            ))}
                        </div>) : (<p className='tet-center p-5'>no data</p>))}
            </div>}

        </motion.div>
    )
}

export default LiveSearch
