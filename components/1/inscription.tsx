import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Image, FlatList, TextInput, Dimensions, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CoreStyles from "../../app/src/core/index"
import { dynamicFontSize } from '../../app/auth/style';
const { width, height } = Dimensions.get('screen');
// import { BlurView } from 'expo-blur';
type ItemData = {
    id: string;
    image: string;
    title: string;
};

const data: ItemData[] = [{
    id: '1',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '2',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '3',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '4',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '5',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '6',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '7',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '8',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '9',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '10',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '11',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '12',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '13',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '14',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '15',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '16',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '17',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '18',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '19',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '20',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '21',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '22',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}, {
    id: '23',
    image: 'https://res.cloudinary.com/lexium-enterprise/image/upload/v1695874155/l0vh9xamfhhmtzhjzwxr.png',
    title: '48 EVOL Benji',
}
];
const isOdd = data.length % 2 !== 0;

// If it's odd, add an empty item to the end to align the last item to the left
if (isOdd) {
    data.push({
        id: data.length.toString(),
        image: '',
        title: '',
    });
}

const Item = React.memo(({ data }: { data: ItemData }) => {
    if (!data.image) {
        // Render an empty placeholder for odd item count
        return <View style={styles.emptyItem} />;
    }
    return (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: data.image }}
                    style={styles.image}
                />
                <Image source={require('../../assets/btc-2.png')}
                    style={{ position: "absolute", top: 5, left: 5 }} />
                <Pressable style={{
                    position: "absolute", zIndex: 100,
                    bottom: 10, backgroundColor: "rgba(0, 0, 0, 0.7)", padding: 10,
                    width: "90%", borderRadius: 5, justifyContent: "center", alignItems: "center"
                }}>
                    <Text
                        style={[
                            CoreStyles.text({ fontFamily: 'Manrope_600SemiBold', fontSize: dynamicFontSize(12) }),
                            {
                                textAlign: 'center',
                                color: "white"
                            },
                        ]}
                    >
                        #{data.title}
                    </Text>
                </Pressable>
            </View>
        </View>
    )
})

const InscriptionsList = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{ gap: 10, width: "100%" }}
                data={data}
                renderItem={({ item, index }) => (
                    <Item data={data[index]} />
                )}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', gap: 10 }}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={4}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    itemContainer: {
        flex: 1,
        margin: 10,
        alignItems: "center",
    },
    imageContainer: {
        width: width / 2 - 20,
        height: width / 2 - 20, // To create a square
        backgroundColor: "#eeecf8",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    emptyItem: {
        width: width / 2 - 20,
        height: width / 2 - 20,
        // Adjust styles for empty placeholder
    },
});

export default InscriptionsList;
