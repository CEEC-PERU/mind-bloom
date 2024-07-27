import { View } from 'react-native';
import { styles } from './styles';
import CircularProgress from 'react-native-circular-progress-indicator';

interface Props {
    readonly value: number,
    readonly inActiveStrokeColor: string,
}

export default function CustomCircularProgress({ value = 0, inActiveStrokeColor }: Props) {
    return (
        <View style={styles.container}>
            <CircularProgress
                value={value}
                inActiveStrokeColor={inActiveStrokeColor}
                activeStrokeColor='#2A61F0'
                inActiveStrokeOpacity={0.2}
                progressValueColor={'#000'}
                valueSuffix={'%'}
            />
        </View>
    )
}

