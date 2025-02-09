import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../../context/AuthContext';
import { appTheme } from '../../theme/appTheme';

export const QrGeneratorScreen = () => {

    const { authState } = useContext(AuthContext);

    const [ estado, setEstado ] = useState(false);

    const [ time, setTime ] = useState(0);

    const usuario = {
        nombre: authState.username,
        userKey: authState.userKey,
        hora: Date.now(),
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime( prevTime => {
                return (prevTime > 0) ? prevTime - 1000 : 0;
            });
        },1000);
        return () => clearInterval( timer );
    }, [ estado ]);

    const getTimer = () => {
        // Como me costo batallar con un espacio...
        const getTime = ( time/1000 ) < 10 ? `0${time/1000}` : `${time/1000}`; 
        const setTime = ( time > 0 ) ? `00:${getTime}` : '00:00';
        return setTime;
    }

    return(
        <View
            style={ {
                ...appTheme.containerGlobal,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Text
                style={{
                    fontSize: 60,
                    color: "pink",
                    fontWeight: "bold"
                }}
            >
                { getTimer() }
            </Text>
            {
                (time === 0) &&
                    <TouchableOpacity
                        onPress={ () => {
                            setTime(15000);
                            setEstado(true);
                        }}
                    >
                        <View
                            style={{
                                height: 50,
                                width: 200,
                                backgroundColor: 'violet',
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 20,
                                borderWidth: 2,
                                borderColor: "violet",
                                margin: 5
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 30,
                                    fontWeight: "bold"
                                }}
                            >
                                Generar QR
                            </Text>
                        </View>
                    </TouchableOpacity>
            }
            {
                (time != 0) &&
                <QRCode
                    value={ JSON.stringify(usuario) }
                    color="pink"
                    size={300}
                    logo={{ uri: `data:image/png;base64,${authState.userImage}` }}
                    logoBorderRadius={30}
                    logoSize={50}
                />
            }
        </View>
    );
}
