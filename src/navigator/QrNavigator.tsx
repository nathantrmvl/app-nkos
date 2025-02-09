import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { QrScannerScreen } from "../screens/camera/QrScannerScreen";

export type RootStackQrParams = {
    QrScannerScreen: undefined;
}

const Stack = createStackNavigator<RootStackQrParams>();


export const QrNavigator = () => {

    return(
        <Stack.Navigator
            initialRouteName="QrScannerScreen"
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor: "white"
                }
            }}
        >
            <Stack.Screen
                name="QrScannerScreen"
                component={ QrScannerScreen }
                options={{ title: "Escaner QR" }}
            />
        </Stack.Navigator>
    );

}