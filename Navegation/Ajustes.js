import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth, signOut } from '@firebase/auth';

const Settings = ({ navigation }) => {
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Inicio');
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  const navigateToEditProfile = () => {
    navigation.navigate("EditarPerfil");
  };

  const navigateToSecurity = () => {
    console.log("Security function");
  };

  const navigateToNotifications = () => {
    console.log("Notifications function");
  };

  const navigateToPrivacy = () => {
    console.log("Privacy function");
  };

  const navigateToSubscription = () => {
    console.log("Subscription function");
  };

  const navigateToSupport = () => {
    console.log("Support function");
  };

  const navigateToTermsAndPolicies = () => {
    console.log("Terms and Policies function");
  };

  const navigateToFreeSpace = () => {
    console.log("Free Space function");
  };

  const navigateToDateSaver = () => {
    console.log("Date saver");
  };

  const navigateToReportProblem = () => {
    console.log("Report a problem");
  };

  const addAccount = () => {
    console.log("Aadd account ");
  };

  const logout = () => {
    handleSignOut(); // Utiliza la función handleSignOut para cerrar sesión
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Editar Perfil",
      action: navigateToEditProfile,
    },
    { icon: "security", text: "Seguridad", action: navigateToSecurity },
    {
      icon: "notifications-none",
      text: "Notificaciones",
      action: navigateToNotifications,
    },
    { icon: "lock-outline", text: "Privacidad", action: navigateToPrivacy },
  ];

  const supportItems = [
    { icon: "help-outline", text: "Ayuda y Soporte", action: navigateToSupport },
    {
      icon: "info-outline",
      text: "Terminos & Politicas",
      action: navigateToTermsAndPolicies,
    },
  ];

  const actionsItems = [
    {
      icon: "outlined-flag",
      text: "Reportar un problema",
      action: navigateToReportProblem,
    },
    { icon: "people-outline", text: "Agregar cuenta", action: addAccount },
    { icon: "logout", text: "Cerrar Sesion", action: logout },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: COLORS.gray,
      }}
    >
      <MaterialIcons name={icon} size={24} color="black" />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.semiBold,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Settings</Text>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Cuenta</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
            Soporte e Informacion{" "}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Acciones</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
