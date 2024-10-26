// Navbar.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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
            {/* Home */}
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Dashboard")}>
                <Icon name="home" size={24} color="#007BFF" />
                <Text style={styles.tabText}>Home</Text>
            </TouchableOpacity>

            {/* Clinic */}
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("ClinicFinder")}>
                <Icon name="map-marker" size={24} color="#007BFF" />
                <Text style={styles.tabText}>Clinic</Text>
            </TouchableOpacity>

            {/* Ambulance (Central Button) */}
            <CustomTabButton onPress={() => navigation.navigate("Ambulance")}>
                <Icon name="ambulance" size={28} color="#fff" />
            </CustomTabButton>

            {/* Alerts */}
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Alerts")}>
                <Icon name="bell" size={24} color="#007BFF" />
                <Text style={styles.tabText}>Alerts</Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate("Settings")}>
                <Icon name="cogs" size={24} color="#007BFF" />
                <Text style={styles.tabText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbarContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 90,
        backgroundColor: "#fff",
        borderRadius: 15,
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
    },
    tab: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    tabText: {
        color: "#333",
        fontSize: 12,
        marginTop: 5,
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
