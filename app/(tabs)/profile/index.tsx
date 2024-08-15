import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/utils/context/AuthContext';
import { MWH } from '@/utils/Responsive';

interface Barber {
    address: string;
    age: number;
    avatar_url: string;
    barberId: string;
    name: string;
    phonenumber: string;
    seatnumber: number;
    updated_at: string;
}

interface User {
    avatar_url: string;
    email: string;
    userId: string;
    username: string;
}

interface Order {
    barber: Barber;
    bookedDate: string;
    bookingId: string;
    booking_At: string;
    count: number;
    token: number;
    updated_At: string;
    user: User;
}

type OrdersResponse = Order[];

export default function Profile() {
    const { currentUser, setCurrentUser, setCurrentUserToken, currentUserToken } = useContext(AuthContext);
    const [getUserOrders, setUserOrders] = useState<OrdersResponse>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const router = useRouter();

    const logout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");

            const response = await axios.post("http://192.168.43.191:8000/api/logout/");
            console.log(response.data);

            setCurrentUser(null);
            setCurrentUserToken(null);

            router.replace("/(auth)/signin");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const getOrders = async () => {
        try {
            setIsLoading(true);
            const token = currentUserToken;
            const userid = currentUser?.userId;

            console.log("Fetching orders with userID:", userid, "and token:", token);

            if (!userid || !token) {
                console.log("No userID or token provided. Please log in.");
                return;
            }

            const res = await axios.get<OrdersResponse>(`http://192.168.43.191:8000/api/booking/${userid}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setUserOrders(res.data);
        } catch (error: any) {
            console.log('Error fetching orders:', error.response ? error.response.data : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getOrders();
        setRefreshing(false);
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{ padding: 25 }}>
                    <View>
                        <Text className="font-osSemiBold text-3xl text-yellow-500">Booknow!</Text>
                        <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 5 }}>
                            <Image className="w-[80px] h-[80px] rounded-full" source={{ uri: currentUser?.avatar_url }} />
                            <Text className="font-osSemiBold text-lg text-gray-400">{currentUser?.username}</Text>
                        </View>
                        <View>
                            <Text className="font-osSemiBold text-base text-gray-400">Karaikudi, Tamil nadu</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: "#FFC801", padding: 10, borderRadius: 5, marginTop: 10 }} onPress={logout}>
                                <Text style={{ color: "white", fontSize: MWH(15), textAlign: "center", fontWeight: "bold" }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text className="font-osSemiBold text-2xl text-yellow-500">Orders!</Text>

                            {isLoading ? (
                                <View style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                    <ActivityIndicator size={"large"} color={"#FFC801"} />
                                </View>
                            ) : getUserOrders.length === 0 ? (
                                <Text>No orders found.</Text>
                            ) : (
                                getUserOrders.map((order, index) => (
                                    <View key={index} style={{ marginVertical: 10, elevation: 5, backgroundColor: "white", padding: 15, borderRadius: 10 }}>
                                        <Image source={{ uri: order.barber.avatar_url }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                        <Text className="font-osSemiBold text-2xl">Token: {order.token}</Text>
                                        <Text className="font-osMedium text-lg">{order.barber.name}</Text>
                                        <Text className="text-secondary-200">Booking ID: {order.bookingId}</Text>
                                        <Text className="text-gray-600">
                                            Booked Date: {new Date(order.bookedDate).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </Text>
                                        <Text className="text-gray-600">
                                            Booked At: {new Date(order.booking_At).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </Text>
                                    </View>
                                ))
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}