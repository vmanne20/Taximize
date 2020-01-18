import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Button from './Button';
import FormTextInput from './FormTextInput';
import ImageLogo from '../../Resources/tax-logo.jpg';

function LoginTemplate({navigation, signIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={ImageLogo} style={styles.logo} />
      <View style={styles.form}>
        <FormTextInput
          style={styles.textField}
          value={email}
          placeholder="Username"
          onChangeText={text => setEmail(text)}
        />
        <FormTextInput
          style={styles.textField}
          value={password}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
        <Button
          label={'Login'}
          onPress={() => signIn(email, password)}
        />
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={{color: "rgba(0,0,0,0.7)"}}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LoginTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: "rgb(116, 189, 189)"
    //marginHorizontal: 25
  },
  logo: {
    flex: 2,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: 'rgb(116, 189, 189)',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
    //backgroundColor: 'red',
    //marginHorizontal: 25
  },
});
