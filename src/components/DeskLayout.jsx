import { Outlet } from "react-router-dom";
import Header from "./Header";
import StudentQueueSidebar from "./StudentQueueSidebar";

const DeskLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <Header />

            <div className="flex flex-1">
                {/* Sidebar for Student Queue */}
                <StudentQueueSidebar />

                {/* Main content area for desk forms */}
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DeskLayout;
