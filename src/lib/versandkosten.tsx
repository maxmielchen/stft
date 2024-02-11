import React from "react";

import { useState } from "react";
import { Table } from "react-bootstrap";
import waehrung from "./standard/waehrung";
import WaehrungBadge from "./standard/waehrungBadge";

function Versandkosten()
{
    const [kg, setKg] = useState(0);

    const [fpDAL, setFpDAL] = useState(0);
    const [fpDeltapost, setFpDeltapost] = useState(0);
    const [fpPOC, setFpPOC] = useState(0);
    const [fpPostbox, setFpPostbox] = useState(0);

    const [kgDAL, setKgDAL] = useState(0);
    const [kgDeltapost, setKgDeltapost] = useState(0);
    const [kgPOC, setKgPOC] = useState(0);
    const [kgPostbox, setKgPostbox] = useState(0);

    const calcFpDAL = () => {
        return kg * kgDAL + fpDAL;
    }

    const calcFpDeltapost = () => {
        return kg * kgDeltapost + fpDeltapost;
    }

    const calcFpPOC = () => {
        return kg * kgPOC + fpPOC;
    }

    const calcFpPostbox = () => {
        return kg * kgPostbox + fpPostbox;
    }

    const [exDAL, setExDAL] = useState(0);
    const [exDeltapost, setExDeltapost] = useState(0);
    const [exPOC, setExPOC] = useState(0);
    const [exPostbox, setExPostbox] = useState(0);

    const calcExDAL = () => {
        return kg * exDAL + calcFpDAL();
    }

    const calcExDeltapost = () => {
        return kg * exDeltapost + calcFpDeltapost();
    }

    const calcExPOC = () => {
        return kg * exPOC + calcFpPOC(); 
    }

    const calcExPostbox = () => {
        return kg * exPostbox + calcFpPostbox();
    }

    return (
        <>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Gewicht</th>
                        <td><input type="number" value={kg} onChange={e => setKg(parseFloat(e.target.value))} /> kg</td>
                    </tr>
                </tbody>
            </Table>
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th></th>
                        <th>DAL</th>
                        <th>Deltapost</th>
                    </tr>
                </thead>


                <tbody>
                    <tr>
                        <td>Festpreis</td>
                        <td><input type="number" value={fpDAL} onChange={e => setFpDAL(parseFloat(e.target.value))} /></td>
                        <td><input type="number" value={fpDeltapost} onChange={e => setFpDeltapost(parseFloat(e.target.value))} /></td>
                    </tr>

                    <tr>
                        <td>Kilopreis</td>
                        <td><input type="number" value={kgDAL} onChange={e => setKgDAL(parseFloat(e.target.value))} /></td>
                        <td><input type="number" value={kgDeltapost} onChange={e => setKgDeltapost(parseFloat(e.target.value))} /></td>
                    </tr>

                    <tr>
                        <td>Summe</td>
                        <td>
                            <WaehrungBadge value={calcFpDAL()} />
                        </td>
                        <td>
                            <WaehrungBadge value={calcFpDeltapost()} />
                        </td>
                    </tr>

                    <tr>
                        <td>Express</td>
                        <td><input type="number" value={exDAL} onChange={e => setExDAL(parseFloat(e.target.value))} /></td>
                        <td><input type="number" value={exDeltapost} onChange={e => setExDeltapost(parseFloat(e.target.value))} /></td>
                    </tr>

                    <tr>
                        <td>Summe</td>
                        <td>
                            <WaehrungBadge value={calcExDAL()} />
                        </td>
                        <td>
                            <WaehrungBadge value={calcExDeltapost()} />
                        </td>
                    </tr>


                </tbody>

            </Table>

            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th></th>
                        <th>POC post</th>
                        <th>Postbox</th>
                    </tr>
                </thead>


                <tbody>
                    <tr>
                        <td>Festpreis</td>
                        <td><input type="number" value={fpPOC} onChange={e => setFpPOC(parseFloat(e.target.value))} /></td>
                        <td><input type="number" value={fpPostbox} onChange={e => setFpPostbox(parseFloat(e.target.value))} /></td>
                    </tr>

                    <tr>
                        <td>Kilopreis</td>
                        <td><input type="number" value={kgPOC} onChange={e => setKgPOC(parseFloat(e.target.value))} /></td>
                        <td><input type="number" value={kgPostbox} onChange={e => setKgPostbox(parseFloat(e.target.value))} /></td>
                    </tr>

                    <tr>
                        <td>Summe</td>
                        <td>
                            <WaehrungBadge value={calcFpPOC()} />
                        </td>
                        <td>
                            <WaehrungBadge value={calcFpPostbox()} />
                        </td>
                    </tr>

                    <tr>
                        <td>Express</td>
                        <td><input type="number" value={exPOC} onChange={e => setExPOC(parseFloat(e.target.value))} /></td>
                        <td><input type="number" value={exPostbox} onChange={e => setExPostbox(parseFloat(e.target.value))} /></td>
                    </tr>

                    <tr>
                        <td>Summe</td>
                        <td>
                            <WaehrungBadge value={calcExPOC()} />
                        </td>
                        <td>
                            <WaehrungBadge value={calcExPostbox()} />
                        </td>
                    </tr>


                </tbody>

            </Table>
        </>
    );
}

export default Versandkosten;