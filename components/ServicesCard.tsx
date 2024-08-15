import { View, Text, FlatList, ListRenderItem, Image } from 'react-native';
import React from 'react';

interface Card {
    name: string;
    image: string;
    // Add other properties if needed
}

interface ServicesCardProps {
    data: Card[];
}

const ServicesCard: React.FC<ServicesCardProps> = ({ data }) => {
    const renderItem: ListRenderItem<Card> = ({ item }) => (
        <View style={{ alignItems: "center", justifyContent: "center", rowGap: 10, marginLeft: 20 }}>
            <Image source={{ uri: item.image }} className="w-[100px] h-[100px] rounded-3xl" />
            <Text className="text-center font-osSemiBold text-base text-gray-400">{item.name}</Text>
            {/* Render other properties of `item` here if needed */}
        </View>
    );

    return (
        <View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};

export default ServicesCard;
