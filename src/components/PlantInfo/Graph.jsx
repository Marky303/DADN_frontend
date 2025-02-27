import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Graph = ({ data }) => {
    return (
        <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px" }}>
            <h4>Temperature History</h4>
            <ResponsiveContainer width="95%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#FF5733" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Graph;
