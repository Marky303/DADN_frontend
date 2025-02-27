import React, { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pagestyles/info.css";
import AuthContext from "../../context/UserauthContext";

const PersonalInfo = () => {
    const { sendRequest } = useContext(AuthContext);

    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    // Lấy dữ liệu người dùng từ API khi component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await sendRequest(null, "info");
                if (data) {
                    setUser({
                        name: data.Name || "",
                        email: data.email || "",
                        phone: data.PhoneNumber || "",
                        dob: data.DateOfBirth ? dayjs(data.DateOfBirth).format("YYYY-MM-DD") : "",
                        gender: data.Gender || "",
                        address: data.Address || "",
                        image: data.Image || "https://bloganchoi.com/wp-content/uploads/2024/11/poster-comeback-cho-digital-single-pickleball-1-1068x601.jpg",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Xử lý thay đổi giá trị input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    // Gửi dữ liệu cập nhật lên server
    const handleSave = async () => {
        try {
            const response = await sendRequest(user, "update_info_user");
            if (response) {
                setIsEditing(false);
            } else {
                alert("Cập nhật thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Error updating user info:", error);
            alert("Có lỗi xảy ra khi cập nhật thông tin!");
        }
    };

    return (
        <div className="container rounded bg-white mt-5 mb-5 p-4 shadow" style={{ maxHeight: "80vh", overflowY: "auto", background: "linear-gradient(to right, #E0FFFF, #87CEFA)" }}>
            <div className="row">
                {/* Profile Image */}
                <div className="col-md-3 border-end d-flex flex-column align-items-center text-center p-4 profile-image-container">
                    <img id="myimg" src={user.image} className="rounded-circle shadow mt-3" width="150px" height="150px" alt="Profile" />
                    <button className="btn profile-button image-button mt-2">Edit Image</button>
                </div>

                {/* Personal Information */}
                <div className="col-md-8 p-4">
                    <h4 className="text-primary mb-3">Personal Information</h4>

                    {/* Name & Email */}
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label className="labels">Full Name</label>
                            <input type="text" className="form-control" name="name" value={user.name || ""} onChange={handleChange} disabled={!isEditing} />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Email</label>
                            <input type="email" className="form-control" value={user.email || ""} readOnly disabled/>
                        </div>
                    </div>

                    {/* Gender & Date of Birth */}
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label className="labels">Gender</label>
                            <input type="text" className="form-control" name="gender" value={user.gender || ""} onChange={handleChange} disabled={!isEditing} />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Date of Birth</label>
                            <input type="date" className="form-control" name="dob" value={user.dob || ""} onChange={handleChange} disabled={!isEditing} />
                        </div>
                    </div>

                    {/* Phone & Address */}
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label className="labels">Phone Number</label>
                            <input type="text" className="form-control" name="phone" value={user.phone || ""} onChange={handleChange} disabled={!isEditing} />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Address</label>
                            <input type="text" className="form-control" name="address" value={user.address || ""} onChange={handleChange} disabled={!isEditing} />
                        </div>
                    </div>

                    <div className="text-end mt-4">
                        {isEditing ? (
                            <>
                                <button className="btn btn-secondary me-2" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button className="btn btn-success" onClick={handleSave}>Save</button>
                            </>
                        ) : (
                            <button className="btn profile-button" onClick={() => setIsEditing(true)}>Edit Information</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
