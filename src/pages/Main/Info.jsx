import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../../context/UserauthContext";
import Box from "@mui/material/Box";
import theme from "../../theme";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
        if (i == "DateOfBirth")
          element.setAttribute("value", dayjs(user[i]).format("YYYY-MM-DD"));
        else if (i == "Gender") {
          if (element) element.value = user[i];
        } else element.setAttribute("value", user[i]);
      }
    }
  }, [user]);

  // Gửi dữ liệu cập nhật lên server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const successful = await sendRequest(e, "update_info_user");
    if (successful) setIsEditing(false);
  };

  return (
    <Box
      sx={{
        height: `calc(100vh - ${theme.trello.appBarHeight})`,
        backgroundColor: "primary.main",
        paddingBottom: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "primary.main",
          borderRadius: "10px",
        }}
      >
        {/* Ảnh đại diện */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "primary.main",
            width: "20%",
            margin: "20px",
          }}
        >
          <Avatar
            alt="Profile"
            src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/472216957_1924617648026190_5823984232582036858_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGhfUvwlJn7Uq3b3j5yplmEl_szgKf1KTKX-zOAp_UpMth3c9rqnFKjlwb9ZUEAgNnkW60p7eSV_D8onxTLgx7L&_nc_ohc=0h4Sn3echA0Q7kNvgFngwZE&_nc_oc=AdkIYl5DxlAZFX6kZ0utWqOs1LwrsRYRAkDMTJPYh8J8acQpvM-HrjlupfKagqtT-70&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=2FUrLzxo5RY-w2oYgzzNhQ&oh=00_AYHREaJ1rBjv3TB8ZQ1GuBzjbFceT7ptiO4AFk1qtgC83g&oe=67E96688"
            sx={{ width: 150, height: 150 }}
          />
          <Button
            sx={{
              marginTop: "25px",
              backgroundColor: "#0D6EFD",
              color: "white",
            }}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>

        {/* Thông tin cá nhân */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            margin: "20px",
          }}
        >
          <h2 className="text-primary mb-3">Personal Information</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Name & Email */}
            <div className="row mt-2">
              <div className="col-md-6">
                <Typography variant="h6" component="h2" sx={{ color: "black" }}>
                  Name
                </Typography>
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  disabled={!isEditing}
                  style={{ height: "50px" }}
                />
              </div>
              <div className="col-md-6">
                <Typography variant="h6" component="h2" sx={{ color: "black" }}>
                  Email
                </Typography>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  disabled={true}
                  style={{ height: "50px" }}
                />
              </div>
            </div>

            {/* Gender & Date of Birth */}
            <div className="row mt-3">
              <div className="col-md-6">
                <Typography variant="h6" component="h2" sx={{ color: "black" }}>
                  Gender
                </Typography>
                <select
                  className="form-control"
                  name="Gender"
                  disabled={!isEditing}
                  style={{
                    height: "50px",
                    borderRadius: 5 + "px",
                    padding: 8 + "px",
                    backgroundColor: "white",
                  }}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="col-md-6">
                <Typography variant="h6" component="h2" sx={{ color: "black" }}>
                  Date of Birth
                </Typography>
                <input
                  type="date"
                  className="form-control"
                  name="DateOfBirth"
                  disabled={!isEditing}
                  style={{ height: "50px" }}
                />
              </div>
            </div>

            {/* Phone & Address */}
            <div className="row mt-3">
              <div className="col-md-6">
                <Typography variant="h6" component="h2" sx={{ color: "black" }}>
                  Phone Number
                </Typography>
                <input
                  type="text"
                  className="form-control"
                  name="PhoneNumber"
                  disabled={!isEditing}
                  style={{ height: "50px" }}
                />
              </div>
              <div className="col-md-6">
                <Typography variant="h6" component="h2" sx={{ color: "black" }}>
                  Address
                </Typography>
                <input
                  type="text"
                  className="form-control"
                  name="Address"
                  disabled={!isEditing}
                  style={{ height: "50px" }}
                />
              </div>
            </div>

            {/* Nút thao tác */}
            <div className="text-end mt-4">
              {isEditing ? (
                <>
                  <Button
                    sx={{
                      marginRight: "10px",
                      backgroundColor: "#6C757D",
                      color: "white",
                    }}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    sx={{ backgroundColor: "#198754", color: "white" }}
                    type="submit"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  sx={{
                    marginTop: "25px",
                    backgroundColor: "#0D6EFD",
                    color: "white",
                  }}
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Information
                </Button>
              )}
            </div>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
