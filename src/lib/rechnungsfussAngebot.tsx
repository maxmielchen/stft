import React from "react";

import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import waehrung from "./standard/waehrung";
import prozentWaehrung from "./standard/prozentWaehrung";
import WaehrungBadge from "./standard/waehrungBadge";

function RechnungsfussAngebot({ summe, setRechnungsbetrag }: { summe: number, setRechnungsbetrag: (rechnungsbetrag: number) => void }) {
    const [geo, setGeo] = useState('DE');
    const [express, setExpress] = useState(false);

    const [manuellerRabatt, setManuellerRabatt] = useState(false);
    const [rabattProzent, setRabattProzent] = useState(0);

    const [rabattModal, setRabattModal] = useState(false);

    const rabatt = () => {
        if (manuellerRabatt) {
            return rabattProzent;
        }
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
        return prozentWaehrung(summe, 1, rabatt()/100);
    }

    const gesamtPreisNetto = () => {
         return summe - rabattInEuro() + versandkosten()
    };

    const umsatzsteuer = () => {
        return prozentWaehrung(gesamtPreisNetto(), 1, 0.19);
    }

    const rechnungsbetrag = () => {
        return gesamtPreisNetto() + umsatzsteuer();
    }

    useEffect(() => {
        setRechnungsbetrag(rechnungsbetrag());
    }, [summe, setRechnungsbetrag]);

    return (
        <>
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
                            {rabatt()}%
                            <Button variant="outline-secondary" size="sm" onClick={() => setRabattModal(true)} className="ms-2">Ändern</Button>
                            <Modal show={rabattModal} onHide={() => setRabattModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Rabatt ändern</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Table striped bordered hover>
                                        <tbody>
                                            <tr>
                                                <th>Manueller Rabatt</th>
                                                <td>
                                                    <input type="checkbox" checked={manuellerRabatt} onChange={(event) => setManuellerRabatt(event.target.checked)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Rabatt in %</th>
                                                <td>
                                                    <input type="number" value={rabattProzent} onChange={(event) => setRabattProzent(parseFloat(event.target.value))} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="success" onClick={() => setRabattModal(false)}>
                                        Fertig
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </td>
                    </tr>
                    <tr>
                        <th>Versandkosten</th>
                        <td>
                            <WaehrungBadge value={versandkosten()} />
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
        </>
    );
}

export default RechnungsfussAngebot;