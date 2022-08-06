import { useState, useEffect } from "react";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        let isLog = localStorage.getItem('token');
        // console.log('Loggin ->', isLog)
        setIsLoggedIn(isLog ? true : false);
    }, [])
    return isLoggedIn;
}

export default useAuth;