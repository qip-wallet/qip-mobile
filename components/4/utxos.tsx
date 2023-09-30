import React from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CoreStyles from "../../app/src/core/index"
import { dynamicFontSize } from '../../app/auth/style';

type ItemData = {
    id: string;
    action: string;
    txId: string;
    status: string;
    amount: string;
    senderAddress: string;
    sats: number
};

const data: ItemData[] = [{
    id: '1',
    action: 'Tx ID:',
    status: 'Amount',
    txId: "a1hz1a5fh7eidru34hw0e92ah",
    amount: "a1hz1a5fh7eidru34hw0e92ah",
    senderAddress: "a1hz1a5fh7eidru34hw0e92ah",
    sats: 100,
}, {
    id: '2',
    action: 'Tx ID:',
    status: 'Amount',
    txId: "a1hz1a5fh7eidru34hw0e92ah",
    amount: "a1hz1a5fh7eidru34hw0e92ah",
    senderAddress: "a1hz1a5fh7eidru34hw0e92ah",
    sats: 100,
},
{
    id: '3',
    action: 'Tx ID:',
    status: 'Amount',
    txId: "a1hz1a5fh7eidru34hw0e92ah",
    amount: "a1hz1a5fh7eidru34hw0e92ah",
    senderAddress: "a1hz1a5fh7eidru34hw0e92ah",
    sats: 100,
}, {
    id: '4',
    action: 'Tx ID:',
    status: 'Amount',
    txId: "a1hz1a5fh7eidru34hw0e92ah",
    amount: "a1hz1a5fh7eidru34hw0e92ah",
    senderAddress: "a1hz1a5fh7eidru34hw0e92ah",
    sats: 100,
},
{
    id: '5',
    action: 'Tx ID:',
    status: 'Amount',
    txId: "a1hz1a5fh7eidru34hw0e92ah",
    amount: "a1hz1a5fh7eidru34hw0e92ah",
    senderAddress: "a1hz1a5fh7eidru34hw0e92ah",
    sats: 100,
}, {
    id: '6',
    action: 'Tx ID:',
    status: 'Amount',
    txId: "a1hz1a5fh7eidru34hw0e92ah",
    amount: "a1hz1a5fh7eidru34hw0e92ah",
    senderAddress: "a1hz1a5fh7eidru34hw0e92ah",
    sats: 100,
}
];

const Item = React.memo(({ data }: { data: ItemData }) => (
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
                    fontSize: dynamicFontSize(12),
                }), { textAlign: "center" }]}>
                    {data.action}
                </Text>
                <Text style={[CoreStyles.text({
                    fontFamily: 'Manrope_500Medium',
                    fontSize: dynamicFontSize(10),
                    color: "rgba(163, 161, 161, 1)",
                }), { textAlign: "center" }]}>
                    {data.status}
                </Text>
            </View>
        </View>
        <View style={{
            flexDirection: "row", gap: 10, alignItems: "center",
            justifyContent: "flex-end"
        }}>
            <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
                <Text style={[CoreStyles.text({
                    fontFamily: 'Sora_600SemiBold',
                    fontSize: dynamicFontSize(12),
                }), { textAlign: "center" }]}>
                    {data.amount}
                </Text>
                <Text
                    ellipsizeMode='middle'
                    numberOfLines={1} // Add this line to specify the number of lines
                    style={[CoreStyles.text({
                        fontFamily: 'Manrope_500Medium',
                        fontSize: dynamicFontSize(10),
                        color: "rgba(163, 161, 161, 1)",
                    }), { textAlign: "center" }]}>
                    {`${data.sats} sats from ${data.senderAddress}`}
                </Text>
            </View>
        </View>
    </View>
));

const ActivitiesList = () => {
    const getItemCount = () => data.length;
    const getItem = (data: ItemData[], index: number) => data[index];
    return (
        <SafeAreaView style={styles.container}>
            <VirtualizedList
                data={data}
                initialNumToRender={4}
                renderItem={({ item }) => <Item data={item} />}
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
