import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, List, ListItem, Divider, ListItemAvatar, ListItemText, Button,  NativeSelect, FormControl, InputLabel, Accordion, Select, MenuItem, AccordionSummary, AccordionDetails, Card, CardHeader, Avatar, Typography, CardContent } from '@material-ui/core/';
import { Save, Person, ExpandMore } from '@material-ui/icons/';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import { FirestoreCollection, FirestoreDocument, FirestoreMutation, FirestoreProvider } from '@react-firebase/firestore';
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import * as fire from 'firebase/app';
import { firebaseConfig } from '../../config';
import { useSelector, useDispatch } from 'react-redux';
import imgUsr from '../../icons/usuario.svg'
import FileUploader from 'react-firebase-file-uploader';

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
  inline: {
    display: 'inline'
  },
  lista: {
    overflow: 'auto',
    maxHeight: 270
  }
}))

function Mensagens(){
  const classes = useStyles();

  const usuario = useSelector(state => state.clickState.usuario);
  const id = useSelector(state => state.clickState.id);
  const conectado = useSelector(state => state.clickState.conectado);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imagem, setImagem] = useState('')
  const [url, setUrl] = useState('')

  function handleUploadStart(){
    setIsLoading(true)
    setProgress(0)
  }
  function handleProgress(progress){
      setProgress(progress)
  }
  function handleUploadError(error){
    setIsLoading(false)
    console.error(error)
  }
  function handleUploadSuccess(filename){
    setImagem(filename)
    setProgress(100)
    setIsLoading(false)

    fire.default.storage().ref('images').child(filename).getDownloadURL().then(url=>setUrl(url))

    alert('Arquivo carregado!')
  }

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
            <form className={classes.formulario} noValidade autoComplete="off">


                  <FirestoreCollection path="/mensagens">
                    {d=>{
                      if(d.isLoading)return <p><b>Carregando!</b></p>
                      if(d.value.length > 0){
                        return <List className={classes.lista}>
                                  {d.value.map((item, indice)=>{
                                    if(item['de'] == id){
                                      return <div>
                                            <ListItem>
                                                <ListItemAvatar>
                                                  <Avatar src={imgUsr} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                  primary={
                                                    <FirestoreDocument path={"/usuarios/"+item['de']}>
                                                      {d=>{
                                                        if(d.isLoading) return <span><b>Carregando!</b></span>;
                                                        if(d.value != null){
                                                          return <span>{d.value['nome']}</span>;
                                                        }
                                                      }}
                                                    </FirestoreDocument>
                                                  }
                                                  secondary={
                                                    <React.Fragment>
                                                      <Typography
                                                        component="span"
                                                        variant="band2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                      >
                                                      <FirestoreDocument path={"/contatos/"+item['para']}>
                                                        {d=>{
                                                          if(d.isLoading) return <span><b>Carregando!</b></span>;
                                                          if(d.value != null){
                                                            return <span>{d.value['nome']}</span>;
                                                          }
                                                        }}
                                                      </FirestoreDocument>
                                                      </Typography>
                                                      {" - "+item['mensagem']}
                                                      <br />
                                                      <img src={item['imagem']} />
                                                    </React.Fragment>
                                                  }
                                                />
                                             </ListItem>
                                             <Divider variant="inset" component="li" />
                                           </div>
                                         }
                                         if(item['para'] == id){
                                           return <div>
                                                 <ListItem>
                                                     <ListItemAvatar>
                                                       <Avatar src={imgUsr} />
                                                     </ListItemAvatar>
                                                     <ListItemText
                                                       primary={
                                                         <FirestoreDocument path={"/usuarios/"+item['para']}>
                                                           {d=>{
                                                             if(d.isLoading) return <span><b>Carregando!</b></span>;
                                                             if(d.value != null){
                                                               return <span>{d.value['nome']}</span>;
                                                             }
                                                           }}
                                                         </FirestoreDocument>
                                                       }
                                                       secondary={
                                                         <React.Fragment>
                                                           <Typography
                                                             component="span"
                                                             variant="band2"
                                                             className={classes.inline}
                                                             color="textPrimary"
                                                           >
                                                           <FirestoreDocument path={"/contatos/"+item['de']}>
                                                             {d=>{
                                                               if(d.isLoading) return <span><b>Carregando!</b></span>;
                                                               if(d.value != null){
                                                                 return <span>{d.value['nome']}</span>;
                                                               }
                                                             }}
                                                           </FirestoreDocument>
                                                           </Typography>
                                                           {" - "+item['mensagem']}
                                                         </React.Fragment>
                                                       }
                                                     />
                                                  </ListItem>
                                                  <Divider variant="inset" component="li" />
                                                </div>
                                              }
                                  })}
                               </List>
                      }
                    }}
                  </FirestoreCollection>
              <FirestoreCollection path="/contatos">
                {d=>{
                  if(d.isLoading) return <p><b>Carregando!</b></p>
                  if(d.value.length > 0){
                    return <FormControl fullWidth className={classes.entradas}>
                             <InputLabel id="selecione" >Contato:</InputLabel>
                             <NativeSelect fullWidth labelId="selecione" id="contato">
                                <option value="None" aria-label="None">Selecione...</option>
                                {d.value.map((item, indice)=>{
                                  if(item['idUsuario'] == id){
                                    return <option value={d.ids[indice]}>{item['nome']}</option>
                                  }
                                })}
                             </NativeSelect>
                           </FormControl>
                  }
                }}
              </FirestoreCollection>
              <TextField id="mensagem" label="Mensagem:" fullWidth className={classes.entradas} />
              <input  type="hidden" id="id" value={id} />
              <input id="arquivoUrl" type="hidden" value={url} />

              <FileUploader
                accept="image/*"
                name="imagem"
                randomizeFilename
                storageRef={fire.default.storage().ref('images')}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}>
              </FileUploader>

              <FirestoreMutation path="/mensagens" type="add">
                {({runMutation})=>{
                  return  <Button variant="contained" color="primary" fullWidth className={classes.entradas} onClick={()=>{
                    let contatoMsg = document.querySelector('#contato').value;
                    let mensagemMsg = document.querySelector('#mensagem').value;
                    let idMsg = document.querySelector('#id').value;
                    let imagemMsg = document.querySelector('#arquivoUrl').value;

                    let msg = { de: idMsg, mensagem: mensagemMsg, para: contatoMsg, imagem: imagemMsg };

                    runMutation(msg).then(res => {
                      alert('Mensgem enviada!')
                    }).catch(erro => {
                      alert('Erro ao salvar:', erro)
                    })
                  }}>
                    Enviar <Save />
                  </Button>
                }}
                </FirestoreMutation>
            </form>
         </div>
}

export default Mensagens;
