import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import Firebase from '../firebase';
const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

export default class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  };
  
  state = { name: "", email: "", password: "", check: false, errorMessage: null, loading: false }
 

  componentDidMount() {
    this.RegisterBackground = require('../assets/login.jpg');
  }


  
  handleSignUp = () => {
    this.setState({
      loading: true
    })
    let name=this.state.name
    let email=this.state.email
    let location= "new"
    let photo = "new"
      Firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(userCredentials => {
            userCredentials.user.updateProfile({displayName: this.state.name});
            Firebase.database().ref('UsersList/' + userCredentials.user.uid).set({
                name,
                email,
                location,
                photo
                
            }).then((data)=>{          
            setTimeout(() => {
              this.setState({
                loading: false,
              });
            }, 2500);
            
            }).catch((error)=>{
             //   console.log('error ' , error)
            })
          })
          .catch(error => this.setState({ errorMessage: error.message }));
          AsyncStorage.setItem('email', this.state.email, () => {
          })
          setTimeout(() => {
            this.setState({
              loading: false,
            });
          }, 500);
        
  };
  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
        <StatusBar hidden />
          <ImageBackground
            source={this.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          //fontFamily: 'montserrat-regular',
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Register
                      </Text>
                    </Block>

                    <Block flex={0.5} row middle space="between" style={{ marginBottom: 18 }}>
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="twitter"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.TWITTER}
                        style={[styles.social, styles.shadow]}
                      />

                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="google"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.GOOGLE}
                        style={[styles.social, styles.shadow]}
                      />
                      <GaButton
                        round
                        onlyIcon
                        shadowless
                        icon="facebook"
                        iconFamily="Font-Awesome"
                        iconColor={theme.COLORS.WHITE}
                        iconSize={theme.SIZES.BASE * 1.625}
                        color={nowTheme.COLORS.FACEBOOK}
                        style={[styles.social, styles.shadow]}
                      />
                    </Block>
                  </Block>
                  <Block flex={0.1} middle>
                    <Text
                      style={{
                        //fontFamily: 'montserrat-regular',
                        textAlign: 'center'
                      }}
                      muted
                      size={16}
                    >
                      or be classical
                    </Text>
                  </Block>
                  <Block flex={0.07} row style={styles.errorMessage}>
                  {this.state.errorMessage && (<Text style={styles.error}>{this.state.errorMessage}</Text>)}
                </Block>
                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Full Name"
                              onChangeText={name => this.setState({ name })}
                              value={this.state.name}
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          
                          <Block width={width * 0.8}>
                            <Input
                              placeholder="Email"
                              onChangeText={email => this.setState({ email })}
                              value={this.state.email}
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="email-852x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8}>
                            <Input
                              secureTextEntry
                              autoCapitalize="none"
                              placeholder="Password"
                              onChangeText={password => this.setState({ password })}
                              value={this.state.password}
                              style={styles.inputs}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="key-252x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block
                            style={{ marginVertical: theme.SIZES.BASE, marginLeft: 15}}
                            row
                            width={width * 0.75}
                          >
                            <Checkbox
                              onChange={ () => this.setState({check: !this.state.check}) }
                              checkboxStyle={{
                                borderWidth: 1,
                                borderRadius: 2,
                                borderColor: '#E3E3E3'
                              }}
                              color={nowTheme.COLORS.PRIMARY}
                              labelStyle={{
                                color: nowTheme.COLORS.HEADER,
                                //fontFamily: 'montserrat-regular'
                              }}
                              label="I agree to the terms and conditions."
                            />
                          </Block>
                        </Block>
                        {this.state.check && (<Text style={styles.error}>checkbox</Text>)}
                        <Block center>
                          <Button color="primary" round style={styles.createButton}>
                            <Text
                              size={14}
                              onPress={this.handleSignUp}
                              disabled={this.state.check}
                              color={nowTheme.COLORS.WHITE}
                            >
                              Get Started
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    backgroundColor: theme.COLORS.BLACK,
  
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    //marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  },
  errorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  }
});
