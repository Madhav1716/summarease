import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL('mailto:privacy@aisummarizer.com');
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}
      edges={['top', 'left', 'right']}
    >
      <View style={[styles.header, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
          Privacy Policy
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Data Collection
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            We collect and process the following data:
          </Text>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="file-pdf-box" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Uploaded PDF files (temporarily)
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="text-box" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Extracted text from PDFs
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="text-box-check" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Generated summaries
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Data Usage
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            Your data is used exclusively for:
          </Text>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="robot" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Generating AI-powered summaries
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="history" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Storing your summary history
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Data Retention
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            • PDF files are deleted immediately after processing{'\n'}
            • Summaries are stored locally on your device{'\n'}
            • You can delete your summary history at any time
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Data Security
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            • All data transmission is encrypted{'\n'}
            • Files are processed securely on our servers{'\n'}
            • No third-party access to your data
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Contact Us
          </Text>
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}
            onPress={handleEmailPress}
          >
            <MaterialCommunityIcons name="email" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.contactText, { color: Colors[colorScheme].tint }]}>
              privacy@aisummarizer.com
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Last Updated
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            March 20, 2024
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
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
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listText: {
    fontSize: 16,
    marginLeft: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
}); 