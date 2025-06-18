import React, { useState } from 'react';
import { Text, SafeAreaView, ScrollView, View, Alert } from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamListAdmin } from '../../../../interfaces/NavigationInterfaces';
import { styles } from './styles';
import { DocumentType, ProfileRequest } from '../../../../interfaces/UserInterfaces';
import { ProfileInput, CustomButton, CustomAccordionList, LoadIndicator, CustomImagePicker } from '../../../../components';
import { useProfile } from './hooks/useProfile';
import { PostProfile, PutProfile } from '../../../../services/profile.service';
import { useAuth } from '../../../../context/AuthContext';
import { PostImage } from '../../../../services/image.service';
import { GetProfile } from "../../../../services/profile.service";
import { Icon } from 'react-native-paper';

//actualizar para que al enviar el registro , volver a actualizar o el perfil para que no aparezaca el formulario
// tengo que salir y volver a ingresar a la app para que reconozca el perfil

export type Props = {
    readonly navigation: NavigationProp<RootStackParamListAdmin, 'Dashboard'>;
};

const ProfileScreen : React.FC<{ navigation: NavigationProp<any> }> = ({ navigation }) => {
    const { userInfo } = useAuth();
    const user = userInfo as { id: number };
    const { documentTypes, error, loading, profile } = useProfile(user.id);
    const { control, handleSubmit } = useForm<ProfileRequest>();
    const [selectedDocumentType, setSelectedDocumentType] = React.useState<DocumentType | null>(null);
    const [selectedImage, setSelectedImage] = useState("");
    if (loading) {
        return <LoadIndicator animating={true} size='large' />
    }
    const onCreateProfilePressed: SubmitHandler<ProfileRequest> = async (data) => {
        try {
            if (selectedImage !== "") {
                const formData = new FormData();
                formData.append('image', {
                    uri: selectedImage,
                    type: 'image/jpeg',
                    name: 'image.jpg'
                } as any);
                const response_img = await PostImage(formData);
                if (response_img) {
                    const dataForm: ProfileRequest = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        document_id: selectedDocumentType!.document_id,
                        document_number: data.document_number,
                        phone: data.phone,
                        profile_picture: response_img.imageUrl
                    };
                    const savedProfile = await PostProfile(user.id, dataForm);
                    if (savedProfile) {
                        Alert.alert("Éxito", `Perfil actualizado correctamente`);
                        
                         Alert.alert("Éxito", "Perfil actualizado correctamente", [
                        {
                            text: "OK",
                            onPress: async () => {
                                // Opción 1: Recargar los datos del perfil
                                const updatedProfile = await GetProfile(user.id);
                                if (updatedProfile) {
                                  
                                    
                                    // Opción 2: Navegar a la vista de perfil
                                    navigation.navigate('ShowProfile');
                                    
                                   
                                }
                            }
                        }
 ]);

                    }
                }
            }

        } catch (error) {
            console.error('Error al procesar el inicio de sesión:', error);
            alert('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };

    const handleDocumentTypeSelect = (selectedType: DocumentType = { document_id: 1, name: "DNI" }) => {
        setSelectedDocumentType(selectedType);
    };

    const handleImageSelected = (image: string) => {
        setSelectedImage(image);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <Text style={styles.h1}>PERFIL</Text>
                <View style={styles.image_container}>
                    <CustomImagePicker onImageSelected={handleImageSelected} image_type='profile' image_uri={profile && profile.Profile?.profile_picture as any} />
                </View>
                <View>
                    <View style={styles.email}>
                        <Text style={styles.email_text}>{profile?.email}</Text>
                    </View>
                    <ProfileInput
                        inputType='text'
                        label="Nombre"
                        control={control}
                        name="first_name"
                        rules={{
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            },
                            maxLength: {
                                value: 15,
                                message: 'La longitud de la entrada es muy corta'
                            },
                        }}
                    />
                    <ProfileInput
                        inputType="text"
                        label="Apellido"
                        control={control}
                        name="last_name"
                        rules={{
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            },
                            maxLength: {
                                value: 15,
                                message: 'La longitud de la entrada es muy corta'
                            },
                        }}
                    />
                    <CustomAccordionList
                        title='Tipo de documento de identidad'
                        documentTypes={documentTypes}
                        selectedItem={selectedDocumentType!}
                        onSelect={(documentType) => {
                            handleDocumentTypeSelect(documentType);
                        }}
                    />
                    <ProfileInput
                        inputType='number'
                        label="Número de Documento"
                        control={control}
                        name="document_number"
                        rules={{
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            },
                            maxLength: {
                                value: 8,
                                message: 'La longitud de la entrada es muy corta'
                            },
                        }}
                    />
                    <ProfileInput
                        inputType='number'
                        label="Teléfono móvil"
                        control={control}
                        name="phone"
                        rules={{
                            required: {
                                value: true,
                                message: 'Este campo es obligatorio'
                            },
                            maxLength: {
                                value: 9,
                                message: 'La longitud de la entrada es muy corta'
                            },
                        }}
                    />
                    {error && <Text style={{ color: 'red', fontWeight: '400' }}>{error}</Text>}
                </View>
                <CustomButton
                    text="Guardar Cambios"
                    onPress={handleSubmit(onCreateProfilePressed)}
                    disabled={loading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
