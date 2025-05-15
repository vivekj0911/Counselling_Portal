import { Outlet } from "react-router-dom";
import Header from "./Header";
import StudentQueueSidebar from "./StudentQueueSidebar";

const DeskLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Sticky Header */}
            <div className="sticky top-0 z-10">
                <Header />
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sticky Sidebar */}
                <div className="w-64 h-full sticky top-0 z-10">
                    <StudentQueueSidebar />
                </div>

                {/* Scrollable main content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DeskLayout;
