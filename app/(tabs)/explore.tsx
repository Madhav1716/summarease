import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function HistoryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Mock data for history items
  const historyItems = [
    {
      id: '1',
      title: 'Research Paper Summary',
      date: '2024-03-20',
      preview: 'A comprehensive analysis of machine learning algorithms...',
    },
    {
      id: '2',
      title: 'Business Report',
      date: '2024-03-19',
      preview: 'Quarterly financial analysis and market trends...',
    },
    {
      id: '3',
      title: 'Technical Documentation',
      date: '2024-03-18',
      preview: 'API documentation and implementation guidelines...',
    },
  ];

  const handleItemPress = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: Navigate to summary details
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
          History
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#a0a0a0' : '#666666' }]}>
          Your past summaries
        </Text>
      </View>

      {historyItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.historyCard, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}
          onPress={() => handleItemPress(item.id)}
        >
          <View style={styles.historyContent}>
            <View style={styles.historyHeader}>
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={24}
                color={Colors[colorScheme ?? 'light'].tint}
              />
              <View style={styles.historyTitleContainer}>
                <Text style={[styles.historyTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
                  {item.title}
                </Text>
                <Text style={[styles.historyDate, { color: isDark ? '#a0a0a0' : '#666666' }]}>
                  {item.date}
                </Text>
              </View>
            </View>
            <Text
              style={[styles.historyPreview, { color: isDark ? '#a0a0a0' : '#666666' }]}
              numberOfLines={2}
            >
              {item.preview}
            </Text>
          </View>
        </TouchableOpacity>
      ))}

      {historyItems.length === 0 && (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="history"
            size={48}
            color={isDark ? '#a0a0a0' : '#666666'}
          />
          <Text style={[styles.emptyStateText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            No summaries yet
          </Text>
          <Text style={[styles.emptyStateSubtext, { color: isDark ? '#808080' : '#999999' }]}>
            Your summarized PDFs will appear here
          </Text>
        </View>
      )}
    </ScrollView>
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  historyCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyContent: {
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 12,
  },
  historyPreview: {
    fontSize: 14,
    lineHeight: 20,
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
