import { createContext, useContext, useState } from "react";

export const UserAuthContext = createContext({});



export function UserProvider({ children }) {
    const accessToken = sessionStorage.getItem('accessToken');
    const [userState, setUserState] = useState({ isLoggedIn: Boolean(accessToken), accessToken });
  
    useEffect(() => {
      // When the component mounts, retrieve the access token from session storage and update the user state
      const accessToken = sessionStorage.getItem('access_token');
      setUserState({ isLoggedIn: Boolean(accessToken), accessToken });
    }, []);
  
    return (
      <UserAuthContext.Provider value={{ userState, setUserState }}>
        {children}
      </UserAuthContext.Provider>
    );
  }
  