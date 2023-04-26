import { createContext, useContext, useState } from "react";
import { api } from "../../axiosService";

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
    const [userInputs, setUserInputs] = useState({
        userName: "",
        password: ""
    });
    const [user, setUser] = useState(null);


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
            const res = await api.post("api/account/login", {userName: userInputs.userName, password: userInputs.password})
            sessionStorage.setItem("accessToken", res.data.accessToken)
            setUser((prev) => {
                return res.data;
            })
            return res.data;
        } catch {
            //Add Error Logic Here
            alert('Bad Request')
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
                departmentId: userInputs.departmentId,
                department: userInputs.department,
                teamLead: userInputs.teamLead,
                groupLead: userInputs.groupLead
            })
            sessionStorage.setItem("accessToken", res.data.accessToken)
            setUser((prev) => {
                return res.data;
            })
            return res.data;
        } catch {
            //Add Error Logic Here
            alert('Bad Request')
        }
    }


    return (
        <LoginContext.Provider value={{userInputs, setUserInputs, user, setUser}}>
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

