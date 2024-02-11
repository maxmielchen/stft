import React, { useState } from "react";
import waehrung from "./waehrung";

function WaehrungBadge({ value }: { value: number }) {
    const [isPressed, setIsPressed] = useState(false);

    const euro = waehrung(value);

    const handleClick = async () => {
        setIsPressed(true);
        await navigator.clipboard.writeText(euro);
        window.setTimeout(() => setIsPressed(false), 50);
    }

    return (
        <span className={`badge ${isPressed ? 'bg-secondary' : 'bg-primary'}`}  style={{cursor: 'pointer'}} onClick={handleClick}>
            {euro} €
        </span>
    );
}

export default WaehrungBadge;