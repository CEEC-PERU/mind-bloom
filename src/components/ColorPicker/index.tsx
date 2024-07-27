import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet, Text } from 'react-native';

interface Props {
    readonly onColorSelected: (color: string) => void;
}

const ColorPicker = ({ onColorSelected }: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#00C70F');

    const colors = ["#00C70F", '#8D3EFF', '#FF5050', '#50AFFF',
        '#FFFD60', '#FF9300', "#CA3EFF", "#3EFFF6",
        "#3E61FF", "#3EC5FF", "#41E64D", "#D1FF00"];

    const handleColorSelect = (color: string) => {
        onColorSelected(color);
        setSelectedColor(color);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={{ marginBottom: 10, }}>Selecciona un color</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={[styles.colorBox, { backgroundColor: selectedColor }]} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    marginTop: 'auto',
                    flexDirection: 'column',
                }}>
                    <View style={styles.modalContainer}>
                        {colors.map((color) => (
                            <TouchableOpacity
                                key={color}
                                onPress={() => handleColorSelect(color)}
                                style={[styles.colorOption, { backgroundColor: color }]}
                            />
                        ))}

                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{backgroundColor: "#fff"}}>
                        <Text style={styles.closeButton}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 20,
        marginBottom: 20,
        backgroundColor: "#fff"
    },
    colorBox: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
    },
    closeButton: {
        margin: 20,
        textAlign: 'center',
        color: 'blue',
        fontSize: 18,
    },
});

export default ColorPicker;
