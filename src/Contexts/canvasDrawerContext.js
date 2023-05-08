import { createContext, useContext, useState } from "react";

export const CanvasDrawerContext = createContext({});

export function useCanvasDrawer() {
    const context = useContext(CanvasDrawerContext);
    if (!context) {
        throw new Error("error");
    }
    return context;
}

export function CanvasProvider({ children }) {
    const [toggleCanvasDrawer, setToggleCanvasDrawer] = useState(false);


    return (
        <CanvasDrawerContext.Provider value={{toggleCanvasDrawer, setToggleCanvasDrawer}} >
            {children}
        </CanvasDrawerContext.Provider>
    )
}