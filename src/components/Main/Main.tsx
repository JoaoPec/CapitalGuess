import React from 'react'

import './Main.module.css'

import Form from '../Form/Form'

const Main = () => {
    return (
        <main>
            <h1>Capital Guess!</h1>
            <p>Guess the capital of the country shown.</p>
            <Form />
        </main>
    )
}

export default Main