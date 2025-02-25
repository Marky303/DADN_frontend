import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../pagestyles/info.css";

const PersonalInfo = () => {
    const [user, setUser] = useState({
        name: "Do Phu Quy",
        email: "nguyenvana@example.com",
        id: "123456",
        gender: "Male",
        phone: "0123456789",
        dob: "01/01/1990",
        address: "Hanoi, Vietnam",
        degree: "Doctorate",
        image: "https://bloganchoi.com/wp-content/uploads/2024/11/poster-comeback-cho-digital-single-pickleball-1-1068x601.jpg"
    });

    return (
        <div className="container rounded bg-white mt-5 mb-5 p-4 shadow" style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <div className="row">
                {/* Profile Image Column */}
                <div className="col-md-3 border-end d-flex flex-column align-items-center text-center p-4 profile-image-container">
                    <img
                        id="myimg"
                        src={user.image}
                        className="rounded-circle shadow mt-3"
                        width="150px"
                        height="150px"
                        alt="Profile"
                    />
                    <button className="btn profile-button image-button">Edit Image</button>
                </div>

                {/* Information Column */}
                <div className="col-md-8 p-4">
                    <h4 className="text-primary mb-3">Personal Information</h4>

                    {/* Name and Email */}
                    <div className="row mt-2">
                        <div className="col-md-6">
                            <label className="labels">Full Name</label>
                            <input type="text" className="form-control" value={user.name} />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Email</label>
                            <input type="email" className="form-control" value={user.email} readOnly />
                        </div>
                    </div>

                    {/* Gender and Date of Birth */}
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label className="labels">Gender</label>
                            <input type="text" className="form-control" value={user.gender} readOnly />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Date of Birth</label>
                            <input type="text" className="form-control" value={user.dob} readOnly />
                        </div>
                    </div>

                    {/* Phone and Address */}
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <label className="labels">Phone Number</label>
                            <input type="text" className="form-control" value={user.phone} />
                        </div>
                        <div className="col-md-6">
                            <label className="labels">Address</label>
                            <input type="text" className="form-control" value={user.address} />
                        </div>
                    </div>

                    <div className="text-end">
                        <button className="btn profile-button mt-4">Edit Information</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;
