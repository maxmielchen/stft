import React from "react";

import { Table } from "react-bootstrap";
import waehrung from "../standard/waehrung";

function Buchungssatz({dict}: {dict: {haben: string, soll: string, betrag: number}[]})  {
    return (
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
                        <td>{waehrung(row.betrag)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default Buchungssatz;