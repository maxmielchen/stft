import { useEffect, useState } from 'react';
import währung from './standard/währung';
import { Table } from 'react-bootstrap';

function Artikel({ setSumme }) {
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

        if (name === 'preis' && isNaN(parseFloat(value))) {
            return;
        }

        let newRows = [...rows];
        newRows[index][name] = value;

        setRows(newRows);
    };

    useEffect(() => {
        setSumme(totalSum());
    }, [rows, setSumme]);

    return (
        <div>
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
                            <td>{währung(calculateSum(row.menge, row.preis))}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Artikel;