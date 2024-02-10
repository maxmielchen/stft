
import Buchungssatz from "./buchungssatz";

function RechnungEingehend({rechnungsbetrag, bezugskosten}) {
    let dict;

    if (bezugskosten == 0) {
        dict = [
            { haben: "6080", soll: "", betrag: rechnungsbetrag/1.19*1.0 },
            { haben: "2600", soll: "", betrag: rechnungsbetrag/1.19*0.19 },
            { haben: "", soll: "4400", betrag: rechnungsbetrag },
        ];
    } else {
        dict = [
            { haben: "6080", soll: "", betrag: rechnungsbetrag/1.19*1.0- bezugskosten},
            { haben: "6081", soll: "", betrag: bezugskosten },
            { haben: "2600", soll: "", betrag: rechnungsbetrag/1.19*0.19 },
            { haben: "", soll: "4400", betrag: rechnungsbetrag },
        ];
    }

    return (
        <div>
            <Buchungssatz dict={dict}/>
        </div>
    );
}

export default RechnungEingehend;