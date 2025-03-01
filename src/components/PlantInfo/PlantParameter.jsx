const PlantParameter = ({ label, value, unit, range, bgColor }) => {
    return (
        <div style={{ backgroundColor: bgColor, padding: 15 + "px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <h4 style={{ fontSize: 30 + "px", fontWeight: 500, margin: 0 }}>{label}</h4>
                <small style={{ fontSize: 17 + "px", fontWeight: 500 }}>Desired range: {range}</small>
            </div>
            <p style={{ fontSize: 55 + "px", fontWeight: 700, margin: 0 }}>
                {value}{unit}
            </p>
        </div>
    );
};

export default PlantParameter;