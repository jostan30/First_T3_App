'use client'
import { useEffect } from "react";
import { api } from "../../utils/api";

interface UserType {
    name: String | null,
    email: String | null,
    id: String
}

export default function User() {
    const { data: users, refetch,error ,isLoading } = api.user.getallUsers.useQuery();

    const createUser = api.user.createUser.useMutation({
        onSuccess: () => refetch(),
    })

    useEffect(() => {
        if (error) {
            console.error("Error fetching users:", error);
        }
    }, [error]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;


    return (<>
        <h1>Users</h1>
        <button onClick={()=>createUser.mutate({
            name: "Jostan Mathias",
            email: "jostanmathias@gmail.com"
        })}>Add User</button>
        <ul>
            {
                users ? (users?.map((user: UserType) => (
                    <li key={user.id.toString()}>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </li>
                ))) : <p>Loading...</p>}
        </ul>

    </>
    );
}

