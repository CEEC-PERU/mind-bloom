import axios from "axios";
import { UserRequest } from "../interfaces/UserInterfaces";
import { API_USER_ADMIN } from "../utils/Endpoints";

export const PostNewUser = async (newUser: UserRequest) => {
    try {
        const configObject = {
            method: 'POST',
            url: API_USER_ADMIN,
            data: newUser
        }
        const response = await axios<UserRequest>(configObject);
        if (response.data)
            return response.data;
        else
            return null;
    } catch (error) {
        console.error(error);
        throw error
    }
}