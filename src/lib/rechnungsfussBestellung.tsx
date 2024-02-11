import React from "react";

import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import waehrung from "./standard/waehrung";
import prozentWaehrung from "./standard/prozentWaehrung";
import WaehrungBadge from "./standard/waehrungBadge";

function RechnungsfussBestellung({ summe, setRechnungsbetrag, setBezugskosten }: { summe: number, setRechnungsbetrag: (rechnungsbetrag: number) => void, setBezugskosten: (bezugskosten: number) => void }) {
    const [rabatt, setRabatt] = useState(0);
    const [versandkosten, setVersandkosten] = useState(0);

    const rabattInEuro = () => { 
        return prozentWaehrung(summe, 1, rabatt/100);
    }

    const gesamtPreisNetto = () => {
        return summe - rabattInEuro() + versandkosten
    };

    const umsatzsteuer = () => {
        return prozentWaehrung(gesamtPreisNetto(), 1, 0.19);
    }

    const rechnungsbetrag = () => {
        return gesamtPreisNetto() + umsatzsteuer();
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
                    <td>
                        <WaehrungBadge value={summe} />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th>Rabatt</th>
                    <td>
                        <WaehrungBadge value={rabattInEuro()} />
                    </td>
                    <td>
                        <input type="number" value={rabatt} onChange={(event) => setRabatt(parseFloat(event.target.value))} />
                    </td>
                </tr>
                <tr>
                    <th>Versandkosten</th>
                    <td>
                        <input type="number" value={versandkosten} onChange={(event) => setVersandkosten(parseFloat(event.target.value))} />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th>Gesamtpreis netto</th>
                    <td>
                        <WaehrungBadge value={gesamtPreisNetto()} />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th>Umsatzsteuer</th>
                    <td>
                        <WaehrungBadge value={umsatzsteuer()} />
                    </td>
                    <td>19%</td>
                </tr>
                <tr>
                    <th>Rechnungsbetrag</th>
                    <td>
                        <WaehrungBadge value={rechnungsbetrag()} />
                    </td>
                    <td></td>
                </tr>
             </tbody>
        </Table>
    );
}

export default RechnungsfussBestellung;