import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../config/firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signup successful!");
      Alert.alert("Success", "Signup successful!");
      router.replace("/(tabs)/home"); // ✅ Navigate after signup
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Sign Up
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TouchableOpacity
        onPress={handleSignup}
        style={{
          backgroundColor: "#34C759",
          padding: 12,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign Up</Text>
      </TouchableOpacity>

      <Link href="/login" style={{ marginTop: 15, textAlign: "center" }}>
        Already have an account? Log in
      </Link>
    </View>
  );
}
