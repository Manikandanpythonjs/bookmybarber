import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';

interface CategoryProps {
    name: string;
    image: any;
    selectedCategory?: string;
    setSelectedCategory?: React.Dispatch<React.SetStateAction<string>>
    setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
    modalVisible?: boolean
}

const Category: React.FC<CategoryProps> = React.memo(({ name, image, selectedCategory, setSelectedCategory, setModalVisible, modalVisible }) => {
    const handlePress = () => {
        if (selectedCategory) {
            setSelectedCategory!(name)
            setModalVisible!(!modalVisible)
            console.log('Selected category:', selectedCategory);
        }


    };

    return (
        <View className="rounded-3xl p-4" style={{ elevation: 1, backgroundColor: "white" }}>
            <TouchableOpacity className="flex items-center justify-center w-20" onPress={handlePress}>
                <Image source={image} className="w-[40px] h-[40px]" />
                <Text className="font-osSemiBold text-sm text-gray-400 text-center">{name}</Text>
            </TouchableOpacity>
        </View>
    );
});

export default Category;