import React from 'react';
import { Divider, Menu, Text } from '@mantine/core';
import { EllipsisVertical, Trash } from 'lucide-react';

const ListCompo = ({ data, handleDelete }) => {
    return (
        <div>
            {data.length > 0 ? (
                <>
                    <Divider className='my-2' />
                    {data.map((item) => (
                        <React.Fragment key={item._id}>
                            <div className='flex p-5 justify-between'>
                                <a href={item.url} target='_blank' className='block font-bold hover:text-cyan-600'>
                                    {item.title}
                                </a>
                                <Menu position='bottom-end'>
                                    <Menu.Target>
                                        <EllipsisVertical className='cursor-pointer' />
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item fw={500} onClick={() => handleDelete(item._id || item.articleId || item.url)} leftSection={<Trash />}>
                                            Delete
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </div>
                            <Divider />
                        </React.Fragment>
                    ))}
                </>
            ) : (
                <Text>No history available.</Text>
            )}
        </div>
    );
};

export default ListCompo;
