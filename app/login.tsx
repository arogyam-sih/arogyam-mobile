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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";

const LoginScreen: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

  const sendCode = () => {
    if (name && phoneNumber) {
      // Here you would typically call your backend API to send the verification code
      console.log(`Sending code to ${phoneNumber} for ${name}`);
      setIsCodeSent(true);
    } else {
      // You might want to show an error message here
      console.log("Please enter both name and phone number");
    }
  };

  const confirmCode = async () => {
    if (verificationCode) {
      try {
        // Here you would typically verify the code with your backend
        console.log(`Verifying code: ${verificationCode}`);

        // If verification is successful, save the user's name
        await AsyncStorage.setItem("userName", name);
        await AsyncStorage.setItem("userToken", "some-unique-token"); // Set a user token to indicate logged in state

        // Redirect to the index page of the (tabs) group
        router.replace("/(tabs)");
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else {
      // You might want to show an error message here
      console.log("Please enter the verification code");
    }
  };

  const handleSOSPress = () => {
    Linking.openURL("tel:108");
  };

  return (
    <View style={styles.container}>
      {!isCodeSent ? (
        <>
          <Image
            source={require("../assets/images/arogyam.png")}
            style={{
              width: 699 / 3,
              height: 331 / 3,
              backgroundColor: "rgb(0,0,0)",
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            onChangeText={(text) => setName(text)}
            value={name}
          />
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
