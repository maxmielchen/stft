import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import currencyView from "./currencyView";

function RechnungsfussAngebot({ summe, setRechnungsbetrag }) {
    const [geo, setGeo] = useState('DE');
    const [express, setExpress] = useState(false);

    const rabatt = () => {
        if (summe >= 10000) {
            return 10;
        }
        if (summe >= 5000) {
            return 5;
        }
        return 0;
    }

    const versandkosten = () => {
        let kosten = 0;
        if (express == true) {
            kosten += 30;
        }
        if (summe < 2500) {
            if (geo == 'DE') {
                kosten += 20;
            }
            if (geo == 'EU') {
                kosten += 50;
            }
        }
        return kosten;
    }

    const rabattInEuro = () => { 
        return parseFloat((parseFloat(rabatt()) / 100 * parseFloat(summe)).toFixed(2));
    }

    const gesamtPreisNetto = () => {
        return parseFloat(summe) - rabattInEuro() + parseFloat(versandkosten())
    };

    const umsatzsteuer = () => {
        return parseFloat((gesamtPreisNetto() * 0.19).toFixed(2));
    }

    const rechnungsbetrag = () => {
        return parseFloat(gesamtPreisNetto()) + parseFloat(umsatzsteuer());
    }

    useEffect(() => {
        setRechnungsbetrag(rechnungsbetrag());
    }, [summe, setRechnungsbetrag]);

    return (
        <div>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Geo</th>
                        <td>
                            <select value={geo} onChange={(event) => setGeo(event.target.value)}>
                                <option value="DE">DE</option>
                                <option value="EU">EU</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Express</th>
                        <td>
                            <input type="checkbox" checked={express} onChange={(event) => setExpress(event.target.checked)} />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Summe</th>
                        <td>{currencyView(summe)}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Rabatt</th>
                        <td>
                            {currencyView(rabattInEuro())}
                        </td>
                        <td>
                            {rabatt()}%
                        </td>
                    </tr>
                    <tr>
                        <th>Versandkosten</th>
                        <td>
                            {currencyView(versandkosten())}
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Gesamtpreis netto</th>
                        <td>{currencyView(gesamtPreisNetto())}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Umsatzsteuer</th>
                        <td>{currencyView(umsatzsteuer())}</td>
                        <td>19%</td>
                    </tr>
                    <tr>
                        <th>Rechnungsbetrag</th>
                        <td>{currencyView(rechnungsbetrag())}</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default RechnungsfussAngebot;