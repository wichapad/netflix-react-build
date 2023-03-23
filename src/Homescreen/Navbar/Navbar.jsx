import React, { useEffect, useState } from 'react'
import '../Navbar/navbar.scss'
function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    
    const transitrionNavbar = () => {
        if (window.scrollY > 50){
            setShowNavbar(true);
        } else{
            setShowNavbar(false);
        }
    };
    
    useEffect(() => {
        window.addEventListener("scroll", transitrionNavbar);
        return () => window.removeEventListener("scroll", transitrionNavbar);
    }, []);

    return (
        <div className={`nav ${showNavbar && "nav_bg"}`}>
            <div className="nav_contents">
                <div className="nav_left">
                    <img className="nav_logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                        alt=""
                    />
                </div>




                <div className="nav_right">
                    <img className="nav_avatar"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                        alt=""
                    />
                </div>

            </div>

        </div>
    )
}

export default Navbar
