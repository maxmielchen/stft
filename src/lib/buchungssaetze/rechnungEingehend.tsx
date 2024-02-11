import React from "react";

import prozentWaehrung from "../standard/prozentWaehrung";
import Buchungssatz from "./buchungssatz";

function RechnungEingehend({rechnungsbetrag, bezugskosten}: {rechnungsbetrag: number, bezugskosten: number}) {
    let dict;

    if (bezugskosten == 0) {
        const k6080 = prozentWaehrung(rechnungsbetrag, 1.19, 1.0);
        const k2600 = rechnungsbetrag-k6080;
        const k4400 = rechnungsbetrag;

        dict = [
            { haben: "6080", soll: "", betrag: k6080 },
            { haben: "2600", soll: "", betrag: k2600 },
            { haben: "", soll: "4400", betrag: k4400 },
        ];
    } else {
        const k6080 = prozentWaehrung(rechnungsbetrag, 1.19, 1.0) - bezugskosten;
        const k6081 = bezugskosten;
        const k2600 = rechnungsbetrag - k6080;
        const k4400 = rechnungsbetrag;
        
        dict = [
            { haben: "6080", soll: "", betrag: k6080},
            { haben: "6081", soll: "", betrag: k6081 },
            { haben: "2600", soll: "", betrag: k2600 },
            { haben: "", soll: "4400", betrag: k4400 },
        ];
    }

    return (
        <Buchungssatz dict={dict}/>
    );
}

export default RechnungEingehend;