import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../axiosService";
import { useRouter } from 'next/router'

export const LoginContext = createContext({});
export const LoginUpdateContext = createContext({});
export const SubmitLoginContext = createContext({});
export const SignupContext = createContext({});

export function useLoginInput() {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLoginInput must be used within a LoginProvider");
    }
    return context;
}

export function useLoginInputUpdate() {
    const context = useContext(LoginUpdateContext);
    if (!context) {
        throw new Error("useLoginInputUpdate must be used within a LoginProvider");
    }
    return context;
}
export function useSubmitLogin() {
    const context = useContext(SubmitLoginContext);
    if (!context) {
        throw new Error("useLoginInputUpdate must be used within a LoginProvider");
    }
    return context;
}
export function useSignupLogin() {
    const context = useContext(SignupContext);
    if (!context) {
        throw new Error("useLoginInputUpdate must be used within a LoginProvider");
    }
    return context;
}

export function LoginProvider({ children }) {
    const [userInputs, setUserInputs] = useState({});
    const [user, setUser] = useState(null);
    const [loginState, setLoginState] = useState(true);
    const [errorState, setErrorState] = useState(null);

    const router = useRouter();


    const handleInput = (e) => {
        const value = e.target.value;
        setUserInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post("api/account/login", { userName: userInputs.userName, password: userInputs.password })
            sessionStorage.setItem("accessToken", res.data.accessToken)
            setUser(() => res.data)
            return res.data;
        } catch(error) {
            const { response } = error;
            response.data === "INCORRECT Password" && setErrorState("INCORRECT Password")
            response.data === "ACCOUNT DOES NOT EXISTS" && setErrorState("ACCOUNT DOES NOT EXISTS")
        }
    }
    const handleSignup = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post("api/account/create", {
                userName: userInputs.userName,
                password: userInputs.password,
                firstName: userInputs.firstName,
                lastName: userInputs.lastName,
                department: userInputs.department,
                companyName: userInputs.companyName,
                email: userInputs.email,
                teamLead: userInputs.teamLead,
                groupLead: userInputs.groupLead,
                privileges: 'team-member',
            })
            setUser(() => res.data)
            return res.data;
        } catch(error) {
            const { response } = error;
            response.data === "ACCOUNT DATA DOES NOT CONTAIN ALL FIELDS" && setErrorState("ACCOUNT DATA DOES NOT CONTAIN ALL FIELDS")
            response.data === "USERNAME EXISTS ALREADY" && setErrorState("USERNAME EXISTS ALREADY")
        }
    }


    return (
        <LoginContext.Provider value={{ userInputs, setUserInputs, user, setUser, loginState, setLoginState, errorState }}>
            <LoginUpdateContext.Provider value={handleInput}>
                <SubmitLoginContext.Provider value={handleSubmit}>
                    <SignupContext.Provider value={handleSignup}>
                        {children}
                    </SignupContext.Provider>
                </SubmitLoginContext.Provider>
            </LoginUpdateContext.Provider>
        </LoginContext.Provider>
    )
}

