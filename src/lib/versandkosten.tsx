import React from "react";

import { useState } from "react";
import { Table } from "react-bootstrap";
import WaehrungBadge from "./standard/waehrungBadge";
import nec from "./standard/nec";

function Versandkosten()
{
    const [kg, setKg] = useState(0);

    const [fpDAL, setFpDAL] = useState("0");
    let getFpDAL = nec(fpDAL);
    const [fpDeltapost, setFpDeltapost] = useState("0");
    let getFpDeltapost = nec(fpDeltapost);
    const [fpPOC, setFpPOC] = useState("0");
    let getFpPOC = nec(fpPOC);
    const [fpPostbox, setFpPostbox] = useState("0");
    let getFpPostbox = nec(fpPostbox);

    const [kgDAL, setKgDAL] = useState("0");
    let getKgDAL = nec(kgDAL);
    const [kgDeltapost, setKgDeltapost] = useState("0");
    let getKgDeltapost = nec(kgDeltapost);
    const [kgPOC, setKgPOC] = useState("0");
    let getKgPOC = nec(kgPOC);
    const [kgPostbox, setKgPostbox] = useState("0");
    let getKgPostbox = nec(kgPostbox);

    const calcFpDAL = () => {
        return kg * getKgDAL + getFpDAL;
    }

    const calcFpDeltapost = () => {
        return kg * getKgDeltapost + getFpDeltapost;
    }

    const calcFpPOC = () => {
        return kg * getKgPOC + getFpPOC;
    }

    const calcFpPostbox = () => {
        return kg * getKgPostbox + getFpPostbox;
    }

    const [exDAL, setExDAL] = useState("0");
    let getExDAL = nec(exDAL);
    const [exDeltapost, setExDeltapost] = useState("0");
    let getxDeltapost = nec(exDeltapost);
    const [exPOC, setExPOC] = useState("0");
    let getExPOC = nec(exPOC);
    const [exPostbox, setExPostbox] = useState("0");
    let getExPostbox = nec(exPostbox);

    const calcExDAL = () => {
        return kg * getExDAL + calcFpDAL();
    }

    const calcExDeltapost = () => {
        return kg * getxDeltapost + calcFpDeltapost();
    }

    const calcExPOC = () => {
        return kg * getExPOC + calcFpPOC();
    }

    const calcExPostbox = () => {
        return kg * getExPostbox + calcFpPostbox();
    }

    return (
        <>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Gewicht</th>
                        <td><input type="number" value={kg} onChange={e => setKg(nec(e.target.value))} /> kg</td>
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
                        <td><input type="number" value={fpDAL} onChange={e => setFpDAL(e.target.value)} /></td>
                        <td><input type="number" value={fpDeltapost} onChange={e => setFpDeltapost(e.target.value)} /></td>
                    </tr>

                    <tr>
                        <td>Kilopreis</td>
                        <td><input type="number" value={kgDAL} onChange={e => setKgDAL(e.target.value)} /></td>
                        <td><input type="number" value={kgDeltapost} onChange={e => setKgDeltapost(e.target.value)} /></td>
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
                        <td><input type="number" value={exDAL} onChange={e => setExDAL(e.target.value)} /></td>
                        <td><input type="number" value={exDeltapost} onChange={e => setExDeltapost(e.target.value)} /></td>
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
                        <td><input type="number" value={fpPOC} onChange={e => setFpPOC(e.target.value)} /></td>
                        <td><input type="number" value={fpPostbox} onChange={e => setFpPostbox(e.target.value)} /></td>
                    </tr>

                    <tr>
                        <td>Kilopreis</td>
                        <td><input type="number" value={kgPOC} onChange={e => setKgPOC(e.target.value)} /></td>
                        <td><input type="number" value={kgPostbox} onChange={e => setKgPostbox(e.target.value)} /></td>
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
                        <td><input type="number" value={exPOC} onChange={e => setExPOC(e.target.value)} /></td>
                        <td><input type="number" value={exPostbox} onChange={e => setExPostbox(e.target.value)} /></td>
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