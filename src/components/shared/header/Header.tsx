import React from 'react';
import AnnouncementBar from './AnnouncementBar.tsx';
import NavBar from './NavBar.tsx';

const Header = () => {
    return (
        <div>
            <AnnouncementBar/>
            <NavBar/>
        </div>
    );
};

export default Header;