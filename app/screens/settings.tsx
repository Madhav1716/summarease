import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const settingsItems = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: "shield-check",
      route: "screens/privacy-policy",
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: "file-document",
      route: "screens/terms-of-service",
    },
    {
      id: "data",
      title: "Data Management",
      icon: "database",
      route: "/screens/data-management",
    },
    {
      id: "about",
      title: "About",
      icon: "information",
      route: "/screens/about",
    },
  ];

  const handleItemPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
      ]}
      edges={["top", "left", "right"]}>
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? "#2a2a2a" : "#ffffff" },
        ]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={isDark ? "#ffffff" : "#000000"}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            { color: isDark ? "#ffffff" : "#000000" },
          ]}>
          Settings
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? "#ffffff" : "#000000" },
            ]}>
            Legal & Privacy
          </Text>
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.settingItem,
                { backgroundColor: isDark ? "#2a2a2a" : "#ffffff" },
              ]}
              onPress={() => handleItemPress(item.route)}>
              <View style={styles.settingItemContent}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color={Colors[colorScheme].tint}
                />
                <Text
                  style={[
                    styles.settingItemText,
                    { color: isDark ? "#ffffff" : "#000000" },
                  ]}>
                  {item.title}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={isDark ? "#666666" : "#999999"}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? "#ffffff" : "#000000" },
            ]}>
            App Information
          </Text>
          <View
            style={[
              styles.infoItem,
              { backgroundColor: isDark ? "#2a2a2a" : "#ffffff" },
            ]}>
            <Text
              style={[
                styles.infoLabel,
                { color: isDark ? "#a0a0a0" : "#666666" },
              ]}>
              Version
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: isDark ? "#ffffff" : "#000000" },
              ]}>
              1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
});
