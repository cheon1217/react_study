import "./Header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ title, leftChild, rightChild }) => {
    const [dark, setDark] = useState(() => localStorage.getItem("darkMode") === "true");
    const navigate = useNavigate();

    useEffect(() => {
        if (dark) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        localStorage.setItem("darkMode", dark);
    }, [dark]);

    const isLogin = !!localStorage.getItem("loginUser");

    const handleLogout = () => {
        localStorage.removeItem("loginUser");
        navigate("/login", { replace: true });
    };

    return (
        <div className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_title">{title}</div>
            <div className="header_right">
                {/* 다크모드 토글 → 로그아웃 → rightChild(>) 순서 */}
                <button
                    className="dark-toggle-btn"
                    onClick={() => setDark((v) => !v)}
                    title="다크모드 토글"
                >
                    {dark ? "🌙" : "☀️"}
                </button>
                {isLogin && (
                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                    </button>
                )}
                {rightChild}
            </div>
        </div>
    );
};

export default Header;