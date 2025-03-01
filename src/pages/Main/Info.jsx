import React, { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pagestyles/info.css";
import AuthContext from "../../context/UserauthContext";

const PersonalInfo = () => {
    const { sendRequest, user } = useContext(AuthContext);

    const [isEditing, setIsEditing] = useState(false);

    // Lấy dữ liệu người dùng từ API khi component mount
    useEffect(() => {
        sendRequest(0, "info");
    }, []);

    // Load dữ liệu người dùng vào form khi component mount
    useEffect(() => {
        if (user) {
            let element;
            const fieldList = [
                "Name",
                "email",
                "Gender",
                "DateOfBirth",
                "PhoneNumber",
                "Address",
            ];
            for (let i of fieldList) {
                element = document.getElementsByName(i)[0];
                if (i == "DateOfBirth") element.setAttribute("value", dayjs(user[i]).format("YYYY-MM-DD"));
                else if (i == "Gender") {
                    if (element)
                        element.value = user[i];
                }
                else element.setAttribute("value", user[i]);
            }
        }
    }, [user])

    // Gửi dữ liệu cập nhật lên server
    const handleSubmit = async (e) => {
        e.preventDefault();
        const successful = await sendRequest(e, "update_info_user");
        if (successful)
            setIsEditing(false);
    }

    return (
        <div className="container rounded bg-white mt-5 mb-5 p-4 shadow" style={{ maxHeight: "80vh", overflowY: "auto", background: "linear-gradient(to right, #E0FFFF, #87CEFA)" }}>
            <div className="row">
                {/* Profile Image */}
                <div className="col-md-3 border-end d-flex flex-column align-items-center text-center p-4 profile-image-container">
                    <img id="myimg" src="https://bloganchoi.com/wp-content/uploads/2024/11/poster-comeback-cho-digital-single-pickleball-1-1068x601.jpg" className="rounded-circle shadow mt-3" width="150px" height="150px" alt="Profile" />
                    <button className="btn profile-button image-button mt-2">Edit Image</button>
                </div>

                {/* Personal Information */}
                <form onSubmit={e => handleSubmit(e)} className="col-md-8 p-4">
                    <h4 className="text-primary mb-3">Personal Information</h4>

                    {/* Name & Email */}
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label className="labels">Full Name</label>
                            <input type="text" className="form-control" name="Name" disabled={!isEditing} />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Email</label>
                            <input type="email" className="form-control" name="email" disabled={true} />
                        </div>
                    </div>

                    {/* Gender & Date of Birth */}
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label className="labels">Gender</label>
                            <select className="w-100 border-0" name="Gender" disabled={!isEditing} style={{ height: 64 + "%", borderRadius: 5 + "px", padding: 8 + "px", backgroundColor: "white" }}>
                                <option value="None"></option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="labels">Date of Birth</label>
                            <input type="date" className="form-control" name="DateOfBirth" disabled={!isEditing} />
                        </div>
                    </div>

                    {/* Phone & Address */}
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label className="labels">Phone Number</label>
                            <input type="text" className="form-control" name="PhoneNumber" disabled={!isEditing} />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Address</label>
                            <input type="text" className="form-control" name="Address" disabled={!isEditing} />
                        </div>
                    </div>

                    <div className="text-end mt-4">
                        {isEditing ? (
                            <>
                                <button className="btn btn-secondary me-2" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button className="btn btn-success" type="submit">Save</button>
                            </>
                        ) : (
                            <button className="btn profile-button" type="button" onClick={() => setIsEditing(true)}>Edit Information</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfo;
