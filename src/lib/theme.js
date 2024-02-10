import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';


function ToggleSwitch() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.body.dataset.bsTheme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    return (
        <Button size='sm' variant="outline-primary" onClick={toggleTheme}>
            {theme === 'light' ? '🌞' : '🌙'}
        </Button>
    );
};

export default ToggleSwitch;