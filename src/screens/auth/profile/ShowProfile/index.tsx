import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { CustomImagePicker } from '../../../../components'
import { useProfile } from '../ProfileScreen/hooks/useProfile';
import { useAuth } from '../../../../context/AuthContext';

export default function UpdateProfile() {
  const [selectedImage, setSelectedImage] = useState("");
  const { userInfo } = useAuth();
  const user = userInfo as { id: number , email : string};
  const { documentTypes, error, loading, profile } = useProfile(user.id);

  const handleImageSelected = (image: string) => {
    setSelectedImage(image);
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <CustomImagePicker 
            onImageSelected={handleImageSelected} 
            image_type='profile' 
            image_uri={profile && profile.Profile?.profile_picture as any} 
          />
        </View>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.headerText}>Información del Usuario</Text>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{profile?.Profile?.first_name} {profile?.Profile?.last_name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>DNI:</Text>
          <Text style={styles.value}>{profile?.Profile?.document_number}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{profile?.Profile?.phone}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  imageWrapper: {
    borderWidth: 5,
    borderColor: '#4951FF',
    borderRadius: 100, // assuming the image is a square and you want a circular border
    padding: 5, // space between the image and the border
  },
  cardInfo: {
    backgroundColor: '#4951FF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#fff',
    width: 80,
  },
  value: {
    color: '#fff',
    flex: 1,
  },
});
