import React, { useState } from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Image, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CoreStyles from "../../app/src/core/index"
import { dynamicFontSize } from '../../app/auth/style';

type ItemData = {
    id: string;
    title: string;
    sub: string;
    value: string;
    name: string;
    state: "locked" | "unlocked"
};

const Item = ({ data, setData, index }: { data: ItemData, setData: (index: number) => void, index: number }) => {

    const toggleLock = () => {
        setData(index);
    };

    return (
        <View style={{
            backgroundColor: "transparent",
            flexDirection: "row",
            height: "auto",
            margin: 10,
            justifyContent: "space-between",
        }}>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                <View style={{ alignItems: "flex-start" }}>
                    <Text style={[CoreStyles.text({
                        fontFamily: 'Sora_600SemiBold',
                        fontSize: dynamicFontSize(12)
                    }), { textAlign: "center" }]}>
                        {data.title}
                    </Text>
                    <Text style={[CoreStyles.text({
                        fontFamily: 'Manrope_500Medium',
                        fontSize: dynamicFontSize(10),
                        color: "rgba(163, 161, 161, 1)"
                    }), { textAlign: "center" }]}>
                        {data.sub}
                    </Text>
                </View>
                <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
                    <Text style={[CoreStyles.text({
                        fontFamily: 'Sora_400Regular',
                        fontSize: dynamicFontSize(12),
                    }), { textAlign: "center" }]}>
                        {data.value}
                    </Text>
                    <Text
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        style={[CoreStyles.text({
                            fontFamily: 'Manrope_500Medium',
                            fontSize: dynamicFontSize(10),
                            color: "rgba(163, 161, 161, 1)"
                        }), { textAlign: "left" }]}>
                        {data.name}
                    </Text>
                </View>
            </View>
            <Pressable style={{ alignItems: "flex-end", justifyContent: "center" }} onPress={toggleLock}>
                {data.state === "locked" ? (
                    <MaterialCommunityIcons name='lock' color="gray" size={22} />
                ) : (
                    <MaterialCommunityIcons name='lock-open' color="gray" size={22} />
                )}
            </Pressable>
        </View>
    );
};

const ActivitiesList = () => {
    const [data, setData] = useState<ItemData[]>(
        [{
            id: '1',
            title: 'Sat Point',
            value: '3488389:1:78',
            sub: "Name",
            name: "Pizza",
            state: "unlocked"
        }, {
            id: '2',
            title: 'Received',
            value: '3488389:1:78',
            sub: "Name",
            name: "Pizza",
            state: "unlocked"
        },
        {
            id: '3',
            title: 'Sat Point',
            value: '3488389:1:78',
            sub: "Name",
            name: "Pizza",
            state: "unlocked"
        }, {
            id: '4',
            title: 'Received',
            value: '3488389:1:78',
            sub: "Name",
            name: "Pizza",
            state: "unlocked"
        },
        {
            id: '5',
            title: 'Sat Point',
            value: '3488389:1:78',
            sub: "Name",
            name: "Pizza",
            state: "unlocked"
        }, {
            id: '6',
            title: 'Received',
            value: '3488389:1:78',
            sub: "Name",
            name: "Pizza",
            state: "unlocked"
        }
        ])

    const getItemCount = () => data.length;
    const getItem = (data: ItemData[], index: number) => data[index];

    const handleLockStatusChange = (index: number) => {
        const newData = [...data];
        newData[index].state = newData[index].state === "locked" ? "unlocked" : "locked";
        setData(newData);
    };

    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                data={data}
                initialNumToRender={4}
                renderItem={({ item, index }) => <Item data={item} setData={handleLockStatusChange} index={index} />}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: "100%",
        backgroundColor: "rgba(243, 249, 255, 0.9)",
        borderRadius: 10,
        padding: 10,
    },
});

export default ActivitiesList;
