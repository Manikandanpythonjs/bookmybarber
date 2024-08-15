import Intro from "@/components/Intro";
import { AuthContext } from "@/utils/context/AuthContext";
import { VH } from "@/utils/Responsive";
import { Redirect, Slot, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {


  const router = useRouter();
  const { currentUserToken } = useContext(AuthContext);

  useEffect(() => {
    if (currentUserToken) {
      router.push("/(tabs)/home");
    }
  }, [currentUserToken, router]);
  return (


    <SafeAreaView style={{ flex: 1 }}>
      {!currentUserToken && <Intro />}
    </SafeAreaView>


  );
}
