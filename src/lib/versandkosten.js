import { useState } from "react";
import { Table } from "react-bootstrap";
import currencyView from "./currencyView";

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
        return parseFloat(kg) * parseFloat(kgDAL) + parseFloat(fpDAL);
    }

    const calcFpDeltapost = () => {
        return parseFloat(kg) * parseFloat(kgDeltapost) + parseFloat(fpDeltapost);
    }

    const calcFpPOC = () => {
        return parseFloat(kg) * parseFloat(kgPOC) + parseFloat(fpPOC);
    }

    const calcFpPostbox = () => {
        return parseFloat(kg) * parseFloat(kgPostbox) + parseFloat(fpPostbox);
    }

    const [exDAL, setExDAL] = useState(0);
    const [exDeltapost, setExDeltapost] = useState(0);
    const [exPOC, setExPOC] = useState(0);
    const [exPostbox, setExPostbox] = useState(0);

    const calcExDAL = () => {
        return parseFloat(kg) * parseFloat(exDAL) + calcFpDAL();
    }

    const calcExDeltapost = () => {
        return parseFloat(kg) * parseFloat(exDeltapost) + calcFpDeltapost();
    }

    const calcExPOC = () => {
        return parseFloat(kg) * parseFloat(exPOC) + calcFpPOC();
    }

    const calcExPostbox = () => {
        return parseFloat(kg) * parseFloat(exPostbox) + calcFpPostbox();
    }

    return (
        <>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Gewicht</th>
                        <td><input type="number" value={kg} onChange={e => setKg(e.target.value)} /> kg</td>
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
                        <td>{currencyView(calcFpDAL())} €</td>
                        <td>{currencyView(calcFpDeltapost())} €</td>
                    </tr>

                    <tr>
                        <td>Express</td>
                        <td><input type="number" value={exDAL} onChange={e => setExDAL(e.target.value)} /></td>
                        <td><input type="number" value={exDeltapost} onChange={e => setExDeltapost(e.target.value)} /></td>
                    </tr>

                    <tr>
                        <td>Summe</td>
                        <td>{currencyView(calcExDAL())} €</td>
                        <td>{currencyView(calcExDeltapost())} €</td>
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
                        <td>{currencyView(calcFpPOC())} €</td>
                        <td>{currencyView(calcFpPostbox())} €</td>
                    </tr>

                    <tr>
                        <td>Express</td>
                        <td><input type="number" value={exPOC} onChange={e => setExPOC(e.target.value)} /></td>
                        <td><input type="number" value={exPostbox} onChange={e => setExPostbox(e.target.value)} /></td>
                    </tr>

                    <tr>
                        <td>Summe</td>
                        <td>{currencyView(calcExPOC())} €</td>
                        <td>{currencyView(calcExPostbox())} €</td>
                    </tr>


                </tbody>

            </Table>
        </>
    );
}

export default Versandkosten;