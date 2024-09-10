import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useNavigation } from "@react-navigation/native";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const sendCode = () => {
    setIsCodeSent(true);
  };

  const confirmCode = () => {
    if (verificationCode) {
      navigation.navigate("(tabs)", { screen: "index" });
    }
  };

  return (
    <View style={styles.container}>
      {!isCodeSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
          />
          <Button title="Send Code" onPress={sendCode} />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            keyboardType="number-pad"
            onChangeText={(text) => setVerificationCode(text)}
            value={verificationCode}
          />
          <Button title="Confirm Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  input: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#d1d5db',
  },
});

export default LoginScreen;
