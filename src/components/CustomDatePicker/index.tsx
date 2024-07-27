import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {
    readonly onDateChange: (date: string) => void;

}

export default function CustomDatePicker({ onDateChange }: Props) {
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        onDateChange(currentDate);
        console.log(currentDate);
    };

    useEffect(() => {
        setDate(new Date());
    }, [])
    return <View style={{ padding: showDatePicker ? 10 : 18, paddingLeft: 20, borderWidth: 1, borderColor: "#2B32CE", borderRadius: 7, display: "flex", flexDirection: "row", marginBottom: 20, alignItems: "center", }}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text>{
                date.toLocaleDateString() === new Date().toLocaleDateString()
                    ? "Cierre de curso (opcional)" :
                    date.toLocaleDateString()
            }</Text>
        </TouchableOpacity>
        {showDatePicker && (
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
            />
        )}
    </View>
}

const styles = StyleSheet.create({})