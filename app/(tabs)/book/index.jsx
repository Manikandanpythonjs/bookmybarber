import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MWH } from '@/utils/Responsive'
import { ShopCard } from '@/components/ShopCard'

export default function Book() {
    data = [{

        id: 1,
        name: "Malaisiya",
        ownername: "John",
        location: "Near milk shop , Keelasival patti",
        image: "https://picsum.photos/id/57/367/267"

    },
    {

        id: 2,
        name: "Soona",
        ownername: "Soona",
        location: "Near Bus Stand , Keelasival patti",
        image: "https://picsum.photos/id/43/367/267"

    },
    {

        id: 3,
        name: "RMK",
        ownername: "Kannan",
        location: "Near Work shop , Keelasival patti",
        image: "https://picsum.photos/id/49/367/267"

    }]
    return (

        <SafeAreaView>
            {/* <ScrollView> */}
            <View style={{ padding: 25 }}>
                <View>
                    <Text className="font-osSemiBold text-3xl text-yellow-500">Booknow!</Text>
                    <Text className="font-osSemiBold text-lg text-gray-400">Choose the shop</Text>
                </View>
                <View style={{ marginTop: MWH(0) }}>
                    <ShopCard data={data} />
                </View>
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}