import { CLICK_ADD_USUARIO, CLICK_ADD_ID, CLICK_ADD_CONECTADO } from './actionsTypes.js';

export const clickAddUsuario = value => ({
  type: CLICK_ADD_USUARIO,
  usuario: value
});

export const clickAddId = value => ({
  type: CLICK_ADD_ID,
  id: value
})

export const clickAddConectado = value => ({
  type: CLICK_ADD_CONECTADO,
  conectado: value
})
