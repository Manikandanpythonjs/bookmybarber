import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { MWH, SW, VH, } from '@/utils/Responsive';

export default function Voucher() {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", elevation: 1, backgroundColor: "white", borderRadius: 10, padding: 10 }}>
                <View>
                    <Text className="font-osSemiBold text-2xl text-secondary-200">-40% </Text>
                    <Text className="font-osSemiBold text-base">Voucher for your next haircut service</Text>
                </View>
                <View>
                    <Image
                        style={{ width: SW(250), height: MWH(300) }}
                        resizeMode='contain'

                        source={require("../assets/images/offer.png")}
                    />
                </View>
            </View>
        </View>
    );
}
