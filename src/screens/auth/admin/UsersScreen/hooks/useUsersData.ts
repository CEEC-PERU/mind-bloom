import { useEffect, useState } from "react"
import { UserWithRole } from "../../../../../interfaces/StudentInterfaces";
import { GetAllUsers } from "../../../../../services/student.service";
import { useAuth } from "../../../../../context/AuthContext";

export const useUsersData = () => {
    const [users, setUsers] = useState<UserWithRole[]>([]);
    const [searchedText, setSearchedText] = useState("");
    const [filteredData, setFilteredData] = useState(users);
    const { userInfo } = useAuth();
    const usInfo = userInfo as { id: number , client_id : number };
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            const users = await GetAllUsers();
            const usersWithoutMe = users.filter((user) => user.user_id !== usInfo.id && user.client_id === usInfo.client_id);
            setUsers(usersWithoutMe);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = users.filter(student => {
            const lowerCaseQuery = searchedText.toLowerCase();
            return (
                (student.Profile?.first_name!.toLowerCase().includes(lowerCaseQuery) ??
                    student.Profile?.last_name!.toLowerCase().includes(lowerCaseQuery)
                ) ?? student.email.toLowerCase().includes(lowerCaseQuery)
            );
        });
        setFilteredData(filtered);
    }, [searchedText, users]);

    return {
        filteredData,
        fetchData,
        isLoading,
        setSearchedText,
        users
    }
}