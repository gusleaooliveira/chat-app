import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button,IconButton, Accordion, AccordionSummary, AccordionDetails, Card, CardHeader, Avatar, Typography, CardContent } from '@material-ui/core/';
import { Save, Person, ExpandMore,ArrowBackIos } from '@material-ui/icons/';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import { FirestoreCollection, FirestoreDocument, FirestoreMutation, FirestoreProvider } from '@react-firebase/firestore';
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import * as fire from 'firebase/app';
import { firebaseConfig } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import imgUsr from '../../../icons/usuario.svg';
import imgEagle from '../../../icons/eagle.svg';

const useStyles = makeStyles((theme)=>({
  formulario: {
    margin: theme.spacing(1),
  },
  entradas: {
    margin: theme.spacing(1),
  },
  cartao: {
    backgroundColor: '#272727',
    color: '#FF9800'
  },
  cabecalho: {
    fontSize: theme.typography.pxToRem(15),
    fontWeigth: theme.typography.fontWeigthRegular,
  },
  btnColor: {
    color: '#FF9800'
  }
}))
function Contato(props){
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

  return <form className={classes.formulario}  noValidate autoComplete="off">
            <TextField id="nomeCadastro" label="Nome:" fullWidth className={classes.entradas} />
            <TextField id="telefoneCadastro" type="tel" label="Telefone:" fullWidth className={classes.entradas} />
            <TextField id="emailCadastro" type="email" label="Email:" fullWidth className={classes.entradas} />
            <input type="hidden" id="idUsuario" value={id} />
            

            <FirestoreMutation path="/contatos" type="add">
              {({runMutation})=>{
                return <Button variant="contained" color="primary" fullWidth className={classes.entradas} onClick={()=>{
                          let nomeUsr = document.querySelector('#nomeCadastro').value;
                          let telefoneUsr = document.querySelector('#telefoneCadastro').value;
                          let emailUsr = document.querySelector('#emailCadastro').value;
                          let idUsr = document.querySelector('#idUsuario').value;
                          let usuario = { nome: nomeUsr, telefone: telefoneUsr, email: emailUsr, idUsuario: idUsr};

                          runMutation(usuario).then(res => {
                            alert('Salvo com sucesso!')
                          }).catch(erro => {
                            alert('Erro ao salvar:', erro)
                          })
                        }}>
                          Cadastrar <Save />
                       </Button>
              }}
            </FirestoreMutation>


          </form>
}

export default Contato
