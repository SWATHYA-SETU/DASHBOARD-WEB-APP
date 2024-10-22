import React, { useState } from 'react';

const SymptomAnalyzer = () => {
  const [symptoms, setSymptoms] = useState({
    primarySymptom: '',
    secondarySymptom: '',
    optionalSymptom: ''
  });
  const [medicationType, setMedicationType] = useState('allopathy');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeSymptoms = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer AIzaSyAxhr2yUFOhVp-zALC3St4vTLq6GfjSmWQ`
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Given these symptoms:
              Primary: ${symptoms.primarySymptom}
              Secondary: ${symptoms.secondarySymptom}
              ${symptoms.optionalSymptom ? `Additional: ${symptoms.optionalSymptom}` : ''}
              
              Provide a medical analysis with:
              1. Three most likely conditions with probability percentages
              2. Recommended ${medicationType} medications for each condition
              3. Basic precautions and lifestyle recommendations
              
              Format as JSON:
              {
                "conditions": [
                  {
                    "name": "condition name",
                    "probability": number,
                    "medications": ["med1", "med2"],
                    "precautions": ["precaution1", "precaution2"]
                  }
                ]
              }`
            }]
          }]
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const results = JSON.parse(data.candidates[0].content.parts[0].text);
        setAnalysisResults(results);
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-semibold mb-6">Symptom Analysis</h2>
      
      <form onSubmit={analyzeSymptoms} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Symptom*
          </label>
          <input
            type="text"
            value={symptoms.primarySymptom}
            onChange={(e) => setSymptoms(prev => ({ ...prev, primarySymptom: e.target.value }))}
            placeholder="e.g., Fever"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secondary Symptom*
          </label>
          <input
            type="text"
            value={symptoms.secondarySymptom}
            onChange={(e) => setSymptoms(prev => ({ ...prev, secondarySymptom: e.target.value }))}
            placeholder="e.g., Cough"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Symptom
          </label>
          <input
            type="text"
            value={symptoms.optionalSymptom}
            onChange={(e) => setSymptoms(prev => ({ ...prev, optionalSymptom: e.target.value }))}
            placeholder="e.g., Fatigue (Optional)"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={medicationType}
            onChange={(e) => setMedicationType(e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="allopathy">Allopathy</option>
            <option value="homeopathy">Homeopathy</option>
            <option value="ayurvedic">Ayurvedic</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white rounded transition-colors ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}

      {analysisResults && (
        <div className="mt-6 space-y-4">
          {analysisResults.conditions.map((condition, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-blue-800">{condition.name}</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {condition.probability}% Likely
                </span>
              </div>

              <div className="grid gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Recommended Medications:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {condition.medications.map((med, idx) => (
                      <li key={idx} className="text-gray-600">{med}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Precautions:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {condition.precautions.map((precaution, idx) => (
                      <li key={idx} className="text-gray-600">{precaution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SymptomAnalyzer;