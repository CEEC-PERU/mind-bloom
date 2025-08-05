import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavigationProp } from '@react-navigation/native';
import {
  DocumentType,
  ProfileRequest,
} from '../../../../interfaces/UserInterfaces';
import {
  ProfileInput,
  CustomButton,
  CustomAccordionList,
  CustomImagePicker,
} from '../../../../components';
import { useProfile } from './hooks/useProfile';
import { PostProfile } from '../../../../services/profile.service';
import { useAuth } from '../../../../context/AuthContext';
import { PostImage } from '../../../../services/image.service';
import { GetProfile } from '../../../../services/profile.service';

// Este componente maneja ambos: registro/actualización y visualización del perfil en 1 solo archivo.

type Props = {
  navigation: NavigationProp<any>;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { userInfo } = useAuth();
  const user = userInfo as { id: number; email: string };
  const { documentTypes, error, loading, profile } = useProfile(user.id);

  // Estado para guardar el perfil actualizado
  const [profileData, setProfileData] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { control, handleSubmit } = useForm<ProfileRequest>();
  const [selectedDocumentType, setSelectedDocumentType] =
    useState<DocumentType | null>(null);
  const [selectedImage, setSelectedImage] = useState('');

  // Mostrar en consola todo lo relevante para debug
  React.useEffect(() => {
    console.log('documentTypes:', documentTypes);
    console.log('error:', error);
    console.log('loading:', loading);
    console.log('profile:', profile);
    console.log('profileData:', profileData);
  }, [documentTypes, error, loading, profile, profileData]);

  // Lógica de qué datos mostrar
  const getProfileInfo = () => {
    // Si hay profileData (datos actualizados), usar esos
    if (profileData) {
      return {
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        document_number: profileData.document_number,
        phone: profileData.phone,
        profile_picture: profileData.profile_picture,
      };
    }

    // Si no hay profileData pero hay profile con estructura Profile, usar esos
    if (profile && profile.Profile) {
      return {
        first_name: profile.Profile.first_name,
        last_name: profile.Profile.last_name,
        document_number: profile.Profile.document_number,
        phone: profile.Profile.phone,
        profile_picture: profile.Profile.profile_picture,
      };
    }

    // Si no hay datos en ninguno, retornar null
    return null;
  };

  const profileInfo = getProfileInfo();

  // Validación de perfil completo
  const isProfileComplete =
    profileInfo &&
    profileInfo.first_name &&
    profileInfo.last_name &&
    profileInfo.document_number &&
    profileInfo.phone;

  // Si el usuario ya tiene perfil completo, mostrar resumen
  if ((showSummary || isProfileComplete) && profileInfo) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.welcomeText}>Mi Perfil</Text>
            <Text style={styles.subtitleText}>Información Personal</Text>
          </View>

          {/* Profile Image Section */}
          <View style={styles.profileImageSection}>
            <View style={styles.imageContainer}>
              <CustomImagePicker
                onImageSelected={setSelectedImage}
                image_type="profile"
                image_uri={profileInfo.profile_picture as any}
              />
            </View>
          </View>

          {/* Profile Information Card */}
          <View style={styles.profileCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Información del Usuario</Text>
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Nombre Completo</Text>
                </View>
                <Text style={styles.value}>
                  {profileInfo.first_name} {profileInfo.last_name}
                </Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.infoRow}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Correo Electrónico</Text>
                </View>
                <Text style={styles.value}>{user.email}</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.infoRow}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Documento de Identidad</Text>
                </View>
                <Text style={styles.value}>{profileInfo.document_number}</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.infoRow}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Teléfono</Text>
                </View>
                <Text style={styles.value}>{profileInfo.phone}</Text>
              </View>
            </View>

            {/* Edit Button */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Formulario para registro/actualización de perfil
  const onCreateProfilePressed: SubmitHandler<ProfileRequest> = async (
    data
  ) => {
    setIsSaving(true);
    try {
      let imageUrl = profileInfo?.profile_picture;
      if (selectedImage !== '') {
        const formData = new FormData();
        formData.append('image', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        } as any);
        const response_img = await PostImage(formData);
        if (response_img) {
          imageUrl = response_img.imageUrl;
        }
      }
      const dataForm: ProfileRequest = {
        first_name: data.first_name,
        last_name: data.last_name,
        document_id: selectedDocumentType?.document_id ?? 1,
        document_number: data.document_number,
        phone: data.phone,
        profile_picture: imageUrl,
      };

      const savedProfile = await PostProfile(user.id, dataForm);
      if (savedProfile) {
        // Obtener el perfil actualizado
        const updatedProfile = await GetProfile(user.id);
        console.log('Perfil actualizado:', updatedProfile);
        setProfileData(updatedProfile);
        Alert.alert('Éxito', 'Perfil actualizado correctamente', [
          {
            text: 'OK',
            onPress: () => {
              setShowSummary(true);
            },
          },
        ]);
      }
    } catch (error) {
      console.error('Error al procesar el perfil:', error);
      Alert.alert(
        'Error',
        'Hubo un problema al actualizar el perfil. Por favor, inténtalo de nuevo.'
      );
    }
    setIsSaving(false);
  };

  if (loading || isSaving) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4951FF" />
        <Text style={styles.loadingText}>
          {isSaving ? 'Guardando perfil...' : 'Cargando...'}
        </Text>
      </View>
    );
  }

  // Mostrar formulario solo si no hay datos completos en ninguno de los dos
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.formContainer}>
        {/* Header */}
        <View style={styles.formHeader}>
          <Text style={styles.formTitle}>Completa tu Perfil</Text>
          <Text style={styles.formSubtitle}>
            Ingresa tu información personal para continuar
          </Text>
        </View>

        {/* Profile Image */}
        <View style={styles.formImageContainer}>
          <CustomImagePicker
            onImageSelected={setSelectedImage}
            image_type="profile"
            image_uri={profileInfo?.profile_picture as any}
          />
        </View>

        {/* Form Fields */}
        <View style={styles.formFields}>
          <View style={styles.emailDisplay}>
            <Text style={styles.emailLabel}>Correo Electrónico</Text>
            <Text style={styles.emailValue}>
              {profile?.email || user.email}
            </Text>
          </View>

          <ProfileInput
            inputType="text"
            label="Nombre"
            control={control}
            name="first_name"
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
              maxLength: {
                value: 50,
                message: 'Máximo 50 caracteres',
              },
            }}
          />

          <ProfileInput
            inputType="text"
            label="Apellido"
            control={control}
            name="last_name"
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
              maxLength: {
                value: 50,
                message: 'Máximo 50 caracteres',
              },
            }}
          />

          <CustomAccordionList
            title="Tipo de documento de identidad"
            documentTypes={documentTypes}
            selectedItem={selectedDocumentType!}
            onSelect={setSelectedDocumentType}
          />

          <ProfileInput
            inputType="number"
            label="Número de Documento"
            control={control}
            name="document_number"
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
              minLength: {
                value: 8,
                message: 'Mínimo 8 dígitos',
              },
            }}
          />

          <ProfileInput
            inputType="number"
            label="Teléfono móvil"
            control={control}
            name="phone"
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
              minLength: {
                value: 9,
                message: 'Mínimo 9 dígitos',
              },
            }}
          />

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <CustomButton
            text="Guardar Perfil"
            onPress={handleSubmit(onCreateProfilePressed)}
            disabled={loading || isSaving}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4951FF',
    fontWeight: '500',
  },

  // Header Section
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1D29',
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },

  // Profile Image Section
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  imageContainer: {
    borderWidth: 4,
    borderColor: '#4951FF',
    borderRadius: 75,
    padding: 6,
    backgroundColor: '#FFFFFF',
    shadowColor: '#4951FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  // Profile Card
  profileCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#4951FF',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  infoRow: {
    paddingVertical: 12,
  },
  labelContainer: {
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#1A1D29',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  editButton: {
    backgroundColor: '#4951FF',
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Form Styles
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formHeader: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1D29',
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  formImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formFields: {
    marginBottom: 30,
  },
  emailDisplay: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  emailValue: {
    fontSize: 16,
    color: '#4951FF',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
    marginTop: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '500',
  },
  submitContainer: {
    marginBottom: 30,
  },
});

export default ProfileScreen;
