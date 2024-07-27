import { useEffect, useState } from "react";
import { GetBasicStatistics } from "../../../../../services/statistics.service";
import { io } from "socket.io-client";
import { API_SOCKET_URL } from "../../../../../utils/Endpoints";
import { BasicStatistics } from "../../../../../interfaces/StatisticsInterface";
import { useAuth } from '../../../../../context/AuthContext';
const socket = io(API_SOCKET_URL);

export const useActiveUsers = () => {
    const { profileInfo, userInfo } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const client_id = userInfo as { client_id : number };
    
    const [basicStatistics, setBasicStatistics] = useState<BasicStatistics | null>(null);
    const [activeUsers, setActiveUsers] = useState<{
        total?: number;
        actives?: number;
    }>({
        total: 0,
        actives: 0,
    });

    useEffect(() => {
        setIsLoading(true);

        GetBasicStatistics(client_id.client_id)
            .then((data) => {
                setBasicStatistics(data);

                console.log("data",data);
                setActiveUsers((prevState) => ({
                    ...prevState,
                    total: data.totalStudents,
                }));
            })
            .finally(() => {
                setIsLoading(false);
            });

        socket.on("active-users", (data: []) => {
            setActiveUsers((prevState) => ({
                ...prevState,
                actives: data.length,
            }));
        });

        return () => {
            socket.off("active-users");
        };
    }, []);

    return { activeUsers, isLoading, basicStatistics };
};
