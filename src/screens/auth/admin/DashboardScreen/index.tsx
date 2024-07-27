import { View, ScrollView } from 'react-native';
import { styles } from './styles';
import { LoadIndicator, CardCircularProgress, CustomLinearChart, HeaderDashboard, CustomProgressChart } from '../../../../components';
//import { CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { useActiveUsers } from './hooks/useBasicStatistics';
import { useSessionStatistics } from './hooks/useTimeDedicated';
import CustomCircularProgress from '../../../../components/CustomCircularProgress';

type Props = {
  readonly navigation: NativeStackNavigationProp<RootStackParamListAdmin, 'Details'>;
};

export default function DashboarScreen({ navigation }: Props) {
 const { activeUsers, /*isLoading: isLoadingUsers,*/ basicStatistics  } = useActiveUsers();
  const { isLoading: isLoadingSessions, averages, weekDaysSimplify, goToNextPage, goToPrevPage, weekRange } = useSessionStatistics();
  const { total , actives } = activeUsers;
  
  const porcentaje = total ? (actives! / total) * 100 : 0;
  const formatPercentage = (value: number | undefined): string => {
    return isNaN(value!) ? '0' : value!.toString();
  };
   
/*
  if (isLoadingSessions || isLoadingUsers) {
    return <LoadIndicator animating={true} size='large' />
  }
  */
  /**const navigateToDetailScreen = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Details',
        params: {
          itemId: 2,
        },
      })
    );
  };**/


  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <HeaderDashboard nStudents={total!} />
      </View>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <CardCircularProgress
            title='Tasa de Conectividad'
            leyend={[
              { text: `${actives!} activos`, color: "#4951FF" },
              { text: `${total! - actives!} inactivos`, color: "#616161" }
            ]}
          >
            <CustomCircularProgress
              value={Math.round(porcentaje!)}
              inActiveStrokeColor={"#4951FF"}
            />
          </CardCircularProgress>
          
        

<CardCircularProgress
  title='Estado total'
  leyend={[
    { text: `${formatPercentage(basicStatistics?.approvedPercentage)}% aprobados`, color: "#4951FF" },
    { text: `${formatPercentage(basicStatistics?.inProgressPercentage)}% en progreso`, color: "#FFB648" },
    { text: `${formatPercentage(basicStatistics?.disapprovedPercentage)}% desaprobados`, color: "#DB6868" }
  ]}
>

            <CustomProgressChart data={[
              [10 /100],
              [80 /100],
              [10 /100],
              /*    [basicStatistics!.disapprovedPercentage / 100],
              [basicStatistics!.inProgressPercentage / 100],
              [basicStatistics!.approvedPercentage / 100], */
            ]} />


          </CardCircularProgress>
        </View>
      </View>
      <View style={styles.container}>
        <CustomLinearChart
          weekRange={weekRange}
          data={averages}
          labels={weekDaysSimplify}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          isLoading={isLoadingSessions}
        />
      </View>
    </ScrollView>
  );
}
