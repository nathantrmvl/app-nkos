import { useReducer, useCallback } from "react";
import { useUserApi } from "../hooks/useUserApi";

export interface UserForm {
  _id?: string; // Hacer opcional para evitar errores en handleSubmit y handleDelete
  nombre: string;
  ap_paterno: string;
  ap_materno: string;
  image: string;
  userKey: string;
  carrera: string;
  password: string;
  type_user: string;
}

const initialState: UserForm = {
  nombre: '',
  ap_paterno: '',
  ap_materno: '',
  image: '',
  userKey: '',
  carrera: '',
  password: '',
  type_user: '',
};

type Action =
  | { type: "HANDLE_INPUT_CHANGE"; payload: { fieldName: keyof UserForm; value: string } }
  | { type: "RESET_FORM" };

const formReducer = (state: UserForm, action: Action): UserForm => {
  switch (action.type) {
    case "HANDLE_INPUT_CHANGE":
      return {
        ...state,
        [action.payload.fieldName]: action.payload.value,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

export const useUserForm = () => {
  const { createUser, updateUser, deleteUser } = useUserApi();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleInputChange = (fieldName: keyof UserForm, value: string) => {
    dispatch({ type: "HANDLE_INPUT_CHANGE", payload: { fieldName, value } });
  };

  const handleSubmit = useCallback(() => {
    const { _id, ...userData } = state;
    if (_id) {
      updateUser(state);
    } else {
      createUser(userData);
    }
  }, [state, createUser, updateUser]);

  const handleDelete = useCallback(() => {
    if (state.userKey) {
      deleteUser(state.userKey);
    }
  }, [state.userKey, deleteUser]);

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return {
    state,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleReset,
  };
};
