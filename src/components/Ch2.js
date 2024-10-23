
import React, { useState, useEffect } from 'react';

const DiseaseDataComponent = () => {
    const [diseaseData, setDiseaseData] = useState(null);
    const [selectedDisease, setSelectedDisease] = useState('');
    const [selectedCities, setSelectedCities] = useState([]);

    useEffect(() => {
        // Fetch the disease data from local JSON file or endpoint
        fetch('../assets/india_disease_data.json')
            .then((response) => response.json())
            .then((data) => {
                setDiseaseData(data);
                if (Object.keys(data).length > 0) {
                    setSelectedDisease(Object.keys(data)[0]);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleDiseaseChange = (event) => {
        const selected = event.target.value;
        setSelectedDisease(selected);
        if (diseaseData && diseaseData[selected]) {
            setSelectedCities(Object.entries(diseaseData[selected]));
        }
    };

    return (
        <div className="disease-dashboard">
            <h1>India Disease Data</h1>
            <select value={selectedDisease} onChange={handleDiseaseChange}>
                {diseaseData &&
                    Object.keys(diseaseData).map((disease) => (
                        <option key={disease} value={disease}>
                            {disease}
                        </option>
                    ))}
            </select>

            <div className="city-list">
                {selectedCities.map(([city, info]) => (
                    <div key={city} className="city-info">
                        <h2>{city}</h2>
                        <p>Cases: {info.cases}</p>
                        <p>Severity: {info.severity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiseaseDataComponent;
