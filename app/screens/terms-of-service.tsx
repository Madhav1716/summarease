import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsOfServiceScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const handleEmailPress = () => {
    Linking.openURL('mailto:legal@aisummarizer.com');
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
          Terms of Service
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Acceptance of Terms
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            By using AI Summarizer, you agree to these Terms of Service. If you do not agree, please do not use the service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Service Description
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            AI Summarizer provides PDF text extraction and AI-powered summarization services. We reserve the right to modify or discontinue the service at any time.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            User Responsibilities
          </Text>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Provide accurate information
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Maintain account security
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Use the service legally
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Prohibited Uses
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            You may not:
          </Text>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="close-circle" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Upload malicious files
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="close-circle" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Violate copyright laws
            </Text>
          </View>
          <View style={styles.listItem}>
            <MaterialCommunityIcons name="close-circle" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.listText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              Attempt to reverse engineer the service
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Limitation of Liability
          </Text>
          <Text style={[styles.text, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            AI Summarizer is provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of our service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Contact
          </Text>
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}
            onPress={handleEmailPress}
          >
            <MaterialCommunityIcons name="email" size={20} color={Colors[colorScheme].tint} />
            <Text style={[styles.contactText, { color: Colors[colorScheme].tint }]}>
              legal@aisummarizer.com
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