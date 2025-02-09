import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AuthContext } from '../context/AuthContext';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { ButtonText } from "./ButtonText";

export const MenuInterno = ({ navigation }: DrawerContentComponentProps) => {
    const { authState, logOut } = useContext(AuthContext);

    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>
            {/* Header con Avatar e Información */}
            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={
                        authState.userImage
                            ? { uri: `data:image/jpeg;base64,${authState.userImage}` }
                            : require('./../../assets/cuervoutvtfull.png')
                    }
                />
                <Text style={styles.username}>
                    {authState.type_user === "Alumno" ? "Estudiante" : "Empleado"}
                    {'\n'}
                    {authState.username || "Usuario"}
                </Text>
                <Text style={styles.userType}>
                    {authState.type_user === "Administrador"
                        ? "Adminstrador/@"
                        : authState.type_user === "Seguridad"
                        ? "Seguridad"
                        : "Alumn@"}
                </Text>
            </View>

            {/* Opciones del Menú */}
            <View style={styles.menu}>
                {authState.type_user === "Administrador" && (
                    <ButtonText
                        action={() => navigation.navigate("AdminHome")}
                        title="Usuarios"
                        style={styles.menuButton}
                    />
                )}
                <ButtonText
                    action={() => navigation.navigate("CalendarScreen")}
                    title="School Calendar"
                    style={styles.menuButton}
                />
                {(authState.type_user === "Administrador" || authState.type_user === "Alumno") && (
                    <>
                        <ButtonText
                            action={() => navigation.navigate("ServiceScreen")}
                            title="Services"
                            style={styles.menuButton}
                        />
                        <ButtonText
                            action={() => navigation.navigate("QRgeneratorScreen")}
                            title="QR"
                            style={styles.menuButton}
                        />
                        <ButtonText
                            action={() => navigation.navigate("FormUserScreen")}
                            title="Settings"
                            style={styles.menuButton}
                        />
                    </>
                )}
                {(authState.type_user === "Administrador" || authState.type_user === "Seguridad") && (
                    <ButtonText
                        action={() => navigation.navigate("QrScannerScreen")}
                        title="Escanear Código QR"
                        style={styles.menuButton}
                    />
                )}

                {/* Solo una vez y al final para todos los tipos de usuario */}
                <ButtonText
                    action={logOut}
                    title="Cerrar sesión"
                    style={styles.logoutButton}
                />

                {/* Dos imágenes pequeñas debajo del botón de cerrar sesión */}
                <View style={styles.imagesContainer}>
                    <Image
                        source={require('./../../assets/nkos_logvnegro.png')}
                        style={styles.smallImage}
                        resizeMode="contain" // Mantiene la relación de aspecto
                    />
                    <Image
                        source={require('./../../assets/logbiofull.png')}
                        style={styles.smallImage}
                        resizeMode="contain" // Mantiene la relación de aspecto
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9", // Fondo claro
        paddingHorizontal: 20, // Aumenté el padding horizontal para mayor separación
    },
    header: {
        alignItems: "center",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: "#ddd", // Fondo gris claro en caso de que no cargue la imagen
    },
    username: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 5,
        color: "#333",
        textTransform: "uppercase",
    },
    userType: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#444",
        marginTop: 5,
    },
    logoutButton: {
        marginTop: 10,
        backgroundColor: "#ff3131", // Color de botón para cerrar sesión
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    menu: {
        flex: 1,
        marginTop: 10,
    },
    menuButton: {
        marginBottom: 10,
        marginLeft: 10, // Separar un poco las opciones a la izquierda
        marginRight: 10, // Separar también por el lado derecho
    },
    imagesContainer: {
        flexDirection: "row",
        justifyContent: "center", // Centra las imágenes
        marginTop: '40%', // Asegura que no haya un espacio demasiado grande
        gap: 20, // Reduce el espacio entre las imágenes
    },
    smallImage: {
        width: 100,
        height: 50,
        borderRadius: 2,
    },
});
