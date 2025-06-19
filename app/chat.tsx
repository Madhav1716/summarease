import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './constants/Colors';

const { width } = Dimensions.get('window');

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Start pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}
      edges={['top', 'left', 'right']}
    >
      <View style={[styles.header, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={isDark ? '#ffffff' : '#000000'}
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={[styles.headerTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Chat with AI
          </Text>
          <Text style={[styles.headerSubtitle, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            Coming Soon
          </Text>
        </View>
      </View>

      <Animated.View 
        style={[
          styles.comingSoonContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim }
            ]
          }
        ]}
      >
        <View style={[styles.card, { backgroundColor: isDark ? '#2a2a2a' : '#ffffff' }]}>
          <Animated.View 
            style={[
              styles.iconContainer,
              { 
                backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                transform: [{ scale: pulseAnim }]
              }
            ]}
          >
            <MaterialCommunityIcons
              name="robot"
              size={64}
              color={Colors[colorScheme ?? 'light'].tint}
            />
          </Animated.View>
          <Text style={[styles.comingSoonTitle, { color: isDark ? '#ffffff' : '#000000' }]}>
            Chat Feature Coming Soon
          </Text>
          <Text style={[styles.comingSoonText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
            We're working on bringing you an amazing chat experience with our AI assistant. Stay tuned for updates!
          </Text>
          <View style={styles.featuresContainer}>
            <FeatureItem 
              icon="message-text-outline"
              text="Ask questions about your documents"
              isDark={isDark}
            />
            <FeatureItem 
              icon="brain"
              text="Get intelligent responses"
              isDark={isDark}
            />
            <FeatureItem 
              icon="clock-outline"
              text="Coming in the next update"
              isDark={isDark}
            />
          </View>
          <View style={[styles.badge, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color={Colors[colorScheme ?? 'light'].tint}
            />
            <Text style={[styles.badgeText, { color: Colors[colorScheme ?? 'light'].tint }]}>
              Coming Soon
            </Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

interface FeatureItemProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
  isDark: boolean;
}

const FeatureItem = ({ icon, text, isDark }: FeatureItemProps) => (
  <View style={[styles.featureItem, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]}>
    <MaterialCommunityIcons
      name={icon}
      size={24}
      color={Colors[isDark ? 'dark' : 'light'].tint}
    />
    <Text style={[styles.featureText, { color: isDark ? '#a0a0a0' : '#666666' }]}>
      {text}
    </Text>
  </View>
);

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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: width - 40,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  comingSoonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  badgeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
}); 