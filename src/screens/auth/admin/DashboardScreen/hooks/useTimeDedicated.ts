import { useEffect, useState, useMemo, useCallback } from 'react';
import { GetSessionStatistics } from '../../../../../services/statistics.service';
import { WeeklySessionInfo } from '../../../../../interfaces/StatisticsInterface';
export const useSessionStatistics = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [sessionsPerWeek, setSessionsPerWeek] = useState<WeeklySessionInfo>();
    const [currentPage, setCurrentPage] = useState(0);
    const [averages, setAverages] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [weekRange, setWeekRange] = useState("");
    const weekDays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const weekDaysSimplify = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const loadSessionStatistics = useCallback(async (page: number) => {
        setIsLoading(true);
        try {
            const data = await GetSessionStatistics(page);
            const updatedAverages = weekDays.map((weekDay, index) => {
                const session = data.sessionsWithDay.find(session => session.day === weekDay);
                return session ? (parseFloat(session.average_duration_seconds)/60) : averages[index];
            });
            setWeekRange(`${data.startOfWeek} - ${data.endOfWeek}`);
            setAverages(updatedAverages);
            setSessionsPerWeek(data);
            console.log("DASHBOARD",data)
        } catch (error) {
            console.error('Error fetching session statistics:', error);
        } finally {
            setIsLoading(false);
        }
    }, [GetSessionStatistics]);

    useEffect(() => {
        loadSessionStatistics(currentPage);
    }, [currentPage, loadSessionStatistics]);

    const memoizedGoToNextPage = useMemo(() => {
        return () => {
            setCurrentPage(prevPage => prevPage + 1);
        };
    }, []);

    const memoizedGoToPrevPage = useMemo(() => {
        return () => {
            setCurrentPage(prevPage => (prevPage > 0 ? prevPage - 1 : 0));
        };
    }, []);

    return {
        isLoading,
        sessionsPerWeek,
        goToNextPage: memoizedGoToNextPage,
        goToPrevPage: memoizedGoToPrevPage,
        weekDaysSimplify,
        averages,
        weekRange
    };
};
