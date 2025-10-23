import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const signedUp = await AsyncStorage.getItem("isSignedUp");
      if (signedUp === "true") {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
      }
    }, 2500); // 2.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* You can replace this text with your logo 
      <Image
        source={require("../assets/vidora-logo.png")} // Replace with your logo file
        style={{ width: 120, height: 120, marginBottom: 20 }}
      /> */}
      <Text style={styles.text}>VIDORA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // black background
  },
  text: {
    color: "#ff0050", // brand color
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 3,
  },
});
