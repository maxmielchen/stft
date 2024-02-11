
import { Table } from "react-bootstrap";
import Buchungssatz from "./buchungssatz";
import { useState } from "react";

function ZahlungEingehend({rechnungsbetrag}) {
    let dict;

    let [skonto, setSkonto] = useState(2);

    if (skonto == 0) {
        dict = [
            { haben: "2800", soll: "", betrag: rechnungsbetrag },
            { haben: "", soll: "2400", betrag: rechnungsbetrag },
        ];
    } else {
        const skonto_in_euro = parseFloat(parseFloat(rechnungsbetrag * skonto/100).toFixed(2));

        const überweisungsbetrag = rechnungsbetrag - skonto_in_euro;

        const skonto_ohne_steuer = parseFloat(parseFloat(skonto_in_euro / 1.19).toFixed(2));

        const skonto_steuer = parseFloat(parseFloat(skonto_in_euro - skonto_ohne_steuer).toFixed(2));

        dict = [
            { haben: "2800", soll: "", betrag: überweisungsbetrag },
            { haben: "5101", soll: "", betrag: skonto_ohne_steuer },
            { haben: "4800", soll: "", betrag: skonto_steuer },
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