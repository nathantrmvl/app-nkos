import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, RefreshControl, Image, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { UserResponse } from "../../interfaces/cuervoApi";
import { appTheme } from "../../theme/appTheme";
import { useUserApi } from "../../hooks/useUserApi";
import { BtnTouch } from "../../componentes/BtnTouch";

export const AdminHome = () => {
  const { listUsers, isLoading, loadUsers, deleteUser } = useUserApi();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      loadUsers();
    }
  }, [isFocused]);

  const handleDelete = async (_id: string) => {
    await deleteUser(_id);
    loadUsers();
  };

  return (
    <View style={appTheme.containerGlobal}>
      <Image
        style={appTheme.headerLogo}
        source={require("../../../assets/logbiofull.png")}
      />

      <View style={appTheme.headerContainer}>
        <Text style={{ ...appTheme.headingadmin, textTransform: "none" }}>
          Lista de Alumnos
        </Text>
        {isLoading && <ActivityIndicator style={appTheme.loader} size="large" color="#000" />}
        <BtnTouch
          title="Agregar Alumno"
          action={() => navigation.navigate("FormUserScreen", { UserResponse: null })}
          backgroundColor="black"
        />
      </View>

      <FlatList
        data={listUsers}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadUsers}
            colors={["#fff"]}
            progressBackgroundColor="black"
          />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={appTheme.userListItem}>
            <Text style={appTheme.userName}>{item.nombre} {item.ap_paterno} {item.ap_materno}</Text>
            <Text>{item.carrera}</Text>
            <BtnTouch
              title="Editar"
              action={() => navigation.navigate("FormUserScreen", { UserResponse: item })}
              backgroundColor="lightgreen"
            />
            <BtnTouch
              title="Eliminar"
              action={() => handleDelete(item._id)}
              backgroundColor="red"
            />
          </View>
        )}
      />

      {listUsers.length === 0 && !isLoading && (
        <Text style={appTheme.noUsersText}>No hay alumnos registrados.</Text>
      )}
    </View>
  );
};