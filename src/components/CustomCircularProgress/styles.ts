import { StyleSheet } from "react-native";
import { windowWidth } from "../../utils/Dimentions";

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: "#fff",
        height: windowWidth * 0.45,
        width: windowWidth * 0.45,
        alignItems: "center"
    }
})