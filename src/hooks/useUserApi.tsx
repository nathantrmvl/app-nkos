import { useEffect, useState, useCallback } from "react";
import { UserResponse, UserForm } from "../interfaces/cuervoApi";
import { cuervoApi } from "../api/cuervoApi";

export const useUserApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listUsers, setListUsers] = useState<UserResponse[]>([]);

  // Cargar usuarios
  const loadUsers = useCallback(async () => {
    try {
      const response = await cuervoApi.get<UserResponse[]>("/usuarios/");
      setListUsers(response.data);
    } catch (error: any) {
      // Log para depurar el error completo
      console.error("Error cargando usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Crear usuario
  const createUser = useCallback(async (data: UserForm) => {
    try {
      const dataBody = {
        userKey: data.userKey,
        password: data.password,
        nombre: data.nombre || "Nombre por defecto",
        ap_paterno: data.ap_paterno || "Apellido Paterno",
        ap_materno: data.ap_materno || "Apellido Materno",
        image: data.image || "https://example.com/default_image.jpg",
        carrera: data.carrera || "sin definir",
        type_user: data.type_user || "usuario"
      };

      const response = await cuervoApi.post("/register/", dataBody);
      console.log("Usuario creado:", response.data); // Opcional: Log para depurar
      loadUsers(); // Recargar la lista de usuarios
    } catch (error: any) {
      // Log para depurar el error completo
      console.error("Error creando usuario:", error);
    }
  }, [loadUsers]);

  // Actualizar usuario
  const updateUser = useCallback(async (data: UserForm) => {
    try {
      const dataBody = {
        nombre: data.nombre,
        ap_paterno: data.ap_paterno,
        ap_materno: data.ap_materno,
        image: data.image,
        carrera: data.carrera,
        type_user: data.type_user,
      };

      const response = await cuervoApi.put(`/usuarios/${data.userKey}`, dataBody);
      console.log("Usuario actualizado:", response.data); // Opcional: Log para depurar
      loadUsers(); // Recargar la lista de usuarios
    } catch (error: any) {
      // Log para depurar el error completo
      console.error("Error actualizando usuario:", error);
    }
  }, [loadUsers]);

  // Eliminar usuario
  const deleteUser = useCallback(async (userKey: string) => {
    try {
      const response = await cuervoApi.delete(`/usuarios/${userKey}`);
      console.log("Usuario eliminado:", response.data); // Opcional: Log para depurar
      loadUsers(); // Recargar la lista de usuarios
    } catch (error: any) {
      // Log para depurar el error completo
      console.error("Error eliminando usuario:", error);
    }
  }, [loadUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    isLoading,
    listUsers,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
