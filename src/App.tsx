import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './css/main.css';

/* Theme variables */
import './theme/variables.css';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {Provider as ReduxProdvider} from 'react-redux';

import {Plugins} from '@capacitor/core';
const { StatusBar } = Plugins;



const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#fff'
    },
  }
})

StatusBar.setBackgroundColor({
  color: theme.palette.primary.dark
})


const App: React.FC = () => (
  <ReduxProdvider store={null}>
    <IonReactRouter>
      <IonApp>
        <ThemeProvider theme={theme}>
          <IonRouterOutlet>
            <Route path="/login" component={Login} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </IonRouterOutlet>
        </ThemeProvider>
      </IonApp>
    </IonReactRouter>
  </ReduxProdvider>
);

export default App;
