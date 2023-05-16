import React, { useState, useEffect } from "react";

export const useScrollPosition = (containerRef) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const container = containerRef.current;

        const updatePosition = () => {
            setScrollPosition(container.scrollTop);
        }

        container.addEventListener('scroll', updatePosition);
        updatePosition();

        return () => container.removeEventListener('scroll', updatePosition);
    }, [containerRef])

    return scrollPosition;
}