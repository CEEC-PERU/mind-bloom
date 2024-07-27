import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { UserNoAsignado} from '../../interfaces/CampaignInterface';
import { Icon } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CardStudentType = "course" | "user" | "add-to-course" | "users";

interface Props {
    readonly cardType: CardStudentType;
    readonly student: UserNoAsignado;
    readonly addStudent?: (student: UserNoAsignado) => boolean;
}

export default function CardStudent({ cardType, student, addStudent }: Props) {
    const imageSource = student.Profile?.profile_picture
        ? { uri: student.Profile.profile_picture }
        : require('../../../assets/images/perfil.png');
    const fullName = student.Profile ? student.Profile?.first_name + " " + student.Profile?.last_name : "Estudiante";
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        const added = addStudent!(student);
        setIsSelected(added);
    }

    const action = () => {
        if (cardType === "add-to-course") {
            return (
                <TouchableOpacity onPress={handleSelect}>
                    {isSelected ?
                        <Icon size={30} source={"check-circle"} color='#4951FF' /> :
                        <Icon size={30} source={"check-circle-outline"} color='#4951FF' />
                    }
                </TouchableOpacity>
            )
        }
    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 15, }}>
            <View style={{ width: cardType === "users" ? 65 : 55, height:  cardType === "users" ? 65 : 55, borderRadius: 100 / 2, marginRight: 10 }}>
                <Image
                    source={imageSource}
                    style={{ width: '100%', height: '100%', borderRadius: 100 / 2 }}
                />
            </View>
            <View style={{ flex: 1, paddingRight: 10, rowGap: 5, overflow: "hidden" }}>
                <Text style={{ fontWeight: '500', fontSize: 15 }}>{fullName}</Text>
                <Text style={{ fontSize: 15, color: '#A4A4A4', }}>{student.email}</Text>
                {/* {cardType === "users" &&
                    <Text style={{ fontSize: 13, color: '#A4A4A4', }}>{(student as UserWithRole).Role.description}</Text>
            } */}
            </View>

            <View style={{}}>{action()}</View>
        </View>
    );
}
