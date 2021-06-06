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
import { firebaseConfig } from './config';
import { useSelector, useDispatch } from 'react-redux';
import Login from './components/login'

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

          <Login />


          <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.barra}>
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
