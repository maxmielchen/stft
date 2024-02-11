import React from "react";

import { useState } from "react";
import Buchungssatz from "./buchungssatz";
import { Table } from "react-bootstrap";
import waehrung from "../standard/waehrung";
import prozentWaehrung from "../standard/prozentWaehrung";

function RechnungAusgehend({rechnungsbetrag}: {rechnungsbetrag: number}) {
    const [skonto, setSkonto] = useState(2);

    const skontoBetrag = () => {
        return prozentWaehrung(rechnungsbetrag, 1, skonto/100)
    }

    const summeOhneSkonto = () => {
        return rechnungsbetrag - skontoBetrag();
    }

    const preisNetto = () => {
        return prozentWaehrung(rechnungsbetrag, 1.19, 1);
    }

    const preisMwSt = () => {
        return rechnungsbetrag - preisNetto();
    }

    let dict = [
        { haben: "2400", soll: "", betrag: rechnungsbetrag },
        { haben: "", soll: "5100 / 5155", betrag: preisNetto() },
        { haben: "", soll: "4800", betrag: preisMwSt() },
    ];

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Skonto</th>
                        <th>Geleistete Skonto</th>
                        <th>Summe ohne Skonto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="number" value={skonto} onChange={e => setSkonto(parseFloat(e.target.value))} /></td>
                        <td>{waehrung(skontoBetrag())} €</td>
                        <td>{waehrung(summeOhneSkonto())} €</td>
                    </tr>
                </tbody>
            </Table>
            
            <Buchungssatz dict={dict}/>
        </>
    );
}

export default RechnungAusgehend;