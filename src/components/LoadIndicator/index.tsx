import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Props {
    readonly animating: boolean,
    readonly size: 'small' | 'large'
}

export default function LoadIndicator({ animating, size }: Props) {
    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ActivityIndicator animating={animating} size={size} color={'#2B32CE'}/>
        </View>
    )
}
