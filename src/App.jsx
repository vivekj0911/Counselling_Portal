import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import GateRegistration from "./pages/GateRegistration";
import Desk1 from "./pages/Desk1";
import Desk2 from "./pages/Desk2";
import Desk3 from "./pages/Desk3";
import Desk4 from "./pages/Desk4";
import ProtectedRoute from "./components/ProtectedRoute";
import DeskLayout from "./components/DeskLayout";
import "./index.css";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["gate"]} />}>
                <Route path="/gate" element={<GateRegistration />} />
            </Route>

            {/* Wrap desk pages inside DeskLayout */}
            <Route element={<DeskLayout />}>
                <Route element={<ProtectedRoute allowedRoles={["desk1"]} />}>
                    {/* ✅ Show Desk1 without a student initially */}
                    <Route path="/desk1" element={<Desk1 />} />
                    {/* ✅ Load a student form dynamically */}
                    <Route path="/desk1/:studentId" element={<Desk1 />} />
                </Route>


                <Route element={<ProtectedRoute allowedRoles={["desk2"]} />}>
                    <Route path="/desk2" element={<Desk2 />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["desk3"]} />}>
                    <Route path="/desk3" element={<Desk3 />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["desk4"]} />}>
                    <Route path="/desk4" element={<Desk4 />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
