import { Link, router } from "expo-router";
import { onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "../../config/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auto-redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        router.replace("/(tabs)/home"); // ✅ Redirect to main app after login
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful!");
      Alert.alert("Success", "Login successful!");
      router.replace("/(tabs)/home"); // ✅ Go to main tabs screen
    } catch (error: any) {
      console.error("Login failed:", error.message);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Login
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
        onPress={handleLogin}
        style={{
          backgroundColor: "#007AFF",
          padding: 12,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>

      <Link href="/signup" style={{ marginTop: 15, textAlign: "center" }}>
        Don’t have an account? Sign up
      </Link>
    </View>
  );
}
