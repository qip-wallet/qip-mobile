import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
export const dynamicFontSize = (size: number) => {
    return size * width / 375;
}
const styles = StyleSheet.create({
    text: {
        fontSize: dynamicFontSize(14),
    },
    button: {
        borderRadius: 5,
        padding: 10,
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
    },
    inputField: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
    },
    title: {
        fontSize: dynamicFontSize(24),
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: dynamicFontSize(20),
        width: "100%",
    }
});

export default styles;