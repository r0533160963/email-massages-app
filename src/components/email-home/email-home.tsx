import React, { useState } from "react";
import EmailPage from "../email-page/email-page";
import Header from "../header/header";

const HomePage: React.FC = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Header onSearch={handleSearch} />
            <EmailPage/>
        </div>
    );
};

export default HomePage;
