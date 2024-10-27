import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Navbar from './Navbar/Navbar.js';

const SymptomsAnalysis = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="medical-bag" size={32} color="#2ecc71" />
          <Text style={styles.title}>HealthAI</Text>
        </View>
        <View style={styles.poweredByContainer}>
            <Text style={styles.poweredByText}>Powered by</Text>
            <MaterialCommunityIcons name="gemini" size={32} color="#2ecc71" />
        </View>

        <View style={styles.symptomsContainer}>
          {symptoms.map((symptom) => (
            <TouchableOpacity
              key={symptom}
              style={[
                styles.symptomButton,
                selectedSymptoms.includes(symptom) && styles.selectedSymptom,
              ]}
              onPress={() => toggleSymptom(symptom)}
            >
              <Text
                style={[
                  styles.symptomText,
                  selectedSymptoms.includes(symptom) && styles.selectedSymptomText,
                ]}
              >
                {symptom}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="Describe any additional symptoms or concerns..."
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
        />

        {emptyInputMessage && (
          <Text style={styles.errorMessage}>Please enter additional information.</Text>
        )}

        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={analyzeSymptoms}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.analyzeButtonText}>Analyze with Gemini AI</Text>
          )}
        </TouchableOpacity>

        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        ) : null}
      </ScrollView>
      <Navbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  poweredByContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  poweredByText: {
    fontSize: 14,
    color: '#888',
  },
  symptomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  symptomButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    width: '48%',
  },
  selectedSymptom: {
    backgroundColor: '#2ecc71',
  },
  symptomText: {
    textAlign: 'center',
    color: '#000',
  },
  selectedSymptomText: {
    color: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  analyzeButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  analyzeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#000',
  },
});

export default SymptomsAnalysis;
