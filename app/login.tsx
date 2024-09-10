import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import { router } from "expo-router";

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

  const sendCode = () => {
    setIsCodeSent(true);
  };

  const confirmCode = () => {
    if (verificationCode) {
      // Redirect to the index page of the (tabs) group
      router.replace("/(tabs)");
    }
  };

  const handleSOSPress = () => {
    Linking.openURL("tel:108");
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
      <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
        <Text style={styles.sosButtonText}>EMERGENCY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  input: {
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d1d5db",
  },
  sosButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  sosButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LoginScreen;
