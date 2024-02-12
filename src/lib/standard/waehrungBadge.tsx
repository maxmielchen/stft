import React from "react";
import waehrung from "./waehrung";
import { Button } from "react-bootstrap";

function WaehrungBadge({ value }: { value: number }) {
    const euro = waehrung(value);

    const handleClick = async () => {
        await navigator.clipboard.writeText(euro);
    }

    return (
        <Button size="sm" onClick={handleClick}>
            {euro} €
        </Button>
    );
}

export default WaehrungBadge;