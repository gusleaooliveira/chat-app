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
import { firebaseConfig } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme)=>({
  formulario: {
    margin: theme.spacing(1),
  },
  entradas: {
    margin: theme.spacing(1),
  }
}))


function Cadastrar(){
  const classes = useStyles();


  return <form className={classes.formulario}  noValidate autoComplete="off">
            <TextField id="nomeCadastro" label="Nome:" fullWidth className={classes.entradas} />
            <TextField id="telefoneCadastro" type="tel" label="Telefone:" fullWidth className={classes.entradas} />
            <TextField id="emailCadastro" type="email" label="Email:" fullWidth className={classes.entradas} />
            <TextField id="senhaCadastro" type="password" label="Senha:" fullWidth className={classes.entradas} />


            <FirestoreMutation path="/usuarios" type="add">
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
                          Cadastrar <Save />
                       </Button>
              }}
            </FirestoreMutation>


          </form>
}

export default Cadastrar;
