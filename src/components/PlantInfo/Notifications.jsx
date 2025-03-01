const Notifications = ({ notifications }) => {
    return (
        <div style={{ backgroundColor: "#D3D3D3", padding: "15px", borderRadius: "10px" }}>
            <h4>Notifications</h4>

            {/* Vùng cuộn chứa các thông báo*/}
            <div style={{ maxHeight: "170px", overflowY: "auto", marginTop: "10px", borderTop: "1px solid gray", paddingTop: "10px" }}>
                {notifications.map((notif, index) => (
                    <p
                        key={index + 2}
                        style={{
                            backgroundColor: notif.type === "alert" ? "#FF6B6B" : "#AEEEEE",
                            padding: "10px",
                            borderRadius: "5px"
                        }}
                    >
                        {notif.message} <br />
                        <small>{notif.time}</small>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
