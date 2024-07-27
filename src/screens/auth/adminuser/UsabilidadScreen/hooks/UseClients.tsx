import { useEffect, useState, useMemo, useCallback } from 'react';
import { GetSessionStatisticsByClient } from '../../../../../services/statistics.service';
import {UserSessionStatistics } from '../../../../../interfaces/StatisticsInterface';
import { useAuth } from '../../../../../context/AuthContext';
export const useSessionStatistics = (client_id : number) => {
    const [isLoading, setIsLoading] = useState(true);
    const [sessionsPerMonth, setSessionsPerMonth] = useState<UserSessionStatistics[]>([]);
    
    const [sessionsPerMont, setSessionsPerMont] = useState<String>();
    const [startOfMonth, setStartOfMonth] = useState<String>();
    const [endOfMonth, setEndOfMonth] = useState<String>();
    const [currentPage, setCurrentPage] = useState(0);
    const [averages, setAverages] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [weekRange, setWeekRange] = useState("");
    const weekDays = ["eE", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const weekDaysSimplify = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const { userInfo, userToken } = useAuth();
    const months = [
        `Enero ${currentYear}`,
        `Febrero ${currentYear}`,
        `Marzo ${currentYear}`,
        `Abril ${currentYear}`,
        `Mayo ${currentYear}`,
        `Junio ${currentYear}`,
        `Julio ${currentYear}`,
        `Agosto ${currentYear}`,
        `Septiembre ${currentYear}`,
        `Octubre ${currentYear}`,
        `Noviembre ${currentYear}`,
        `Diciembre ${currentYear}`
    ];
    
      const monthsAbbreviated = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ];
      //modificar para que sea en este api 
    const loadSessionStatistics = useCallback(async (page: number ) => {
        setIsLoading(true);
        try {
            if (userToken) {
            const data = await GetSessionStatisticsByClient(page , client_id , userToken);
          
            if (data === null) {
                
                setSessionsPerMonth([]); 
              } else if (Array.isArray(data)) {
              console.log(data)
const formattedDataJSON = JSON.stringify(data);
const formattedData = JSON.parse(formattedDataJSON);

console.log("FormattedData",formattedDataJSON)

// Ahora 'formattedData' contiene los datos procesados y los objetos anidados se mostrarán correctamente

                const updatedAverages = months.map((month, index) => {
                    const session = data.sessionsWithMonths && data.sessionsWithMonths.find(session => session.monthYear === month);
                    return session ? (parseFloat(session.total_duration_minutes)) : averages[index];
                });
                console.log("updatedaverages",updatedAverages)
               
                for (const item of formattedData) {
                    console.log("Client ID:", item.client_id);
                    console.log("Email:", item.email);
                    console.log("Start of Month:", item.startOfMonth);
                    console.log("End of Month:", item.endOfMonth);
                    setStartOfMonth(item.startOfMonth )
                    setEndOfMonth(item.endOfMonth )
                    setWeekRange(`${item.startOfMonth} - ${item.endOfMonth}`);
                    console.log("weekRange",weekRange)
                    // Si hay más propiedades que deseas acceder, simplemente continúa accediendo a ellas aquí
                }
               
             
                setAverages(updatedAverages);
                setSessionsPerMonth(Array.isArray(data) ? data : [data].filter(Boolean));
               
          
              } else {
                const updatedAverages = months.map((month, index) => {
                    const session = data.sessionsWithMonths && data.sessionsWithMonths.find(session => session.monthYear === month);
                    return session ? (parseFloat(session.total_duration_minutes)) : averages[index];
                });
                setWeekRange(`${data.startOfMonth} - ${data.endOfMonth}`);

                setStartOfMonth(data.startOfMonth)
            
                setAverages(updatedAverages);
                setSessionsPerMonth(Array.isArray(data) ? data : [data].filter(Boolean));
               
               
        
              }
        
        }
        
        } catch (error) {
            console.error('Error fetching session statistics:', error);
        } finally {
            setIsLoading(false);
        }
    }, [GetSessionStatisticsByClient]);

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
        startOfMonth,
        isLoading,
        sessionsPerMonth,
        goToNextPage:  memoizedGoToNextPage ,
        goToPrevPage: memoizedGoToPrevPage,
        weekDaysSimplify,
        averages,
        sessionsPerMont,
        weekRange,
        setSessionsPerMont,
     endOfMonth
    };
};
