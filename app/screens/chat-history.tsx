import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ComingSoonAlert from '../components/ComingSoonAlert';

export default function ChatHistoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const [showChatAlert, setShowChatAlert] = useState(false);

  const handleSummarySelect = (summaryId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShowChatAlert(true);
  };

  const summaries = [
    {
      id: '1',
      title: 'Sample Summary 1',
      date: '2024-03-20',
      preview: 'This is a preview of the first summary...',
    },
    {
      id: '2',
      title: 'Sample Summary 2',
      date: '2024-03-19',
      preview: 'This is a preview of the second summary...',
    },
  ];

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
          Chat History
        </Text>
      </View>

      <View style={styles.summaryList}>
        {summaries.map((summary) => (
          <TouchableOpacity
            key={summary.id}
            style={[styles.summaryCard, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}
            onPress={() => handleSummarySelect(summary.id)}
          >
            <Text style={[styles.summaryTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
              {summary.title}
            </Text>
            <Text style={[styles.summaryDate, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              {summary.date}
            </Text>
            <Text style={[styles.summaryPreview, { color: isDark ? '#a0a0a0' : '#666666' }]}>
              {summary.preview}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
    padding: 20,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryList: {
    padding: 16,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryDate: {
    fontSize: 14,
    marginBottom: 8,
  },
  summaryPreview: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 