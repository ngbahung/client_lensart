import React, { useEffect } from 'react';

const Homepage = () => {
    useEffect(() => {
        document.title = 'Trang chủ | Your Site Name';
    }, []);

    return (
        <div className="container mx-auto">
            <h1>Homepage</h1>
        </div>
    );
}

export default Homepage;
