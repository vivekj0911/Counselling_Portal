import LogoutButton from "./LogoutButton";
import logo from "../assets/logo.png";

const Header = () => {
    return (
        <header className="bg-white text-red-700 border-b-2 p-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="h-12" />
                </div>

                {/* Institute Details */}
                <div className="text-center flex-1">
                    {/* <div className="font-bold text-lg">Dr. D. Y. Patil Unitech Society&#39;s</div> */}
                    {/* <div className="font-bold text-xl">DR. D. Y. PATIL INSTITUTE OF TECHNOLOGY</div> */}
                    <div className="font-bold text-xl">DR. D. Y. PATIL DNYAN PRASAD UNIVERSITY, PUNE</div>
                    {/* <div className="text-sm">Sant Tukaram Nagar, Pimpri, Pune.</div> */}
                    {/* <div className="text-xs italic">
                        Permanently Affiliated to the Savitribai Phule Pune University.
                        Approved by AICTE New Delhi and DTE Maharashtra.
                    </div> */}
                    <div className="text-xs italic">
                        Established under the Maharashtra Private Universities (Establishment and Regulation) 
                        (Amendment) Act, 2024 (Mah. Act No. 20 of 2024)
                    </div>
                </div>

                {/* Social Media + Logout */}
                <div className="flex items-center space-x-4">
                    <LogoutButton /> {/* ✅ Added Logout Button here */}
                </div>
            </div>
        </header>
    );
};

export default Header;
