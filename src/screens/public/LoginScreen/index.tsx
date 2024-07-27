import { View, Text, Image, ImageBackground, SafeAreaView,Modal, KeyboardAvoidingView, Platform , TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../interfaces/NavigationInterfaces';
import { styles } from './styles';
import { AuthInput, CustomButton } from '../../../components';
import Ebook from '../../../../assets/images/login/user.png';
import Logo from '../../../../assets/images/login/l_logoprincipal.png';
import { useAuth } from '../../../context/AuthContext';
import { LoginRequest } from '../../../interfaces/UserInterfaces';
import { ScrollView } from 'react-native-gesture-handler';
import backgroundImage from '../../../../assets/images/login/fondo.png';

export type Props = {
  readonly navigation: NavigationProp<RootStackParamList, 'Login'>;
};


const LoginScreen = () => {
  const { control, handleSubmit } = useForm<LoginRequest>();
  const { onLogin, isLoading, error } = useAuth();
  const [modalVisible, setModalVisible] = useState(true);
  const onLoginPressed: SubmitHandler<LoginRequest> = async (data) => {
    try {
      const dataForm = { email: data.email.toLowerCase(), password: data.password };
      await onLogin?.(dataForm.email, dataForm.password);
    } catch (error) {
      console.error('Error al procesar el inicio de sesión:', error);
      alert('Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };
  const handleAcceptTerms = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      >

<Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Términos y Condiciones</Text>
              <ScrollView style={styles.modalScroll}>
          
      <Text style={styles.paragraph}>
        Estos términos y condiciones rigen el uso de la aplicación educativa Mind Bloom . Al usar la Aplicación, aceptas cumplir con estos Términos.
      </Text>
      
      <Text style={styles.subTitle}>1. Uso de la Aplicación</Text>
      <Text style={styles.paragraph}>
        La Aplicación está destinada únicamente para uso educativo personal. No puedes usar la Aplicación para ningún propósito comercial ni distribuir el contenido de la Aplicación sin nuestro permiso .
      </Text>
      
      <Text style={styles.subTitle}>2. Propiedad Intelectual</Text>
      <Text style={styles.paragraph}>
        Todo el  contenido de la Aplicación, incluidos textos , videos ,  imágenes, gráficos, logotipos, íconos, y software, son propiedad de Mind Bloom  y están protegidos por las leyes de derechos de autor y otras leyes de propiedad intelectual.
      </Text>

      <Text style={styles.subTitle}>3. Restricciones de Uso</Text>
      <Text style={styles.paragraph}>
        No debes copiar,  distribuir, transmitir, mostrar, vender, licenciar o explotar de cualquier otra manera el contenido de la Aplicación sin nuestro permiso  . Cualquier uso no autorizado puede resultar en consecuencias legales.
      </Text>

     

      

      <Text style={styles.subTitle}>6. Modificaciones a los Términos</Text>
      <Text style={styles.paragraph}>
        Podemos modificar estos Términos en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en la Aplicación. Al continuar usando la Aplicación, aceptas los Términos modificados.
      </Text>

      <Text style={styles.paragraph}>
        Al presionar "Aceptar", confirmas que has leído, comprendido y aceptas estar sujeto a estos Términos y Condiciones.
      </Text>
              </ScrollView>
              <TouchableOpacity style={styles.modalButton} onPress={handleAcceptTerms}>
                <Text style={styles.modalButtonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={{ paddingHorizontal: 20 }}>
              <View style={styles.header}>
                <Image source={Logo} style={styles.logo} />
                <Text style={styles.h1}>Iniciar sesión</Text>
                <Image source={Ebook} style={styles.ebook} />
              </View>

              <View style={styles.form}>
                <AuthInput label="Usuario " isEmail control={control} name="email" />
                <AuthInput label="Contraseña " isSecure control={control} name="password" />
                {error && <Text style={{ color: 'red', fontWeight: '400' }}>{error}</Text>}
                <View style={{ marginTop: 70 }}>
                  <CustomButton
                    text="Ingresar"
                    onPress={handleSubmit(onLoginPressed)}
                    disabled={isLoading!}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;



