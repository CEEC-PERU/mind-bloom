import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { windowHeight } from '../../../../utils/Dimentions'
import { CustomButton, CourseInput, LoadIndicator } from '../../../../components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RadioButton } from 'react-native-paper'
import { UserRequest } from '../../../../interfaces/UserInterfaces'
import { rules } from '../../../../utils/Rules'
import { PostNewUser } from '../../../../services/user.service'
import { useAuth } from '../../../../context/AuthContext';
export default function CreateUser() {
    const { profileInfo, userInfo } = useAuth();
    const info = userInfo as { client_id: number };
    const { control, handleSubmit, setValue } = useForm<{ password: string, repeat_password: string, email: string }>();
    const [selectedRole, setSelectedRole] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [match, setMatch] = useState(true);
    // const [selectedAccountType, setselectedAccountType] = useState();
    const onSubmit: SubmitHandler<{ password: string, repeat_password: string, email: string }> = async (data) => {
        try {
            setIsLoading(true);
            if (data.password !== data.repeat_password) {
                setMatch(false);
            } else {
                setMatch(true);
                const user: UserRequest = {
                    email: data.email,
                    password: data.password,
                    role_id: selectedRole,
                    client_id : info.client_id
                }
                const response = await PostNewUser(user);
                if (response) {
                    Alert.alert("ÉXITO", "Usuario creado con éxito");
                    setValue("email", "");
                    setValue("password", "");
                    setValue("repeat_password", "");
                    setSelectedRole(1)
                    return;
                } else {
                    Alert.alert("ERROR", "No se pudo crear el usuario, intentalo más tarde");
                    return;
                }
            }
        } catch (error) {
            console.error(error);
            throw error
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <View>
            <View style={{ height: windowHeight * 0.09, display: "flex", backgroundColor: "#fff", padding: 20 }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#333',
                }}>Nuevo usuario</Text>
                <Text style={{ fontSize: 15, fontWeight: '300' }}>Crea Estudiantes</Text>
            </View>
            {isLoading ? <View style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.70 }}><LoadIndicator animating size='large' /></View> :
                <ScrollView style={{ display: "flex", backgroundColor: "#fff", padding: 20, height: windowHeight * 0.70 }}>
                    <CourseInput control={control} label='Email' name='email' inputType='email' rules={rules} />
                    <CourseInput control={control} label='Contraseña' name='password' inputType='password' rules={rules} />
                    {!match && <Text style={{ color: 'red', fontSize: 12 }}>Las contrasenias no coinciden</Text>}
                    <CourseInput control={control} label='Repetir contraseña' name='repeat_password' inputType='password' rules={rules} />
                    {!match && <Text style={{ color: 'red', fontSize: 12 }}>Las contrasenias no coinciden</Text>}
                    <View style={{ marginVertical: 25 }}>
                        <Text style={{ fontSize: 15, marginLeft: 15, color: "#2B32CE" }}>Tipo de usuario</Text>
                        <RadioButton.Group onValueChange={value => setSelectedRole(parseInt(value))} value={selectedRole.toString()}>
                            <RadioButton.Item label="Estudiante" value="1" />
                        </RadioButton.Group>
                    </View>
                    {/* <View>
                <Text style={{ fontSize: 15, marginLeft: 15, color: "#2B32CE" }}>Tipo de cuenta</Text>
                <RadioButton.Group onValueChange={value => { }} value={"permanent"}>
                    <RadioButton.Item label="Permanente" value="permanent" />
                    <RadioButton.Item label="Por duración de curso" value="course-duration" />
                </RadioButton.Group>
            </View> */}
                </ScrollView>}
            <View style={{ padding: 20, display: "flex", backgroundColor: "#fff" }}>
                <CustomButton disabled={isLoading} onPress={handleSubmit(onSubmit)} text='Crear usuario' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})