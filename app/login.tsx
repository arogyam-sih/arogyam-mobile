import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
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
    <View className="flex-1 justify-center items-center p-6">
      {!isCodeSent ? (
        <>
          <TextInput
            className="w-full p-4 mb-4 border rounded-lg border-gray-300"
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
            className="w-full p-4 mb-4 border rounded-lg border-gray-300"
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

export default LoginScreen;
