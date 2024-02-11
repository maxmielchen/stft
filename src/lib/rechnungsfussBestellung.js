import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import waehrung from "./standard/waehrung";

function RechnungsfussBestellung({ summe, setRechnungsbetrag, setBezugskosten }) {
    const [rabatt, setRabatt] = useState(0);
    const [versandkosten, setVersandkosten] = useState(0);

    const rabattInEuro = () => { 
        return parseFloat((parseFloat(rabatt) / 100 * parseFloat(summe)).toFixed(2));
    }

    const gesamtPreisNetto = () => {
        return parseFloat(summe) - rabattInEuro() + parseFloat(versandkosten)
    };

    const umsatzsteuer = () => {
        return parseFloat((gesamtPreisNetto() * 0.19).toFixed(2));
    }

    const rechnungsbetrag = () => {
        return parseFloat(gesamtPreisNetto()) + parseFloat(umsatzsteuer());
    }

    useEffect(() => {
        setRechnungsbetrag(rechnungsbetrag());
        setBezugskosten(versandkosten);
    }, [summe, rabatt, versandkosten, setRechnungsbetrag]);

    return (
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <th>Summe</th>
                    <td>{waehrung(summe)}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Rabatt</th>
                    <td>
                        {waehrung(rabattInEuro())}
                    </td>
                    <td>
                        <input type="number" value={rabatt} onChange={(event) => setRabatt(event.target.value)} />
                    </td>
                </tr>
                <tr>
                    <th>Versandkosten</th>
                    <td>
                        <input type="number" value={versandkosten} onChange={(event) => setVersandkosten(event.target.value)} />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th>Gesamtpreis netto</th>
                    <td>{waehrung(gesamtPreisNetto())}</td>
                    <td></td>
                </tr>
                <tr>
                    <th>Umsatzsteuer</th>
                    <td>{waehrung(umsatzsteuer())}</td>
                    <td>19%</td>
                </tr>
                <tr>
                    <th>Rechnungsbetrag</th>
                    <td>{waehrung(rechnungsbetrag())}</td>
                    <td></td>
                </tr>
             </tbody>
        </Table>
    );
}

export default RechnungsfussBestellung;