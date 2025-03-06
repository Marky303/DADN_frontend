import PlantHeader from "../../components/PlantData/PlantHeader";
import PlantGraph from "../../components/PlantData/PlantGraph";
import PlantNotifications from "../../components/PlantData/PlantNotifications";

const PlantData = () => {
    return (
        <div
            style={{
                padding: 15 + "px",
                paddingTop: 3 + "px",
                backgroundColor: "rgb(237, 237, 237, 0.7)",
                height: 90.8 + "dvh",
                overflowY: "hidden"
            }}
        >
            <PlantHeader></PlantHeader>
            <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr", /* Chia thành 2 cột: 2 phần thông số - 1 phần Notifications */
                gap: 15 + " px"
            }}>
                
                <PlantGraph></PlantGraph>
                <PlantNotifications></PlantNotifications>
            </div>
        </div>
    );
};
export default PlantData;
