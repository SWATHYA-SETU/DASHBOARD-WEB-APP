
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Plot from 'react-plotly.js';
import 'leaflet/dist/leaflet.css';

const MedicineSales = () => {
    const [medicineData, setMedicineData] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        // Fetching the data from the local JSON file or an API endpoint
        fetch('../assets/medsale.json')
            .then((response) => response.json())
            .then((data) => {
                setMedicineData(data);
                setSelectedMedicine(data.medicines[0].name);  // Set first medicine as default
                setSalesData(data.medicines[0].sales);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleMedicineChange = (event) => {
        const medicineName = event.target.value;
        setSelectedMedicine(medicineName);
        const medicine = medicineData.medicines.find(med => med.name === medicineName);
        setSalesData(medicine.sales);
    };

    return (
        <div className="medicine-sales-dashboard">
            <h1>Medicine Sales Dashboard</h1>

            {/* Medicine Selection Dropdown */}
            <select value={selectedMedicine} onChange={handleMedicineChange}>
                {medicineData && medicineData.medicines.map((medicine) => (
                    <option key={medicine.name} value={medicine.name}>
                        {medicine.name} - {medicine.used_for}
                    </option>
                ))}
            </select>

            {/* Map Component */}
            <MapContainer center={[23.5937, 78.9629]} zoom={5} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {salesData.map((sale, idx) => (
                    <Marker key={idx} position={[sale.lat, sale.lng]}>
                        <Popup>
                            {sale.city}, {sale.state}<br />
                            Units Sold: {sale.units_sold}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Plotly Bar Chart for Sales */}
            <Plot
                data={[
                    {
                        type: 'bar',
                        x: salesData.map(sale => sale.state),
                        y: salesData.map(sale => sale.units_sold),
                        text: salesData.map(sale => sale.units_sold.toLocaleString()),
                        textposition: 'auto',
                        marker: {
                            color: salesData.map(sale => sale.units_sold > 50000 ? '#E31A1C' : '#FC4E2A')
                        }
                    }
                ]}
                layout={{
                    title: `${selectedMedicine} Sales by State`,
                    xaxis: { title: 'State' },
                    yaxis: { title: 'Units Sold' },
                    margin: { t: 30, b: 100 }
                }}
                style={{ width: "100%", height: "400px" }}
            />
        </div>
    );
};

export default MedicineSales;
