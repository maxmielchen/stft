import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Container, Navbar, NavbarText} from "react-bootstrap";

import Artikel from "./lib/artikel";
import RechnungsfussBestellung from "./lib/rechnungsfussBestellung";
import ToggleSwitch from "./lib/theme";
import RechnungEingehend from "./lib/buchungssätze/rechnungEingehend";
import ZahlungAusgehend from "./lib/buchungssätze/zahlungAusgehend";
import RechnungsfussAngebot from "./lib/rechnungsfussAngebot";
import RechnungAusgehend from "./lib/buchungssätze/rechnungAusgehend";
import Versandkosten from "./lib/versandkosten";
import ZahlungEingehend from "./lib/buchungssätze/zahlungEingehend";

function App() {
    return (
        <Layout />
    );
}

const modes = { EINKAUF: "1", VERKAUF: "2" }

function Layout() { 
    const [mode, setMode] = useState(modes.EINKAUF)
    return (
        <div>
            <Navbar className="bg-body-tertiary mb-4">
                <Container>
                    <Navbar.Brand>STFT</Navbar.Brand>
                    <ButtonGroup size="sm">
                        <Button variant={mode === modes.EINKAUF ? "primary" : "outline-primary"} onClick={() => setMode(modes.EINKAUF)}>
                            Einkauf
                        </Button>
                        <Button variant={mode === modes.VERKAUF ? "primary" : "outline-primary"} onClick={() => setMode(modes.VERKAUF)}>
                            Verkauf
                        </Button>
                    </ButtonGroup>
                    <ToggleSwitch />
                    <NavbarText>powered by Max Mielchen</NavbarText>
                </Container>
            </Navbar>

            {mode === modes.EINKAUF && <Einkauf />}
            {mode === modes.VERKAUF && <Verkauf />}

        </div>
    );
}

function Einkauf() {
    const [summe, setSumme] = useState(0);
    const [rechnungsbetrag, setRechnungsbetrag] = useState(0);
    const [bezugskosten, setBezugskosten] = useState(0);
    
    return (
        <Container fluid>
            <h1>🧺 Einkauf</h1>
            
            <hr />
            <h4>1. Angebotsvergleich</h4>
            <p>Als erstes mache, bevor du hier anfängst, einen Angebotsvergleich :)</p>


            <hr />
            <h4>2. Bestellung</h4>
            <Artikel setSumme={setSumme} />
            <RechnungsfussBestellung summe={summe} setRechnungsbetrag={setRechnungsbetrag} setBezugskosten={setBezugskosten} />

            <hr />
            <h4>3. Bestellung</h4>
            <RechnungEingehend rechnungsbetrag={rechnungsbetrag} bezugskosten={bezugskosten} />

            <hr />
            <h4>4. Zahlung</h4>
            <ZahlungAusgehend rechnungsbetrag={rechnungsbetrag} bezugskosten={bezugskosten} />
        </Container>
  );
}

function Verkauf() {
    const [summe, setSumme] = useState(0);
    const [rechnungsbetrag, setRechnungsbetrag] = useState(0);
    
    return (
        <Container fluid>
            <h1>💰 Verkauf</h1>

            <hr />
            <h4>1. Angebot</h4>
            <Artikel setSumme={setSumme} />
            <RechnungsfussAngebot summe={summe} setRechnungsbetrag={setRechnungsbetrag} />

            <hr />
            <h4>2. Rechnung</h4>
            <p>Ob du unten das Konto 5100 oder 5155 nimmst, hängt davon ab ob es Ausland ist oder nicht.</p>
            <RechnungAusgehend rechnungsbetrag={rechnungsbetrag} />

            <hr />
            <h4>3. Versandauftrag</h4>
            <Versandkosten />

            <hr />
            <h4>4. Zahlungseingang</h4>
            <ZahlungEingehend rechnungsbetrag={rechnungsbetrag} />
        </Container>
    );
}

export default App;