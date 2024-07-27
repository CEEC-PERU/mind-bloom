import { Text, View } from 'react-native';
import { styles } from './styles';
import CustomButtonGroup from '../CustomButtonGroup';

interface Props {
    readonly moduleCount: number;
    readonly courseName: string;
    readonly campaign_id: number;
    readonly background_color: string;
    readonly navigateToCreateModule: (campaign_id: number) => void

}

export default function CampaignCardAdminUser({ moduleCount, courseName,  campaign_id, navigateToCreateModule, background_color }: Props) {
  

    return (
        <View style={[styles.container, { borderLeftColor: background_color ?? "#4951FF" }]}>
            <View style={styles.rightContainer}>
                <Text numberOfLines={2} style={styles.name}>{courseName}</Text>
            </View>
            <View style={styles.leftContainer}>
               
                <CustomButtonGroup
                    courseId={campaign_id}
                    label={`${moduleCount} usuario${moduleCount > 1 ? 's' : ''}`}
                    textButton='Agregar'
                    type='module'
                    navigateToAdd={navigateToCreateModule}
                    navigateToCheck={() => { }}
                />
            </View>
        </View>
    )
}
