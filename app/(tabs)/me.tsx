import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../config/firebase";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ profileImage?: string; fullName?: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        setUserData(snap.data());
      }
    };

    fetchUser();
  }, []);

  if (!userData) return <Text style={{ padding: 20 }}>Loading...</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/profile/edit-profile" as any)}>
          <Image
            source={{ uri: userData.profileImage }}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.name}>{userData.fullName}</Text>
          <TouchableOpacity onPress={() => router.push("/profile/edit-profile" as any)}>
            <Text style={{ color: "#007bff" }}>See personal info →</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General</Text>

        <MenuItem title="Payment methods" />
        <MenuItem title="Reviews" />
        <MenuItem title="Notifications" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Others</Text>

        <MenuItem title="Settings" />
        <MenuItem title="Help center" />
        <MenuItem title="Rate our app" />
        <MenuItem title="Terms of service" />
        <MenuItem title="Privacy policy" />
      </View>
    </ScrollView>
  );
}

function MenuItem({ title }: { title: string }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>{title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 15,
    color: "#777",
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuText: { fontSize: 16 },
  arrow: { fontSize: 20, color: "#ccc" },
});
