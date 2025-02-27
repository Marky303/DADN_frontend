const PlantParameter = ({ label, value, unit, range, bgColor }) => {
    return (
        <div style={{ backgroundColor: bgColor, padding: "15px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
                <h4 style={{ margin: 0 }}>{label}</h4>
                <small>Desired range: {range}</small>
            </div>
            <p style={{ fontSize: "32px", fontWeight: "bold", margin: 0 }}>
                {value}{unit}
            </p>
        </div>
    );
};

export default PlantParameter;