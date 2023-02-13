import { useState, useEffect } from "react"
import Reasons from "./Reasons"
import "./index.css"
import { passwordStrengthCalculator, lengthWeakness, characterTypeWeakness, lowercaseWeakness, uppercaseWeakness, numberWeakness, specialCharactersWeakness, repeatCharactersWeakness } from './functions.mjs'

export default function App() {
    const [inputPassword, setInputPassword] = useState("")
    const [strength, setStrength] = useState(0)
    const [weaknesses, setWeaknesses] = useState([])

    const updatePasswordStrength = (event) => {
        setInputPassword(event.target.value)
        setWeaknesses(passwordStrengthCalculator(event.target.value))
    }

    const strengthUpdater = (val) => {
        setStrength(val)
    }

    useEffect(() => {
        // console.log(inputPassword, strength);

        // console.log('weaknesses', weaknesses)
        let value = 100
        weaknesses.forEach((weakness) => {
            // console.log(weakness);
            if (weakness === undefined) {
                strengthUpdater(0)
            } else {
                value -= weakness.deduction
                strengthUpdater(value)
                //   console.log(weakness.message, value, strength)
            }
        })
    }, [inputPassword, strength, weaknesses])

    const weak = weaknesses.filter(weakness => weakness !== undefined)
    // console.log(weak)

    return (
        <>
            <h1>Password Strength Test</h1>
            <div className="strengthMeter" id="strengthMeter">
                <div className="meter" style={{ width: `${strength}%` }}></div>
            </div>
            <input
                type="text"
                className="passwordInput"
                id="passwordInput"
                value={inputPassword}
                autoFocus
                aria-labelledby="password"
                onInput={(event) => updatePasswordStrength(event)}
            />
            {weak.map((weakness) => {
                return <Reasons weakness={weakness} />
            })}
        </>
    )
}
