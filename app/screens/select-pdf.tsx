import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ComingSoonAlert from '../components/ComingSoonAlert';

// Mock data for PDF summaries
const pdfSummaries = [
  {
    id: '1',
    title: 'Research Paper on AI',
    date: '2024-03-20',
    preview: 'A comprehensive analysis of machine learning algorithms...',
    summary: 'Key findings about AI implementation...',
  },
  {
    id: '2',
    title: 'Business Report Q1',
    date: '2024-03-19',
    preview: 'Quarterly financial analysis and market trends...',
    summary: 'Financial insights and market analysis...',
  },
  {
    id: '3',
    title: 'Technical Documentation',
    date: '2024-03-18',
    preview: 'API documentation and implementation guidelines...',
    summary: 'Technical specifications and guidelines...',
  },
];

export default function SelectPDFScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const [showChatAlert, setShowChatAlert] = useState(false);

  const handlePDFSelect = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      setShowChatAlert(true);
    } catch (error) {
      console.error('Error selecting PDF:', error);
    }
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
          Select PDF
        </Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.subtitle, { color: isDark ? '#a0a0a0' : '#666666' }]}>
          Choose a PDF to discuss with AI
        </Text>

        {pdfSummaries.map((pdf) => (
          <TouchableOpacity
            key={pdf.id}
            style={[styles.pdfCard, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}
            onPress={() => handlePDFSelect()}
          >
            <View style={styles.pdfHeader}>
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={24}
                color={Colors[colorScheme ?? 'light'].tint}
              />
              <View style={styles.pdfInfo}>
                <Text style={[styles.pdfTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
                  {pdf.title}
                </Text>
                <Text style={[styles.pdfDate, { color: isDark ? '#a0a0a0' : '#666666' }]}>
                  {pdf.date}
                </Text>
              </View>
            </View>
            <Text 
              style={[styles.pdfPreview, { color: isDark ? '#a0a0a0' : '#666666' }]}
              numberOfLines={2}
            >
              {pdf.preview}
            </Text>
            <View style={styles.chatButton}>
              <MaterialCommunityIcons
                name="chat"
                size={20}
                color={Colors[colorScheme ?? 'light'].tint}
              />
              <Text style={[styles.chatButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>
                Chat about this PDF
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {pdfSummaries.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={48}
              color={isDark ? '#a0a0a0' : '#666666'}
            />
            <Text style={[styles.emptyStateText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              No PDFs available
            </Text>
            <Text style={[styles.emptyStateSubtext, { color: isDark ? '#808080' : '#999999' }]}>
              Upload a PDF to start chatting
            </Text>
          </View>
        )}
      </ScrollView>

      <ComingSoonAlert
        visible={showChatAlert}
        onClose={() => setShowChatAlert(false)}
        title="Chat Feature Coming Soon"
        message="We're working on bringing you an amazing chat experience with our AI assistant. Stay tuned for updates!"
        icon="chat"
      />
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
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  pdfCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pdfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pdfInfo: {
    marginLeft: 12,
    flex: 1,
  },
  pdfTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  pdfDate: {
    fontSize: 12,
  },
  pdfPreview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  chatButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
  },
}); 