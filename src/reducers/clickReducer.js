import { CLICK_ADD_USUARIO, CLICK_ADD_ID, CLICK_ADD_CONECTADO } from '../actions/actionsTypes';

const initialState = {
  usuario: {nome:'teste', telefone: '999999', icone: 'usuario.svg', email: 'teste@gmail.com', senha:'123456'},
  id: '0',
  conectado: false
};

export const clickReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_ADD_USUARIO:
        return {
          ...state,
          usuario: action.usuario
        };
    case CLICK_ADD_ID:
      return {
        ...state,
        id: action.id
      };
    case CLICK_ADD_CONECTADO:
      return {
        ...state,
        conectado: action.conectado
      };
    default:
      return state;
  }
}
