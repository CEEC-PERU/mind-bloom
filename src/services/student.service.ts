import axios from "axios";
import {  API_GET_ALL_STUDENTS, API_GET_ALL_USERS } from "../utils/Endpoints";
import {  UserInfo } from "../interfaces/UserInterfaces";
import { UserWithRole } from "../interfaces/StudentInterfaces";

export const GetAllUsers = async (): Promise<UserWithRole[]> => {
    try {
        const configObject = {
            method: 'GET',
            url: API_GET_ALL_USERS
        }
        const users = await axios<UserWithRole[]>(configObject);
        return users.data;
    } catch (error) {
        console.error(error, 'customer service');
        throw error
    }
}

export const GetAllStudents = async (): Promise<UserWithRole[]> => {
    try {
        const configObject = {
            method: 'GET',
            url: API_GET_ALL_STUDENTS
        }
        const users = await axios<UserWithRole[]>(configObject);
        return users.data;
    } catch (error) {
        console.error(error, 'customer service');
        throw error
    }
}

