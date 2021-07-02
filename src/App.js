import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, BottomNavigation, BottomNavigationAction  } from '@material-ui/core/';
import { Save, RecentActors, ExitToApp, AccountBox, Forum } from '@material-ui/icons/';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import { FirestoreCollection, FirestoreDocument, FirestoreMutation, FirestoreProvider } from '@react-firebase/firestore';
import { BrowserRouter as Router, Redirect, Route, Switch, Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import * as fire from 'firebase/app';
import { firebaseConfig } from './config';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/login'
import Cadastrar from './components/usuario/cadastro';
import Perfil from './components/usuario/perfil';
import Agenda from './components/agenda/agenda';
import Mensagem from './components/mensagens';
import Contato from './components/agenda/contato';
import Cabecalho from './components/cabecalho';

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

function App(props) {
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


  return (
    <React.Fragment>
      <Router>
        <FirestoreProvider firebase={fire.default} {...firebaseConfig}>



          <Switch>

            <Route path="/login">
              <div>
                <Cabecalho tipo="" />
                {conectado ? <Redirect to="/mensagens"/> : <Login /> }
              </div>
            </Route>
            <Route path="/cadastro">
              <div>
                <Cabecalho tipo="cadastro" />
                {conectado ? <Redirect to="/mensagens"/> : <Cadastrar /> }
              </div>
            </Route>
            <Route path="/mensagens">
              <div>
                <Cabecalho tipo="" />
                {conectado ? <Mensagem /> : <Redirect to="/login" /> }
              </div>
            </Route>
            <Route path="/agenda">
              <div>
                <Cabecalho tipo="" />
                {conectado ? <Agenda /> : <Redirect to="/login" /> }
              </div>
            </Route>
            <Route path="/contato">
              <div>
                <Cabecalho tipo="contato" />
                {conectado ? <Contato /> : <Redirect to="/login" /> }
              </div>
            </Route>

            <Route path="/perfil">
              <div>
                <Cabecalho tipo="" />
                {conectado ? <Perfil /> : <Redirect to="/perfil" /> }
              </div>
            </Route>

            <Redirect from="*" to="/login" />
          </Switch>


          <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.barra}>
            <BottomNavigationAction label="Perfil" value="perfil" className={classes.barraItem} component={Link} to="/perfil" icon={<AccountBox />} ></BottomNavigationAction>
            <BottomNavigationAction label="Agenda" value="agenda" className={classes.barraItem} component={Link} to="/agenda" icon={<RecentActors />} />
            <BottomNavigationAction label="Mensagens" value="mensagens" className={classes.barraItem} component={Link} to="/mensagens" icon={<Forum />} />
            <BottomNavigationAction label="Logout" value="logout" className={classes.barraItem} icon={<ExitToApp />} onClick={()=>{
                addUsuario({nome:'', telefone: '', icone: '', email: '', senha:''})
                addId('')
                addConectado(false)
                console.warn('Logout:', id, usuario, conectado);
              }} />
          </BottomNavigation>
        </FirestoreProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
