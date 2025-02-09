import axios from "axios";

// Configuración de Axios
export const cuervoApi = axios.create({
    baseURL: "http://192.168.1.81:8000", // URL base de la API
    timeout: 10000, // Tiempo de espera máximo de 10 segundos
    headers: {
      "Content-Type": "application/json",},
    });

// Función para realizar el login
export const loginUser = async (userKey: string, password: string) => {
    try {
        // Realiza la solicitud POST para el login
        const response = await cuervoApi.post("/login/", { userKey, password });
        return response.data; // Retorna los datos de la respuesta
    } catch (error: any) {
        console.error("Error en login:", error.response?.data); // Agregar esta línea
    
        // Asegurar que sea string antes de lanzar el error
        const errorMessage = error.response?.data?.detail;
        throw new Error(typeof errorMessage === "string" ? errorMessage : JSON.stringify(error.response?.data) || "Error al iniciar sesión");
    }
    
};
