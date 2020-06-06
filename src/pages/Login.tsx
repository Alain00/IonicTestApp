import { IonContent, IonPage, IonRow, IonCol, IonGrid, useIonViewWillEnter, useIonViewDidLeave, IonInput, IonItem, IonLabel} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import {TextField, Button, CircularProgress} from '@material-ui/core'

import { Storage, Plugins, Toast } from '@capacitor/core';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

const { Modals, GeolocationServicePlugin } = Plugins;


const Login = () => {
	//const styles = useStyles({});
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	
	const history = useHistory();

	const onLogin = (e: React.FormEvent)=> {
		e.preventDefault();
		login(username, password);
	}

	const login = async (username: string, password: string) => {
		setLoading(true);
		
		setTimeout(()=>{
			setLoading(false);
		}, 2000)
	}

	const handleUsername = (e: any) => {
		setUsername(e.detail.value)
	}
	const handlePassword = (e: any) => {
		setPassword(e.detail.value)
	}

	const tryToLogin = async () => {
		//setLoading(true);
		const tempUsername = await Storage.get({key: 'username'});
		const tempPassword = await Storage.get({key: 'password'});
		if (tempUsername && tempPassword){
			if (!tempUsername.value || !tempPassword.value) return;
			setUsername(tempUsername.value);
			setPassword(tempPassword.value);
			login(tempUsername.value, tempPassword.value);
		}
	}
	useEffect(()=>{
		tryToLogin();
	}, [])

	useIonViewDidLeave(()=>{
		setLoading(false)
	})

	return (
		<IonPage>
			<IonContent className="ion-padding">
				<IonGrid style={{height: '100%'}}>
					<IonRow className="ion-justify-content-center ion-align-items-center" style={{height: '100%'}}>
						<IonCol>
							<form onSubmit={onLogin}>
								{/* <h2>{username}</h2> */}
								{/* <TextField 
									// autoFocus 
									className='input'
									value={username}
									onChange={handleUsername} 
									label={'Username'}
									type='password'
									margin='normal' />
								<TextField 
									className='input' 
									value={password}
									onChange={handlePassword}
									label={'Password'} 
									type='password' 
									margin='normal' /> */}
								<IonItem>
									<IonLabel position="floating">Username</IonLabel>
									<IonInput
										value={username}
										onIonChange={handleUsername}
										type='text'/>
								</IonItem>
								<IonItem>
									<IonLabel position="floating">Password</IonLabel>
									<IonInput
										value={password}
										onIonChange={handlePassword}
										type='password'/>
								</IonItem>
								<Button 
									type='submit'
									variant='contained' 
									fullWidth 
									disabled={loading}
									color='primary'>
									{ !loading ?
									'Log in' :
									<CircularProgress color='secondary' /> }
								</Button>
							</form>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
  );
};

export default Login;
