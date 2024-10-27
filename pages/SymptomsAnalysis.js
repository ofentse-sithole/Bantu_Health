import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Navbar from '../components/Navbar/Navbar';

const SymptomsAnalysis = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [result, setResult] = useState(null);
  const [emptyInputMessage, setEmptyInputMessage] = useState(false);

  const symptoms = [
    'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea',
    'Sore Throat', 'Body Aches', 'Shortness of Breath',
    'Dizziness', 'Chest Pain'
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prevSymptoms) =>
      prevSymptoms.includes(symptom)
        ? prevSymptoms.filter((s) => s !== symptom)
        : [...prevSymptoms, symptom]
    );
  };

  const analyzeSymptoms = async () => {
    if (!additionalInfo.trim()) {
      setEmptyInputMessage(true);
      return;
    }
    setEmptyInputMessage(false);
    setLoading(true);
    try {
      const analysisResult = await analyzeSymptomsWithAPI(selectedSymptoms, additionalInfo);
      setResult(analysisResult);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeSymptomsWithAPI = async (symptoms, additionalInfo) => {
    try {
      const response = await fetch('https://vitality-health-api.vercel.app/api/analyze-symptoms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms: symptoms,
          additionalInfo: additionalInfo,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.analysis;
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="medical-bag" size={32} color="#007AFF" />
          <Text style={styles.title}>BantuHealthAI</Text>
        </View>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
       

        <Text style={styles.sectionTitle}>Select Your Symptoms</Text>
        <View style={styles.symptomsContainer}>
          {symptoms.map((symptom) => (
            <TouchableOpacity
              key={symptom}
              style={[
                styles.symptomButton,
                selectedSymptoms.includes(symptom) && styles.selectedSymptom,
                styles.elevation
              ]}
              onPress={() => toggleSymptom(symptom)}
            >
              <Text style={[
                styles.symptomText,
                selectedSymptoms.includes(symptom) && styles.selectedSymptomText,
              ]}>
                {symptom}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Additional Information</Text>
        <TextInput
          style={[styles.input, styles.elevation]}
          multiline
          numberOfLines={4}
          placeholder="Describe your symptoms in detail..."
          placeholderTextColor="#666"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />

        {emptyInputMessage && (
          <Text style={styles.errorMessage}>Please provide additional information about your symptoms.</Text>
        )}

        <TouchableOpacity
          style={[styles.analyzeButton, styles.elevation]}
          onPress={analyzeSymptoms}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialCommunityIcons name="brain" size={24} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.analyzeButtonText}>Analyze Symptoms</Text>
            </>
          )}
        </TouchableOpacity>

        {result && (
          <View style={[styles.resultContainer, styles.elevation]}>
            <Text style={styles.resultTitle}>Analysis Results</Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingBottom: 10,
  },
  scrollView: {
    paddingHorizontal: 20,
    marginBottom: 60
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Add this line
    marginVertical: 24,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 12,
    color: '#1A1A1A',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  symptomButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginVertical: 6,
    width: '48%',
  },
  selectedSymptom: {
    backgroundColor: '#007AFF',
  },
  symptomText: {
    textAlign: 'center',
    color: '#1A1A1A',
    fontWeight: '500',
  },
  selectedSymptomText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    minHeight: 120,
    fontSize: 16,
    color: '#1A1A1A',
  },
  errorMessage: {
    color: '#DC3545',
    marginBottom: 16,
    fontSize: 14,
  },
  analyzeButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1A1A1A',
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1A1A',
  },
  elevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default SymptomsAnalysis;