import React from "react";

import { Table } from "react-bootstrap";
import Buchungssatz from "./buchungssatz";
import { useState } from "react";
import prozentWaehrung from "../standard/prozentWaehrung";
import nec from "../standard/nec";

function ZahlungAusgehend({rechnungsbetrag}: {rechnungsbetrag: number}) {
    let dict;

    const [skonto, setSkonto] = useState("0");
    let getSkonto = nec(skonto);

    if (getSkonto == 0) {
        dict = [
            { haben: "4400", soll: "", betrag: rechnungsbetrag },
            { haben: "", soll: "2800", betrag: rechnungsbetrag },
        ];
    } else {
        const skontoInEuro = prozentWaehrung(rechnungsbetrag, 1, getSkonto/100);

        const k4400 = rechnungsbetrag;
        const k2800 = k4400 - skontoInEuro;
        const k6082 = prozentWaehrung(skontoInEuro, 1.19, 1);
        const k2600 = skontoInEuro - k6082;

        dict = [
            { haben: "4400", soll: "", betrag: k4400 },
            { haben: "", soll: "2800", betrag: k2800 },
            { haben: "", soll: "6082", betrag: k6082 },
            { haben: "", soll: "2600", betrag: k2600 },
        ];
    }

    return (
        <>
            <Table striped bordered hover>
                <tbody>
                    <tr>
                        <th>Skonto</th>
                        <td>
                            <input type="number" value={skonto} onChange={(event) => setSkonto(event.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Buchungssatz dict={dict}/>
        </>
    );
}

export default ZahlungAusgehend;