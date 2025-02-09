export interface UserResponse {
    nombre:         string;
    ap_paterno:     string;
    ap_materno:     string;
    image:          string;
    userKey:        string;
    carrera:        string;
    password:       string;
    type_user:      string;
}

export interface UserForm {
    userKey: string;
    password: string;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    image: string;
    carrera: string;
    type_user: string;
  }
  
export type RequestLogin = UserResponse | false;
