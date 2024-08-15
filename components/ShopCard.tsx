import { View, Text, FlatList, Image, ListRenderItem, TouchableOpacity } from 'react-native'
import React from 'react'
import { MWH } from '@/utils/Responsive';
import { useRouter } from 'expo-router';

interface ShopItems {
    id: number,
    name: string;
    image: string;
    ownername: string,
    location: string
}

interface ShopDetails {
    data: ShopItems[];
}
export const ShopCard: React.FC<ShopDetails> = ({ data }) => {
    const router = useRouter()
    const renderItem: ListRenderItem<ShopItems> = ({ item }) => (
        <TouchableOpacity onPress={() => router.push("/(tabs)/book/orders")} style={{ marginTop: MWH(30), elevation: 2, backgroundColor: "white", padding: MWH(20), borderRadius: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: 10 }}>

                <Image source={{ uri: item.image }} className="w-[100px] h-[100px] rounded-3xl" />
                <Text className="text-center font-osSemiBold text-base text-yellow-500">{item.name}</Text>
            </View>

            <View style={{ marginTop: MWH(10) }}>
                <Text className="font-osSemiBold text-sm text-gray-400">{item.ownername}</Text>
                <Text className="font-osSemiBold text-sm text-gray-400">{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};
