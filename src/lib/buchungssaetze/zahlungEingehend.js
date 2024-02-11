
import { Table } from "react-bootstrap";
import Buchungssatz from "./buchungssatz";
import { useState } from "react";
import prozentWaehrung from "../standard/prozentWaehrung";

function ZahlungEingehend({rechnungsbetrag}) {
    let dict;

    let [skonto, setSkonto] = useState(2);

    if (skonto == 0) {
        dict = [
            { haben: "2800", soll: "", betrag: rechnungsbetrag },
            { haben: "", soll: "2400", betrag: rechnungsbetrag },
        ];
    } else {
        const skontoInEuro = prozentWaehrung(rechnungsbetrag, 1, skonto/100);

        const k2800 = rechnungsbetrag - skontoInEuro;
        const k5101 = parseFloat(parseFloat(skontoInEuro / 1.19).toFixed(2));
        const k4800 = parseFloat(parseFloat(skontoInEuro - k5101).toFixed(2));

        dict = [
            { haben: "2800", soll: "", betrag: k2800 },
            { haben: "5101", soll: "", betrag: k5101 },
            { haben: "4800", soll: "", betrag: k4800 },
            { haben: "", soll: "2400", betrag: rechnungsbetrag },
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

export default ZahlungEingehend;