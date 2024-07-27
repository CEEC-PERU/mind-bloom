import { StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { windowWidth } from '../../utils/Dimentions';
import { ProgressChartData } from 'react-native-chart-kit/dist/ProgressChart';

export interface Props {
    readonly data: number[][];
}


export default function CustomProgressChart({ data }: Props) {
    const chartData: ProgressChartData = {
      data: data.map((item) => item.reduce((acc, val) => acc + val, 0) / item.length),
      labels: ["Test1", "Test2"],
      colors: ["#F48888",  "#F4C988", "#4951FF"],
    };
  
    return (
      <ProgressChart
        data={chartData}
        width={windowWidth * 0.45}
        height={windowWidth * 0.45}
        strokeWidth={10}
        radius={18}
        hideLegend
        withCustomBarColorFromData
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          backgroundGradientFromOpacity: 0.8,
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 0.5) => `rgba(73, 81, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(150, 150, 150, ${opacity})`,
        }}
      />
    );
  }

const styles = StyleSheet.create({})