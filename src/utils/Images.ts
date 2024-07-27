import { PostImage } from "../services/image.service";

export const uploadImage = async (selectedImage: string) => {
    if (selectedImage !== "") {
        const formData = new FormData();
        formData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg',
            name: 'image.jpg'
        } as any);
        const response = await PostImage(formData);
        return response?.imageUrl;
    } else {
        return;
    }
}