import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

interface Props {
    readonly label: string;
    readonly isSecure?: boolean;
    readonly isEmail?: boolean;
    control: any;
    name: string;
}


const AuthInput = ({ label, isSecure = false, isEmail = false, control, name }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!isSecure);

    const getIconName = () => {
        if (isEmail) {
            return 'email';
        } else {
            return isPasswordVisible ? 'eye' : 'eye-off';
        }
    };

    return (
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View>
                    <TextInput
                        label={label}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={{ backgroundColor: '#fff' }}
                        underlineColor="#2B32CE"
                        selectionColor="#2B32CE"
                        secureTextEntry={isSecure && !isPasswordVisible}
                        activeUnderlineColor="#2B32CE"
                        right={
                            <TextInput.Icon
                                icon={getIconName()}
                                color="#3C63FF"
                                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            />
                        }
                    />
                    {error && (
                        <Text style={styles.span}>{error.message ?? 'Error'}</Text>
                    )}
                </View>
            )}
            name={name}
            rules={{
                required: {
                    value: true,
                    message: 'Este campo es obligatorio'
                },
                minLength: {
                    value: 3,
                    message: 'La longitud de la entrada es muy corta'
                },
                ...(isEmail && { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo electrónico no válido' }),
            }}
        />
    );
};

const styles = StyleSheet.create({
    span: {
        color: 'red',
        fontWeight: '400'
    }
});

export default AuthInput;

