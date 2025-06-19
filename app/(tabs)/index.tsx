import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import * as DocumentPicker from "expo-document-picker";
import { DocumentPickerAsset } from "expo-document-picker";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import ComingSoonAlert from "../components/ComingSoonAlert";
import PrivacyDisclaimer from "../components/PrivacyDisclaimer";
import { generateSummary } from "../config/api";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<DocumentPickerAsset | null>(
    null
  );
  const [showChatAlert, setShowChatAlert] = useState(false);
  const [showSettingsAlert, setShowSettingsAlert] = useState(false);
  const [showPrivacyDisclaimer, setShowPrivacyDisclaimer] = useState(false);
  const [comingSoonAlert, setComingSoonAlert] = useState<{
    visible: boolean;
    title: string;
    message: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
  }>({ visible: false, title: "", message: "", icon: "clock-outline" });

  const handlePrivacyAccept = () => {
    setShowPrivacyDisclaimer(false);
    handleUpload();
  };

  const handlePrivacyDecline = () => {
    setShowPrivacyDisclaimer(false);
  };

  const handleUpload = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const selectedAsset = result.assets[0];
      setSelectedFile(selectedAsset);
      setIsLoading(true);

      // Upload the PDF to the backend for text extraction
      const formData = new FormData();
      formData.append("pdf", {
        uri: selectedAsset.uri,
        name: selectedAsset.name,
        type: "application/pdf",
      } as any);

      const response = await fetch(
        "https://aisummarybackend.onrender.com/extract-text",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to extract text from PDF");
      }

      const { extractedText } = await response.json();

      // Send the extracted text to OpenAI for summarization
      try {
        const generatedSummary = await generateSummary(extractedText);
        setSummary(generatedSummary);

        // Store the summary
        const newSummary = {
          id: Date.now().toString(),
          text: generatedSummary,
          fileName: selectedAsset.name,
          timestamp: Date.now(),
        };

        const storedSummaries = await AsyncStorage.getItem("summaries");
        const summaries = storedSummaries ? JSON.parse(storedSummaries) : [];
        await AsyncStorage.setItem(
          "summaries",
          JSON.stringify([...summaries, newSummary])
        );
      } catch (error) {
        Alert.alert("Error", "Failed to generate summary. Please try again.");
        console.error("Summary generation error:", error);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload PDF. Please try again.");
      console.error("Upload error:", error);
      setIsLoading(false);
    }
  };

  const handleFeaturePress = (featureId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    switch (featureId) {
      case "upload":
        setShowPrivacyDisclaimer(true);
        break;
      case "fast":
        setComingSoonAlert({
          visible: true,
          title: "Fast Summaries Coming Soon",
          message:
            "We're working on making our summaries even faster. Stay tuned for updates!",
          icon: "lightning-bolt",
        });
        break;
      case "ai":
        setComingSoonAlert({
          visible: true,
          title: "Enhanced AI Features Coming Soon",
          message:
            "We're working on bringing you more advanced AI capabilities. Stay tuned for updates!",
          icon: "brain",
        });
        break;
      case "formats":
        setComingSoonAlert({
          visible: true,
          title: "More Formats Coming Soon",
          message:
            "We're working on supporting more document formats. Stay tuned for updates!",
          icon: "file-document",
        });
        break;
      case "chat":
        setComingSoonAlert({
          visible: true,
          title: "Chat Feature Coming Soon",
          message:
            "We're working on bringing you an amazing chat experience with our AI assistant. Stay tuned for updates!",
          icon: "chat",
        });
        break;
      case "settings":
        router.push("/screens/settings");
        break;
    }
  };

  const features = [
    {
      id: "fast",
      icon: "lightning-bolt" as const,
      title: "Fast Summaries",
      description: "Get summaries in seconds",
    },
    {
      id: "ai",
      icon: "brain" as const,
      title: "AI Powered",
      description: "Advanced AI technology",
    },
    {
      id: "formats",
      icon: "file-document" as const,
      title: "Multiple Formats",
      description: "Support for all PDFs",
    },
    {
      id: "chat",
      icon: "chat" as const,
      title: "Chat with AI",
      description: "Ask questions about your PDFs",
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5" },
      ]}
      edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text
            style={[styles.title, { color: isDark ? "#ffffff" : "#000000" }]}>
            AI PDF Summarizer
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isDark ? "#a0a0a0" : "#666666" },
            ]}>
            Get instant AI-powered summaries of your PDFs
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.uploadCard,
            { backgroundColor: isDark ? "#2a2a2a" : "#ffffff" },
          ]}
          onPress={handleUpload}
          disabled={isLoading}>
          <BlurView intensity={80} style={styles.uploadContent}>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color={Colors[colorScheme ?? "light"].tint}
              />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="file-pdf-box"
                  size={48}
                  color={Colors[colorScheme ?? "light"].tint}
                />
                <Text
                  style={[
                    styles.uploadText,
                    { color: isDark ? "#ffffff" : "#000000" },
                  ]}>
                  {selectedFile ? "Upload Another PDF" : "Upload PDF"}
                </Text>
                <Text
                  style={[
                    styles.uploadSubtext,
                    { color: isDark ? "#a0a0a0" : "#666666" },
                  ]}>
                  {selectedFile
                    ? selectedFile.name
                    : "Tap to select a PDF file"}
                </Text>
              </>
            )}
          </BlurView>
        </TouchableOpacity>

        {summary && (
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: isDark ? "#2a2a2a" : "#ffffff" },
            ]}>
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons
                name="text-box-check"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
              <Text
                style={[
                  styles.summaryTitle,
                  { color: isDark ? "#ffffff" : "#000000" },
                ]}>
                Generated Summary
              </Text>
            </View>
            <ScrollView style={styles.summaryContent}>
              <Text
                style={[
                  styles.summaryText,
                  { color: isDark ? "#ffffff" : "#000000" },
                ]}>
                {summary}
              </Text>
            </ScrollView>
          </View>
        )}

        <View style={styles.featuresContainer}>
          <Text
            style={[
              styles.featuresTitle,
              { color: isDark ? "#ffffff" : "#000000" },
            ]}>
            Features
          </Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={[
                  styles.featureCard,
                  { backgroundColor: isDark ? "#2a2a2a" : "#ffffff" },
                ]}
                onPress={() => handleFeaturePress(feature.id)}>
                <MaterialCommunityIcons
                  name={feature.icon}
                  size={24}
                  color={Colors[colorScheme ?? "light"].tint}
                />
                <Text
                  style={[
                    styles.featureTitle,
                    { color: isDark ? "#ffffff" : "#000000" },
                  ]}>
                  {feature.title}
                </Text>
                <Text
                  style={[
                    styles.featureDescription,
                    { color: isDark ? "#a0a0a0" : "#666666" },
                  ]}>
                  {feature.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <PrivacyDisclaimer
        visible={showPrivacyDisclaimer}
        onAccept={handlePrivacyAccept}
        onDecline={handlePrivacyDecline}
      />

      <ComingSoonAlert
        visible={showChatAlert}
        onClose={() => setShowChatAlert(false)}
        title="Chat Feature Coming Soon"
        message="We're working on bringing you an amazing chat experience with our AI assistant. Stay tuned for updates!"
        icon="chat"
      />

      <ComingSoonAlert
        visible={showSettingsAlert}
        onClose={() => setShowSettingsAlert(false)}
        title="Settings Coming Soon"
        message="We're working on bringing you more customization options. Stay tuned for updates!"
        icon="cog"
      />

      <ComingSoonAlert
        visible={comingSoonAlert.visible}
        onClose={() =>
          setComingSoonAlert((prev) => ({ ...prev, visible: false }))
        }
        title={comingSoonAlert.title}
        message={comingSoonAlert.message}
        icon={comingSoonAlert.icon}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  uploadCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  uploadContent: {
    padding: 40,
    alignItems: "center",
  },
  uploadText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 12,
  },
  summaryContent: {
    maxHeight: 300,
    padding: 16,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
  },
  featuresContainer: {
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
  },
});
