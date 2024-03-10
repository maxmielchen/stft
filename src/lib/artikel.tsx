import React from 'react';

import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import WaehrungBadge from './standard/waehrungBadge';

function Artikel({ setSumme }: { setSumme: (summe: number) => void }) {
    const [rows, setRows] = useState([
        { nr: 1, menge: 50, preis: 5 },
        { nr: 2, menge: 0, preis: 0 },
        { nr: 3, menge: 0, preis: 0 },
    ]);

    const calculateSum = (menge, preis) => {
        return (menge * preis);
    };

    const totalSum = () => { 
        return rows.reduce((acc, row) => acc + calculateSum(row.menge, row.preis), 0);
    }

    const handleInputChange = (event, index) => {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let newRows = [...rows];
        newRows[index][name] = value;

        setRows(newRows);
    };

    useEffect(() => {
        setSumme(totalSum());
    }, [rows, setSumme]);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nr.</th>
                    <th>Menge</th>
                    <th>Preis</th>
                    <th>Summe</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td>{row.nr}</td>
                        <td>
                            <input type="number" name="menge" value={row.menge} onChange={(event) => handleInputChange(event, index)}/>
                        </td>
                        <td>
                            <input type="number" name="preis" value={row.preis} onChange={(event) => handleInputChange(event, index)}/>
                        </td>
                        <td>
                            <WaehrungBadge value={calculateSum(row.menge, row.preis)} />
                        </td>
                     </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default Artikel;