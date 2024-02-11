
import { Table } from "react-bootstrap";
import Buchungssatz from "./buchungssatz";
import { useState } from "react";

function ZahlungAusgehend({rechnungsbetrag}) {
    let dict;

    let [skonto, setSkonto] = useState(0);

    if (skonto == 0) {
        dict = [
            { haben: "4400", soll: "", betrag: rechnungsbetrag },
            { haben: "", soll: "2800", betrag: rechnungsbetrag },
        ];
    } else {
        const skonto_in_euro = parseFloat(parseFloat(rechnungsbetrag * skonto/100).toFixed(2));

        const überweisungsbetrag = rechnungsbetrag - skonto_in_euro;

        const skonto_ohne_steuer = parseFloat(parseFloat(skonto_in_euro / 1.19).toFixed(2));

        const skonto_steuer = parseFloat(parseFloat(skonto_in_euro - skonto_ohne_steuer).toFixed(2));

        dict = [
            { haben: "4400", soll: "", betrag: rechnungsbetrag },
            { haben: "", soll: "2800", betrag: überweisungsbetrag },
            { haben: "", soll: "6082", betrag: skonto_ohne_steuer },
            { haben: "", soll: "2600", betrag: skonto_steuer },
        ];
    }

    return (
        <div>
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
        </div>
    );
}

export default ZahlungAusgehend;