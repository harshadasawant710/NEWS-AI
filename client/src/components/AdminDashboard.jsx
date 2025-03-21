import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../Redux/slice/userSlice";
import { Table } from "@mantine/core";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <div className="m-5">
            <h1>Admin Dashboard</h1>
            {Array.isArray(users.data) && users.data.length > 0 ? (
                <Table horizontalSpacing="md" highlightOnHover>
                        <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            </Table.Tr>
                        </Table.Thead>

                    <Table.Tbody>
                        {users.data.map((user) => (
                            <Table.Tr key={user._id}>
                                <Table.Td>{user._id}</Table.Td>
                                <Table.Td>{user.name}</Table.Td>
                                <Table.Td>{user.email}</Table.Td>
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
