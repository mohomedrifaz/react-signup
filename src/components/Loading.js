import { useRef, useEffect } from "react"

export default function Loading({ progress }) {

    const loadingBar = useRef(null);

    useEffect(() => {
        if ( progress === false ) {
            return;
        }
        loadingBar.current.style.width = `${progress}%`;
    });

    return (
        <div className="loading-container">
            <div className="loading-bar" ref={loadingBar}>
                <div className="loading-bar__progress"></div>
            </div>
        </div>
    )
}