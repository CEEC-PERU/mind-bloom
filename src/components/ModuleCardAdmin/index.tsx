import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Module } from '../../interfaces/CourseInterfaces';
import { styles } from './styles';
import { Icon } from 'react-native-paper';

interface Props {
    readonly name: string
    readonly is_active: boolean
    readonly contentName: number
    readonly Evaluation: Module
    readonly created_at: Date
}

export default function ModuleCardAdmin({ name, is_active, contentName, Evaluation, created_at }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.date}>{created_at?.toLocaleString().substring(0, 10)}</Text>
                    <Text style={styles.time}>{created_at?.toLocaleString().substring(11, 16)}</Text>
                </View>
                <View>
                    <View style={styles.counter}>
                        <Text style={styles.number}>{contentName}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardBody}>
                <Text numberOfLines={2} style={styles.name}>{name}</Text>
                <View style={styles.contentBody}>
                    <Icon source={"book"} size={20} color='#4951FF'></Icon>
                    <Text numberOfLines={3} style={styles.evaluation}>Evaluación</Text>
                </View>
                <Text style={styles.nameEvaluation}>{Evaluation?.contentName}</Text>
            </View>
            <TouchableOpacity style={styles.cardFooter} >
                <Text style={styles.link}>VER MÁS DETALLES</Text>
                <Icon size={25} source={'chevron-right'} color='#4951FF' />
            </TouchableOpacity>
        </View>
    )
}

