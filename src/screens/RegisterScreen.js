import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

import NCMB, { NCMBUser, NCMBObject, NCMBQuery, 
  NCMBFile, NCMBAcl, NCMBRole, 
  NCMBRequest, NCMBRelation, NCMBGeoPoint, 
  NCMBInstallation, NCMBPush } from 'ncmb-react-native';

export default function RegisterScreen({ navigation }) {

  const [name, setName] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const passwordError = passwordValidator(password.value)
    if (passwordError || nameError) {
      setName({ ...name, error: nameError })
      setPassword({ ...password, error: passwordError })
      return
    }

    const user = new NCMBUser;
    user
      .set('userName', name.value)
      .set('password', password.value);
      (async () => {
        try {
          // Block of code to try
          const res = await user.signUpByAccount();
          navigation.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          })
       }
       catch(err) {
           // Block of code to handle errors
           alert(JSON.stringify(err));
       }
      })();
    
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
