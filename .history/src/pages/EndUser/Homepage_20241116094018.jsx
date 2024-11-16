import React, { useEffect } from 'react';

const Homepage = () => {
    useEffect(() => {
        document.title = 'Trang chủ | LensArt Eyewear';
    }, []);

    return (
        <div className="container mx-auto">
            <h1>Homepage</h1>
        </div>
    );
}

export default Homepage;
