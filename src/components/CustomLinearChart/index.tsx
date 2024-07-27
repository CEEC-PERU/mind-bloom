import { View, TouchableOpacity, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { styles } from './styles';
import { windowWidth } from '../../utils/Dimentions';
import Subtitle from '../Subtitle';
import { Icon } from 'react-native-paper'
import LoadIndicator from '../LoadIndicator';

interface Props {
    readonly data: number[],
    readonly labels: string[],
    readonly goToPrevPage: () => void,
    readonly goToNextPage: () => void,
    readonly weekRange: string,
    readonly isLoading: boolean
}

export default function CustomLinearChart({ data, labels, goToNextPage, goToPrevPage, weekRange, isLoading }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Subtitle text='Tiempo dedicado' />
            </View>
            <View style={styles.containerChart}>
                <LineChart
                    data={{
                        labels,
                        datasets: [{ data }]
                    }}
                    width={windowWidth - windowWidth * 0.1}
                    height={220}
                    fromZero
                    yAxisSuffix=" min"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#FFFFFF",
                        backgroundGradientFrom: "#FFFFFF",
                        backgroundGradientTo: "#FFFFFF",
                        backgroundGradientFromOpacity: 0.8,
                        backgroundGradientToOpacity: 0.5,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(73, 81, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#4951FF"
                        }
                    }}
                    bezier
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={goToNextPage}>
                        
                        <Icon source={"arrow-left-drop-circle"} size={30} color='#4951FF' />
                    </TouchableOpacity>
                    <Text style={styles.label}>Anterior</Text>
                </View>
                {isLoading ?
                    <LoadIndicator size='small' animating /> :
                    <Text style={styles.date}>{weekRange}</Text>
                }
                <View style={styles.button}>
                    <TouchableOpacity onPress={goToPrevPage}>
                        <Icon source={"arrow-right-drop-circle"} size={30} color='#4951FF' />
                    </TouchableOpacity>
                    <Text style={styles.label}>Siguiente</Text>
                </View>
            </View>
        </View>
    )
}
