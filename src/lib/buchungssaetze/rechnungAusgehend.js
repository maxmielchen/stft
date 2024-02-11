
import { useState } from "react";
import Buchungssatz from "./buchungssatz";
import { Table } from "react-bootstrap";
import waehrung from "../standard/waehrung";

function RechnungAusgehend({rechnungsbetrag}) {
    const [skonto, setSkonto] = useState(2);

    const skontoBetrag = () => {
        return parseFloat((rechnungsbetrag * skonto / 100).toFixed(2));
    }

    const summeOhneSkonto = () => {
        return rechnungsbetrag - skontoBetrag();
    }

    const preisNetto = () => {
        return parseFloat((rechnungsbetrag/1.19).toFixed(2));
    }

    const preisMwSt = () => {
        return parseFloat((preisNetto()*0.19).toFixed(2));
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
                        <td><input type="number" value={skonto} onChange={e => setSkonto(e.target.value)} /></td>
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