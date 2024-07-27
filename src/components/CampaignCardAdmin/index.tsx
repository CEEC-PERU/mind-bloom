import { Text, View } from 'react-native';
import { styles } from './styles';
import CustomButtonGroup from '../CustomButtonGroup';
interface Props {
    readonly moduleCount: number;
    readonly courseName: string;
    readonly createdAt: Date;
    readonly userCount: number;
    readonly courseId: number;
    readonly background_color: string;
    readonly navigateToCreateModule: (courseId: number) => void
    readonly navigateToAddStudents: (courseId: number) => void
    readonly navigateToStudentsPerCourse: (courseId: number) => void
}
export default function CampaignCardAdmin({ moduleCount, courseName, createdAt, userCount, courseId, navigateToCreateModule, navigateToAddStudents, navigateToStudentsPerCourse, background_color }: Props) {
    const dateObject = new Date(createdAt);

    return (
        <View style={[styles.container, { borderLeftColor: background_color ?? "#4951FF" }]}>
            <View style={styles.rightContainer}>
                <Text numberOfLines={2} style={styles.name}>{courseName}</Text>
                <Text style={styles.label}>{dateObject.toLocaleDateString()}</Text>
            </View>
            <View style={styles.leftContainer}>
              
               
            </View>
        </View>
    )
}
