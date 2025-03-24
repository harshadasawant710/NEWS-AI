import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUsers } from "../Redux/slice/userSlice";
import { Button, Table } from "@mantine/core";
import {Trash} from 'lucide-react'

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (id) => {
        // if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUsers(id));
        // }
    };

    return (
        <div className="m-5">
            <h1>Admin Dashboard</h1>
            {users.data && users.data.length > 0 ? (
                <Table horizontalSpacing="md" highlightOnHover>
                        <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Prefrences</Table.Th>
                            <Table.Th>Bookmark</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                    <Table.Tbody>
                        {users.data.map((user) => (
                            <Table.Tr key={user._id}>
                                <Table.Td>{user._id}</Table.Td>
                                <Table.Td>{user.name}</Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td>{user.preferences}</Table.Td>
                                <Table.Td>{user.bookmarks}</Table.Td>
                                <Table.Td>
                                    <Button color="red"  onClick={() => handleDelete(user._id)}><Trash/></Button>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            ) : (
                <div>No users found.</div>
            )}
        </div>
    );
};

export default AdminDashboard;
