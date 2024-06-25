//core
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

//components
import {CButton} from '../../componets/Button/CButton';
import {TextInputcus} from '../../componets/INPUT/TextInput';

//firebase
import {auth} from '../../firebase/Config';
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { CText } from '../../componets/Text/CustomText';

export const LoginScreen = () => {
  const navigation = useNavigation();
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.navigate('main');
      }
    });
    return unsubscribe; // cleanup subscription on unmount
  }, [navigation]);

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          navigation.navigate('main', {user: userCredential.user});
          setErrorMessage('');
          setEmail('');
          setPassword('');
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      setErrorMessage('Please enter an email and password');
    }
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{padding: 12}}>
        <TextInputcus
          label="Email"
          mode="outlined"
          onChange={setEmail}
          value={email}
        />
        <TextInputcus
          label="Password"
          mode="outlined"
          secureTextEntry
          onChange={setPassword}
          value={password}
        />
        <CButton text="Ingresar" mode="contained" onPress={handleLogin} />
        {errorMessage ? <CText style={styles.errorText} >{errorMessage}</CText> : null}

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
