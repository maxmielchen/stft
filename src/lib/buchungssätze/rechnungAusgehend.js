
import { useState } from "react";
import Buchungssatz from "./buchungssatz";
import { Table } from "react-bootstrap";
import currencyView from "../currencyView";

function RechnungAusgehend({rechnungsbetrag}) {
    //const [geo, setGeo] = useState(0);
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
        <div>
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
                        <td>{currencyView(skontoBetrag())} €</td>
                        <td>{currencyView(summeOhneSkonto())} €</td>
                    </tr>
                </tbody>
            </Table>
            <Buchungssatz dict={dict}/>
        </div>
    );
}

export default RechnungAusgehend;