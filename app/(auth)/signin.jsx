import { View, Text, TextInput, StyleSheet, Keyboard, TouchableOpacity, Alert, Vibration, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Feather } from '@expo/vector-icons';
import { MWH, VH } from '@/utils/Responsive';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
export default function SignIn() {
    const router = useRouter()

    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])


    const keyboardDissmiss = () => {

        Keyboard.dismiss();

    }
    const [formData, setFormData] = useState({

        username: "",
        password: "",

    })

    const [isLoading, setIsLoading] = useState(false)


    const inputHandleChange = (value, field) => {
        setFormData({
            ...formData,
            [field]: value
        });

    };

    // const SignInUser = async () => {
    //     if (formData.username === "" || formData.email === "") {



    //         ToastAndroid.showWithGravity("Please fill the field first", ToastAndroid.LONG, ToastAndroid.TOP)
    //         Vibration.vibrate()
    //         return;

    //     }


    //     try {
    //         setIsLoading(true)
    //         await signInWithEmailAndPassword(auth, formData.email, formData.password)
    //             .then((userCredential) => {

    //                 const user = userCredential.user;
    //                 const token = user?.stsTokenManager.accessToken;
    //                 AsyncStorage.setItem("auth", token)

    //                 console.log(user);

    //                 setIsLoading(false)

    //                 setFormData({

    //                     password: "",
    //                     email: "",

    //                 })

    //                 Alert.alert("Success", "Logged")
    //                 Vibration.vibrate()
    //                 router.replace('/(tabs)/home')

    //             })


    //     } catch (error) {
    //         const errorCode = error.code;
    //         console.log(errorCode);

    //         if (errorCode == "auth/invalid-email") {
    //             Alert.alert("Error", "Invalid username or password")

    //         }
    //         // let errorMessage = error.message.slice(10);

    //         // Alert.alert("Error", errorMessage)
    //         Vibration.vibrate()
    //         setIsLoading(false)
    //     } finally {
    //         setIsLoading(false)

    //     }



    // }

    const handleLogin = async () => {
        try {
            if (formData.username === "" || formData.password === "") {
                ToastAndroid.showWithGravity("Please fill the fields", ToastAndroid.LONG, ToastAndroid.TOP);
                Vibration.vibrate();
                return;
            }

            const data = {
                username: formData.username,
                password: formData.password
            };

            setIsLoading(true);

            const res = await axios.post("http://192.168.43.191:8000/api/login/", data);

            await AsyncStorage.setItem("token", res?.data?.accessToken);
            await AsyncStorage.setItem("user", JSON.stringify(res?.data?.dataUser));

            setFormData({
                username: "",
                password: "",
            });

            router.replace("/(tabs)/home");
        } catch (error) {
            console.log('Error caught:', error?.response?.data?.detail);

            if (error.response) {
                ToastAndroid.showWithGravity(`Server Error: ${error?.response?.data?.detail}`, ToastAndroid.LONG, ToastAndroid.TOP);
            } else if (error.request) {
                console.log('Error Request:', error.request);
                ToastAndroid.showWithGravity("Network Error: No response received", ToastAndroid.LONG, ToastAndroid.TOP);
            } else {
                console.log('Error Message:', error.detail);
                ToastAndroid.showWithGravity(`Error: ${error?.message}`, ToastAndroid.LONG, ToastAndroid.TOP);
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.background}>

            <View onStartShouldSetResponder={keyboardDissmiss} style={{
                flex: 1,
                padding: 25,
                backgroundColor: Colors.WHITE


            }}>



                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>

                    <Feather name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 30,
                    fontFamily: "OpenSans-Bold",
                    marginTop: VH(50),
                    color: "white"

                }}>
                    Let's Sign in to continue
                </Text>


                <View style={{ marginTop: 25 }}>
                    <View>
                        <Text style={{ fontFamily: "OpenSans-SemiBold", marginBottom: 10, fontSize: MWH(18), color: "white" }}>Email</Text>
                        <View>
                            <TextInput
                                spellCheck
                                keyboardAppearance='default'
                                value={formData.username}
                                placeholderTextColor={"white"}
                                onChangeText={(text) => inputHandleChange(text, 'username')}
                                autoFocus
                                cursorColor={"white"}
                                style={styles.input}
                                placeholder='Your username' />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontFamily: "OpenSans-SemiBold", marginBottom: 10, fontSize: MWH(18), color: "white" }}>Password</Text>
                        <View>
                            <TextInput
                                placeholderTextColor={"white"}

                                value={formData.password}
                                onChangeText={(text) => inputHandleChange(text, 'password')}
                                secureTextEntry
                                cursorColor={"white"}

                                style={styles.input}
                                placeholder='*************' />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={handleLogin} disabled={isLoading} style={styles.button}>
                            {
                                isLoading ? (
                                    <ActivityIndicator size="large" color={Colors.WHITE} />
                                ) : (
                                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, flexDirection: "row" }}>
                                        <Text style={{

                                            textAlign: "center", color: "black", fontSize: 18, fontFamily: "OpenSans-SemiBold",
                                            fontWeight: 500,
                                        }}>Connect</Text>
                                        <View style={{ marginTop: 3 }}>
                                            <FontAwesome6 name="arrow-right" size={20} color="black" />
                                        </View>


                                    </View>
                                )
                            }
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: "center", fontSize: 17 }}>
                        Don't have an account <Link style={{ color: "teal" }} href={"/auth/sign-up"}>create account</Link>
                    </Text>
                </View> */}
                    <TouchableOpacity className="flex items-center justify-end flex-row mt-4">

                        <Text className="text-base font-osSemiBold text-white">Forgot password?</Text>
                    </TouchableOpacity>

                    <View className="mt-4">
                        <Text className="font-osMedium text-center text-lg text-white">Don't have an account?

                            {" "}<Link className='font-osSemiBold ' href={"/(auth)/signup"}>Sign up</Link>
                        </Text>
                    </View>

                    {/* <View style={{ marginTop: 12 }}>

                    <TouchableOpacity onPress={() => router.push("/(auth)/signup")} style={{
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        backgroundColor: "transparent",
                        borderWidth: 2,
                        borderColor: Colors.GRAY,
                        borderRadius: 10
                    }}>
                        <Text style={{ textAlign: "center", fontSize: 17 }}>
                            create account
                        </Text>
                    </TouchableOpacity>

                </View> */}
                </View>


            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({

    input: {

        padding: 15,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: "white",
        fontSize: 18,
        color: "white"

    },
    button: {
        textAlign: "center",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 6,
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5

    },
    background: {
        flex: 1

    },


})