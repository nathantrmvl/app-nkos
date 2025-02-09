import React, { useEffect } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RootStackUserParam } from '../../navigator/UsersNavigator';
import { useUserForm } from "../../hooks/useUserForm";
import { BtnTouch } from '../../componentes/BtnTouch';
import { appTheme } from '../../theme/appTheme';

interface Props extends StackScreenProps<RootStackUserParam, 'FormUserScreen'> {}

export const FormUserScreen = ({ navigation, route }: Props) => {
  const {
    state,
    handleInputChange,
    handleDelete,
    handleSubmit
  } = useUserForm();

  useEffect(() => {
    const usuario = route.params?.UserResponse;
    if (usuario) {
      usuario.nombre && handleInputChange('nombre', usuario.nombre);
      usuario.ap_paterno && handleInputChange('ap_paterno', usuario.ap_paterno);
      usuario.ap_materno && handleInputChange('ap_materno', usuario.ap_materno);
      usuario.image && handleInputChange('image', usuario.image);
      usuario.userKey && handleInputChange('userKey', usuario.userKey);
      usuario.carrera && handleInputChange('carrera', usuario.carrera);
      usuario.type_user && handleInputChange('type_user', usuario.type_user);
    }
  }, [route.params]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      convertImageToBase64(result.assets[0].uri);
    }
  };

  const convertImageToBase64 = async (imageUri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      handleInputChange('image', base64);
    } catch (error) {
      console.log('No se pudo convertir la imagen', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={appTheme.containerGlobal}>
        <Text style={appTheme.title}>Formulario de usuarios</Text>

        <TextInput
          style={appTheme.input}
          value={state.nombre}
          onChangeText={(text) => handleInputChange('nombre', text)}
          placeholder="Nombre del usuario"
        />
        <TextInput
          style={appTheme.input}
          value={state.ap_paterno}
          onChangeText={(text) => handleInputChange('ap_paterno', text)}
          placeholder="Apellido paterno"
        />
        <TextInput
          style={appTheme.input}
          value={state.ap_materno}
          onChangeText={(text) => handleInputChange('ap_materno', text)}
          placeholder="Apellido materno"
        />
        <TextInput
          style={appTheme.input}
          value={state.userKey}
          onChangeText={(text) => handleInputChange('userKey', text)}
          placeholder="Matrícula del usuario"
        />

        <BtnTouch
          title="Seleccionar imagen"
          action={pickImage}
          backgroundColor="black"
        />
        {state.image !== '' && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${state.image}` }}
            style={appTheme.imagePreview}
          />
        )}

        <TextInput
          style={appTheme.input}
          value={state.password}
          secureTextEntry={true}
          onChangeText={(text) => handleInputChange('password', text)}
          placeholder="Contraseña"
        />
        <TextInput
          style={appTheme.input}
          value={state.carrera}
          onChangeText={(text) => handleInputChange('carrera', text)}
          placeholder="Carrera"
        />

        <TextInput
          style={appTheme.input}
          value={state.type_user}
          onChangeText={(text) => handleInputChange('type_user', text)}
          placeholder="Tipo de usuario"
        />

        <View style={appTheme.buttonContainer}>
          <BtnTouch
            action={async () => {
              await handleSubmit();
              navigation.popToTop();
            }}
            title={state._id !== '' ? 'Actualizar registro' : 'Crear Registro'}
            backgroundColor="green"
          />

          {state._id !== '' && (
            <BtnTouch
              title="Eliminar Usuario"
              action={() => {
                handleDelete();
                navigation.popToTop();
              }}
              backgroundColor="red"
            />
          )}

          <BtnTouch
            action={() => {
            navigation.reset({
            index: 0,
            routes: [{ name: "AdminHome" }],
              });
            }}
              title="Regresar"
              backgroundColor="black"
            />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
