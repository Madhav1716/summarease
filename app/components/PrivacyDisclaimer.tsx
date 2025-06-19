import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PrivacyDisclaimerProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function PrivacyDisclaimer({ visible, onAccept, onDecline }: PrivacyDisclaimerProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="shield-check" size={32} color={Colors.light.tint} />
          </View>
          
          <Text style={styles.title}>Privacy Notice</Text>
          
          <Text style={styles.text}>
            🔒 Your uploaded PDF will be processed securely and deleted immediately after summarization.
          </Text>
          
          <Text style={styles.text}>
            We do not store your files or share any data with third parties.
          </Text>
          
          <Text style={styles.text}>
            Please do not upload sensitive or personal information unless you are comfortable with our processing.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={onDecline}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
              <Text style={styles.acceptButtonText}>Accept & Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 12,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  declineButton: {
    backgroundColor: '#f5f5f5',
  },
  acceptButton: {
    backgroundColor: Colors.light.tint,
  },
  declineButtonText: {
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
  acceptButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
}); 