import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserNoAsignado } from '../../interfaces/CampaignInterface'

interface Props {
    readonly student:UserNoAsignado
}

export default function MiniCardStudenthola({ student }: Props) {
    const imageSource = student.Profile?.profile_picture
        ? { uri: student.Profile.profile_picture }
        : require('../../../assets/images/perfil.png');
    const nameStudent = student.Profile ? student.Profile?.first_name : student.email;
    return (
        <View>
            <View style={{ width: 70, height: 70 }}>
                <Image
                    source={imageSource}
                    style={{ width: '100%', height: '100%', borderRadius: 25 }}
                />
            </View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ textAlign: "center", maxWidth: 70 }}>{nameStudent}</Text>
        </View>

    )
}

const styles = StyleSheet.create({})