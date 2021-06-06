import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core/';
import { Save } from '@material-ui/icons/';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import { FirestoreCollection, FirestoreDocument, FirestoreMutation, FirestoreProvider } from '@react-firebase/firestore';
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import * as fire from 'firebase/app';
import { firebaseConfig } from '../../config';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme)=>({
  formulario: {
    margin: theme.spacing(1),
  },
  entradas: {
    margin: theme.spacing(1),
  }
}))

function Login(props){
  const classes = useStyles();

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


    return  <form className={classes.formulario}  noValidate autoComplete="off">
        <TextField id="emailLogin" type="email" label="Email:" fullWidth className={classes.entradas} />
        <TextField id="senhaLogin" type="password" label="Senha:" fullWidth className={classes.entradas} />

        <FirestoreCollection path="/usuarios">
          {d=>{
            if(d.isLoading) return <p><b>Carregando!</b></p>
            if(d.value.length > 0){
              return <Button variant="contained" color="primary" fullWidth className={classes.entradas} onClick={()=>{
                          let email = document.querySelector('#emailLogin').value;
                          let senha = document.querySelector('#senhaLogin').value;
                          d.value.map((item, indice)=>{
                            if(item['email'] == email && item['senha'] == senha){
                              addUsuario(item)
                              addId(d.ids[indice])
                              addConectado(true)

                              console.error('Login:',id, usuario, conectado);
                            }
                          })
                     }}>
                        Salvar <Save />
                     </Button>
            }
          }}
        </FirestoreCollection>
      </form>
}

export default Login;
