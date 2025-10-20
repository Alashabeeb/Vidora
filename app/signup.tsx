import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Signup() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Vidora </Text>
      <Button title="Continue" onPress={() => router.replace("/(tabs)/home")} />
    </View>
  );
}
