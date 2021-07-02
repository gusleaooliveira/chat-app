import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, BottomNavigation, BottomNavigationAction  } from '@material-ui/core/';
import { Save, RecentActors, ExitToApp, Forum } from '@material-ui/icons/';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import { FirestoreCollection, FirestoreDocument, FirestoreMutation, FirestoreProvider } from '@react-firebase/firestore';
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import * as fire from 'firebase/app';
import { firebaseConfig } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme)=>({
  formulario: {
    margin: theme.spacing(1),
  },
  entradas: {
    margin: theme.spacing(1),
  },
  barra: {
    backgroundColor: '#272727',
    '& .Mui-selected': { color: '#ff9800' },
    '& .MuiBottomNavigationAction-iconOnly': { color: '#ffffff' },
  },
  barraItem: {
    color: '#ffffff'
  }
}))

function Perfil(props) {
  const classes = useStyles();
  const [value, setValue] = useState('agenda')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [isLoged, setIsLogued] = useState(true);

  const usuario = useSelector(state => state.clickState.usuario);
  const id = useSelector(state => state.clickState.id);
  const conectado = useSelector(state => state.clickState.conectado);
  const dispatch = useDispatch();


    function addUsuario(usr){
      dispatch({ type: 'CLICK_ADD_USUARIO', usuario: usr  })
    }

    function addId(idUsr){
      dispatch({type: 'CLICK_ADD_ID', id: idUsr})
    }
    function addConectado(usrConectado){
      dispatch({type: 'CLICK_ADD_CONECTADO', conectado: usrConectado})
    }

    console.log(usuario, id, conectado);
    return <form className={classes.formulario}  noValidate autoComplete="off">
              <TextField id="nomeCadastro" label="Nome:" defaultValue={usuario['nome']} fullWidth className={classes.entradas} />
              <TextField id="telefoneCadastro" type="tel" defaultValue={usuario['telefone']} label="Telefone:" fullWidth className={classes.entradas} />
              <TextField id="emailCadastro" type="email"  defaultValue={usuario['email']} label="Email:" fullWidth className={classes.entradas} />
              <TextField id="senhaCadastro" type="password" defaultValue={usuario['senha']} label="Senha:" fullWidth className={classes.entradas} />

              <FirestoreMutation path={"/usuarios/"+id} type="set">
                {({runMutation})=>{
                  return <Button variant="contained" color="primary" fullWidth className={classes.entradas} onClick={()=>{
                            let nomeUsr = document.querySelector('#nomeCadastro').value;
                            let telefoneUsr = document.querySelector('#telefoneCadastro').value;
                            let emailUsr = document.querySelector('#emailCadastro').value;
                            let senhausr = document.querySelector('#senhaCadastro').value;
                            let usuario = { nome: nomeUsr, telefone: telefoneUsr, email: emailUsr, senha: senhausr };

                            runMutation(usuario).then(res => {
                              alert('Salvo com sucesso!')
                            }).catch(erro => {
                              alert('Erro ao salvar:', erro)
                            })
                          }}>
                            Alterar <Save />
                         </Button>
                }}
              </FirestoreMutation>
          </form>

}

export default Perfil;
