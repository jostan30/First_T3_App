'use client'
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

interface UserType {
    name: string | null;
    email: string | null;
    id: string;
}

export default function User() {
    const { data: users, refetch, error, isLoading } = api.user.getallUsers.useQuery();

    const createUser = api.user.createUser.useMutation({
        onSuccess: () => refetch(),
    });

    const [data, setData] = useState<{ name: string; email: string }>({
        name: "",
        email: ""
    });

    useEffect(() => {
        if (error) {
            console.error("Error fetching users:", error);
        }
    }, [error]);

    if (isLoading) return <p className="text-center text-lg font-semibold">Loading...</p>;
    if (error) return <p className="text-center text-red-500 font-semibold">Error loading users</p>;

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">Users</h1>
            
            {/* Form Section */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Add User</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input 
                        type="text" 
                        id="name" 
                        placeholder="Enter Name"
                        value={data.name} 
                        onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))} 
                    />
                    <Input 
                        type="email" 
                        id="email" 
                        placeholder="Enter Email"
                        value={data.email} 
                        onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))} 
                    />
                    <Button 
                        className="w-full" 
                        onClick={() => createUser.mutate(data)}
                    >
                        Add User
                    </Button>
                </CardContent>
            </Card>

            {/* Users List */}
            <div className="space-y-4">
                {users ? users.map((user: UserType) => (
                    <Card key={user.id.toString()} className="p-4 shadow-md">
                        <p className="text-lg font-semibold">{user.name}</p>
                        <p className="text-gray-600">{user.email}</p>
                    </Card>
                )) : <p className="text-center">No users found.</p>}
            </div>
        </div>
    );
}
