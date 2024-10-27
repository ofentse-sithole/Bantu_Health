import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CustomTabButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={styles.customTabButton}
        onPress={onPress}
    >
        <View style={styles.customTabButtonInner}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const isActiveRoute = (routeName) => {
        return route.name === routeName;
    };

    return (
        <View style={styles.navbarContainer}>
            <TouchableOpacity 
                style={[styles.tab, isActiveRoute("Dashboard") && styles.activeTab]} 
                onPress={() => navigation.navigate("Dashboard")}
            >
                <MaterialCommunityIcons 
                    name="home" 
                    size={24} 
                    color={isActiveRoute("Dashboard") ? "#2ecc71" : "#333"} 
                />
                <Text style={[styles.tabText, isActiveRoute("Dashboard") && styles.activeTabText]}>
                    Home
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.tab, isActiveRoute("SymptomsAnalysis") && styles.activeTab]} 
                onPress={() => navigation.navigate("SymptomsAnalysis")}
            >
                <MaterialCommunityIcons 
                    name="robot" 
                    size={24} 
                    color={isActiveRoute("SymptomsAnalysis") ? "#2ecc71" : "#333"} 
                />
                <Text style={[styles.tabText, isActiveRoute("SymptomsAnalysis") && styles.activeTabText]}>
                    HealthAI
                </Text>
            </TouchableOpacity>

            <CustomTabButton onPress={() => navigation.navigate("Ambulance")}>
                <MaterialCommunityIcons name="ambulance" size={32} color="#fff" />
            </CustomTabButton>

            <TouchableOpacity 
                style={[styles.tab, isActiveRoute("ClinicFinder") && styles.activeTab]} 
                onPress={() => navigation.navigate("ClinicFinder")}
            >
                <MaterialCommunityIcons 
                    name="hospital-marker" 
                    size={24} 
                    color={isActiveRoute("ClinicFinder") ? "#2ecc71" : "#333"} 
                />
                <Text style={[styles.tabText, isActiveRoute("ClinicFinder") && styles.activeTabText]}>
                    Clinic
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.tab, isActiveRoute("Settings") && styles.activeTab]} 
                onPress={() => navigation.navigate("Settings")}
            >
                <MaterialCommunityIcons 
                    name="cog" 
                    size={24} 
                    color={isActiveRoute("Settings") ? "#2ecc71" : "#333"} 
                />
                <Text style={[styles.tabText, isActiveRoute("Settings") && styles.activeTabText]}>
                    Settings
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbarContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 80,
        backgroundColor: "#fff",
        borderRadius: 20,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    tab: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        height: 50,
    },
    activeTab: {
        borderRadius: 12,
    },
    tabText: {
        color: "#333",
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },
    activeTabText: {
        color: "#2ecc71",
        fontWeight: '600',
    },
    customTabButton: {
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customTabButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E32F45',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E32F45',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    }
});

export default Tabs;
