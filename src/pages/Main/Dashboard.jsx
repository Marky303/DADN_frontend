import Box from "@mui/material/Box";
import theme from "../../theme";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";

function Dashboard() {
  const [isHotHovered, setIsHotHovered] = useState(false);

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        width: "100%",
        overflowY: "auto",
        padding: "16px",
        backgroundColor: "background.main", // Optional: Set a background color
      }}
    >
      {/* Temperature */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 3,
        }}
      >
        {/* Tiêu đề */}
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            <i className="fa-solid fa-temperature-three-quarters"></i>
            {" Temperature"}
          </Typography>
        </Box>
        {/* Nội dung */}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Temp Hot */}
          <Box
            onMouseEnter={() => setIsHotHovered(true)}
            onMouseLeave={() => setIsHotHovered(false)}
          >
            <Card
              sx={{
                display: "flex",
                borderRadius: "16px",
                "&:hover": {
                  transform: "scale(1.05)",
                  outline: "3px solid ",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                },
              }}
            >
              <CardMedia
                sx={{
                  width: "160px",
                  height: "200px",
                }}
                image={
                  isHotHovered
                    ? "/src/assets/temp_hot_very.png"
                    : "/src/assets/temp_hot.png"
                }
              />
              <CardContent
                sx={{
                  width: "160px",
                  bgcolor: "#e67e22",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                  3
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", justifyContent: "flex-end" }}
                >
                  Plants in Hot
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Temp Cold */}
          <Box>
            <Card sx={{ display: "flex", borderRadius: "16px" }}>
              <CardMedia
                sx={{
                  width: "160px",
                  height: "200px",
                }}
                image="/src/assets/temp_cold.png"
              />
              <CardContent sx={{ width: "160px", bgcolor: "#60B5FF" }}>
                <Typography component="div" variant="h5">
                  3
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Temp OK */}
          <Box>
            <Card sx={{ display: "flex", borderRadius: "16px" }}>
              <CardMedia
                sx={{
                  width: "160px",
                  height: "200px",
                }}
                image="/src/assets/temp_ok.png"
              />
              <CardContent sx={{ width: "160px", bgcolor: "#809D3C" }}>
                <Typography component="div" variant="h5">
                  3
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {/* Chart */}
          <Box>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Hot", color: "#e67e22" },
                    { id: 1, value: 15, label: "Cold", color: "#60B5FF" },
                    { id: 2, value: 20, label: "Good", color: "#809D3C" },
                  ],
                },
              ]}
              width={300}
              height={200}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
