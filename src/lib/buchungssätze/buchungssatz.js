import { Table } from "react-bootstrap";
import currencyView from "../currencyView";

function Buchungssatz({dict}) {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Haben</th>
                        <th>Soll</th>
                        <th>Betrag</th>
                    </tr>
                </thead>
                <tbody>
                    {dict.map((row, index) => (
                        <tr key={index}>
                            <td>{row.haben}</td>
                            <td>{row.soll}</td>
                            <td>{currencyView(row.betrag)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Buchungssatz;