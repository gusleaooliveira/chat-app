import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Fab, Button, Accordion, AccordionSummary, AccordionDetails, Card, CardHeader, Avatar, Typography, CardContent } from '@material-ui/core/';
import { Save, Person, Add, ExpandMore } from '@material-ui/icons/';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import { FirestoreCollection, FirestoreDocument, FirestoreMutation, FirestoreProvider } from '@react-firebase/firestore';
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import * as fire from 'firebase/app';
import { firebaseConfig } from '../../../config';
import { useSelector, useDispatch } from 'react-redux';
import imgUsr from '../../../icons/usuario.svg'

const useStyles = makeStyles((theme)=>({
  formulario: {
    margin: theme.spacing(1),
  },
  entradas: {
    margin: theme.spacing(1),
  },
  cartao: {
    backgroundColor: '#ccc'
  },
  cabecalho: {
    fontSize: theme.typography.pxToRem(15),
    fontWeigth: theme.typography.fontWeigthRegular,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}))

function Agenda(){
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

  return <div>

      <FirestoreCollection path="/contatos">
            {d=>{
              if(d.isLoading) return <p><b>Carregando!</b></p>
              if(d.value.length > 0){
                return <div>
                          {d.value.map((item, indice) => {
                            if(item['idUsuario'] == id){
                              return <Accordion fullWidth>
                                      <AccordionSummary expandIcon={<ExpandMore />} >
                                        <Typography  className={classes.cabecalho}>{item['nome']}</Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Card fullWidth className={classes.cartao}>
                                          <CardHeader
                                            avatar={
                                              <Avatar aria-label={item['nome']} src={imgUsr} />
                                            }
                                            title={item['nome']}
                                          />
                                          <Typography>
                                              <CardContent>
                                                <p><b>Email:</b>{item['email']}</p>
                                                <p><b>Telefone:</b>{item['telefone']}</p>
                                              </CardContent>
                                          </Typography>
                                        </Card>
                                      </AccordionDetails>
                                    </Accordion>
                            }
                          })}
                       </div>
              }
            }}



         </FirestoreCollection>

         <Fab  className={classes.fab} color="primary" component={Link} to="/contato" aria-label="add">
           <Add />
         </Fab>
       </div>
}

export default Agenda;
