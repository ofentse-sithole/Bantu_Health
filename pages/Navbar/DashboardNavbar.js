// Navbar.js
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";

const CustomTabButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    const navigation = useNavigation();

    return (
        <View style={[styles.navbarContainer, styles.shadow]}>
            {/* Ambulance (Central Button) */}
            <CustomTabButton onPress={() => navigation.navigate("Ambulance")}>
                <Icon name="ambulance" size={28} color="#fff" />
            </CustomTabButton>
        </View>
    );
};

const styles = StyleSheet.create({
    navbarContainer: {
        flexDirection: "row",
        justifyContent: "center",  // Center the ambulance button in the navbar
        alignItems: "center",
        height: 90,
        backgroundColor: "#fff",
        borderRadius: 15,
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
    },
    shadow: {
        shadowColor: '#007BFF',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
});

export default Tabs;
