import { useEffect, useState } from "react"
import { useAuth } from '../../../../../context/AuthContext';
import {GetCampaignNotAsigned} from '../../../../../services/campaign.service';
import { UserNoAsignado} from '../../../../../interfaces/CampaignInterface';
export const useCampaignAddStudents = () => {
    const [students, setStudents] = useState<UserNoAsignado[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchedText, setSearchedText] = useState('');
    const [filteredData, setFilteredData] = useState(students);
    const [selectedStudents, setSelectedStudents] = useState<UserNoAsignado[]>([]);
    const { userInfo, userToken } = useAuth();
    const fetchData = async () => {
        if (userToken) {
        try {
            const user = userInfo as { id: number; role: number; client_id: number};
            setIsLoading(true);
            
            const response = await GetCampaignNotAsigned(user.client_id , userToken);

            if (response === null) {
                setStudents([]); //establece el estado a un array vacío
              } else if (Array.isArray(response)) {
                setStudents(response); //establece el estado a ese array
              } else {
                setStudents([response]); //campaigndata es un solo objeto Campaign, conviértelo en un array
              }
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
}

    useEffect(() => {
        fetchData();
        setSelectedStudents([]);
    }, []);

    useEffect(() => {
        const filtered = students.filter(student => {
            const lowerCaseQuery = searchedText.toLowerCase();
            return (
                (student.Profile?.first_name!.toLowerCase().includes(lowerCaseQuery) ??
                    student.Profile?.last_name!.toLowerCase().includes(lowerCaseQuery)
                ) ?? student.email.toLowerCase().includes(lowerCaseQuery)
            );
        });
        setFilteredData(filtered);
    }, [searchedText, students]);

    return {
        fetchData,
        students,
        isLoading,
        searchedText,
        setSearchedText,
        filteredData,
        selectedStudents,
        setSelectedStudents
    }
}