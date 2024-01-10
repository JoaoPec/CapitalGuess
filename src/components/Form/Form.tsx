import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';

interface FormProps {
    country?: string;
}

const Form = ({ country: initialCountry }: FormProps) => {
    const [guess, setGuess] = useState<string>('');
    const [country, setCountry] = useState<string | undefined>(initialCountry);
    const [capital, setCapital] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchCountryData();
    }, []); // Executará apenas no carregamento inicial

    const fetchCountryData = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/getCountry', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                setCountry(result.country);
                setCapital(result.capital);
                console.log('Country fetched:', result);
            } else {
                console.log('Erro ao buscar país');
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    const handleGuessSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (guess === capital) {
            alert('Correct!');
            setGuess('');
            fetchCountryData(); // Chama a função para buscar um novo país
        } else {
            alert('Wrong!');
        }
    };

    return (
        <div className={styles.container}>
            <p>{country}</p>
            <form onSubmit={handleGuessSubmit}>
                <input
                    type="text"
                    name="guess"
                    placeholder="Enter your guess"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
