import { Alert, StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { windowHeight } from '../../../../utils/Dimentions';
import { LoadIndicator, CourseInput, CustomButton } from '../../../../components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Campaign } from '../../../../interfaces/UserInterfaces';
import { rules } from '../../../../utils/Rules';
import { PostCampaign } from '../../../../services/campaign.service';
import DateTimePicker from '@react-native-community/datetimepicker';
import { style } from './style';
type Props = {
    readonly navigation: NativeStackNavigationProp<RootStackParamListAdmin, 'CreateCampaign'>;
};

export default function CreateCampaign({ navigation }: Props) {
    const { control, handleSubmit, setValue } = useForm<{ limit_date: Date, description: string, name: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const [fecha, setFecha] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onSubmit: SubmitHandler<{ name: string, description: string, limit_date: Date }> = async (data) => {
        try {
            setIsLoading(true); // Start loading indicator
            
            const campaigns: Campaign = {
                name: data.name,
                description: data.description,
                limit_date: data.limit_date,
            }

            console.log(campaigns); // Check if campaigns are correctly populated

            const response = await PostCampaign(campaigns);

            if (response) {
                Alert.alert("ÉXITO", "Campaña creada con éxito");
                setValue("name", "");
                setValue("description", "");
            } else {
                Alert.alert("ERROR", "No se pudo crear la campaña. Por favor, inténtalo más tarde");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("ERROR", "Ha ocurrido un error. Por favor, inténtalo más tarde");
        } finally {
            setIsLoading(false); // Stop loading indicator
        }
    }

    const handleDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || fecha;
        setShowDatePicker(false);
        setFecha(currentDate);
        setValue('limit_date', currentDate);
    };

    return (
        <View>
            {/* Header */}
            <View style={{ height: windowHeight * 0.09, display: "flex", backgroundColor: "#fff", padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>Crea Campaña</Text>
            </View>

            {/* Loading indicator or form */}
            {isLoading ? (
                <View style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.70 }}>
                    <LoadIndicator animating size='large' />
                </View>
            ) : (
                <ScrollView style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.65 }}>
                    <CourseInput control={control} label='Nombre de Campaña' name='name' inputType='text' rules={rules} />
                    <CourseInput control={control} label='Descripción' name='description' inputType='text' rules={rules} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginRight: 10 }}>Fecha Límite:</Text>
                        <Text style={{ marginRight: 10 }}>{fecha.toLocaleDateString()}</Text>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Image source={{ uri: 'https://res.cloudinary.com/dhfsbbos3/image/upload/v1716784637/mlcp92z0rqi67oki58po.png' }} style={{ width: 24, height: 24 , borderColor: '#4951FF',}} />
                        </TouchableOpacity>
                    </View>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={fecha}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                </ScrollView>
            )}

            {/* Submit Button */}
            <View style={{ padding: 20, display: "flex", backgroundColor: "#fff" }}>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={style.button}
                >
                    <Text style={style.buttonText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

