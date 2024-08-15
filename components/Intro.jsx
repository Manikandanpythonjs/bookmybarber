import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { VH } from '@/utils/Responsive'
import { useRouter } from 'expo-router'

export default function Intro() {
    const route = useRouter()
    return (
        <View className="flex-1 bg-transparent">
            <View className="h-full">

                <View>
                    <Image
                        resizeMode='cover'
                        style={{ width: "100%", height: VH(420) }}
                        source={require("../assets/images/intro.png")} />

                </View>

                <View style={{ marginTop: VH(-35) }} className="p-5 bg-white h-full rounded-r-2xl rounded-l-2xl shadow-2xl">
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", height: VH(300) }}>
                        <Text className="text-3xl font-osSemiBold text-center">
                            Welcome to{" "}

                            <Text className="text-[#FFC801] ">
                                BookMyBarber!
                            </Text>

                        </Text>
                        <Text className="mt-3 font-osSemiBold text-base text-center ">
                            Effortlessly book your next haircut or salon service with just a few taps. Discover top-rated barbers and stylists, customize your appointment, and enjoy a seamless grooming experience.
                        </Text>
                        <View className="mt-6 w-full">
                            <TouchableOpacity onPress={() => route.push("/(auth)/signin")} className="w-full bg-[#FFC801] rounded-md px-2 py-3">
                                <Text className="text-white text-center font-osSemiBold text-xl">Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
                {/* <Text style={{ color: "coral" }} className="text-3xl font-osSemiBold">BookMyBarber</Text> */}



            </View>
        </View>
    )
}