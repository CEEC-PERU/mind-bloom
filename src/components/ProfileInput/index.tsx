import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

interface ProfileInputProps {
    label: string;
    control: any;
    name: "first_name" | "last_name" | "document_number" | "phone";
    inputType: 'text' | 'number';
    rules?: any;
    defaultValue?: string
}

const ProfileInput = ({ label, control, name, inputType, rules, defaultValue }: ProfileInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const keyboardType = inputType === 'number' ? 'numeric' : 'default';
    const getIconName = () => {
        switch (name) {
            case "first_name":
                return "account"
            case "document_number":
                return "card"
            case "last_name":
                return "account"
            case "phone":
                return "cellphone"
            default:
                return "account";
        }
    }
    return (
        <View style={styles.container}>
            <Controller
                rules={rules}
                control={control}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <View>
                        <TextInput
                            label={label}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onFocus={() => setIsFocused(true)}
                            autoFocus
                            style={{ backgroundColor: '#fff', padding: 3 }}
                            underlineColor="#2B32CE"
                            selectionColor="#2B32CE"
                            activeUnderlineColor="#2B32CE"
                            keyboardType={keyboardType}
                            maxLength={rules?.maxLength?.value || undefined}
                            left={
                                <TextInput.Icon
                                    icon={getIconName()}
                                    color="#2B32CE"
                                />
                            }
                        />

                        {error && (
                            <Text style={styles.span}>{error.message ?? 'Error'}</Text>
                        )}
                        {rules?.maxLength && value && value.length > rules.maxLength.value && (
                            <Text style={styles.span}>Se ha excedido el límite de longitud</Text>
                        )}
                    </View>
                )}
                name={name}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    span: {
        color: 'red',
        fontWeight: '400'
    }
});

export default ProfileInput;