export { passwordStrengthCalculator, lengthWeakness, characterTypeWeakness, lowercaseWeakness, uppercaseWeakness, numberWeakness, specialCharactersWeakness, repeatCharactersWeakness }

const passwordStrengthCalculator = (password) => {
    const passwordWeaknesses = []
    passwordWeaknesses.push(lengthWeakness(password))
    passwordWeaknesses.push(lowercaseWeakness(password))
    passwordWeaknesses.push(uppercaseWeakness(password))
    passwordWeaknesses.push(numberWeakness(password))
    passwordWeaknesses.push(specialCharactersWeakness(password))
    passwordWeaknesses.push(repeatCharactersWeakness(password))

    // console.log('passwordWeaknesses', passwordWeaknesses)
    return passwordWeaknesses
}

const lengthWeakness = (password) => {
    if (password === '') return
    let length = password.length
    if (length <= 5 && length > 0) {
        return {
            message: "Your password is too small",
            deduction: 40
        }
    }

    if (length <= 10 && length > 0) {
        return {
            message: "Your password can be little longer",
            deduction: 10
        }
    }

    if (length > 0) {
        return {
            message: "",
            deduction: 0
        }
    }
}

const characterTypeWeakness = (password, regex, type) => {
    if (password === '') return
    const matches = password.match(regex) || []

    if (matches.length === 0) {
        return {
            message: `Your password does not contain any ${type}`,
            deduction: 10
        }
    }

    if (matches.length <= 2) {
        return {
            message: `Your password should contain more ${type} `,
            deduction: 5
        }
    }

    if (matches.length > 2) {
        return {
            message: '',
            deduction: 0
        }
    }
}

const lowercaseWeakness = (password) => {
    return characterTypeWeakness(
        password,
        /[a-z]/g,
        "lowercase characters"
    )
}

const uppercaseWeakness = (password) => {
    return characterTypeWeakness(
        password,
        /[A-Z]/g,
        "uppercase characters"
    )
}

const numberWeakness = (password) => {
    return characterTypeWeakness(password, /[0-9]/g, "number")
}

const specialCharactersWeakness = (password) => {
    return characterTypeWeakness(
        password,
        /[^a-zA-Z0-9]/g,
        "special character"
    )
}

const repeatCharactersWeakness = (password) => {
    if (password === '') return
    let matches = password.match(/(.)\1/g) || []
    if (matches.length > 0) {
        return {
            message: "Your password contain repeat characters",
            deduction: 20
        }
    }

    if (matches.length === 0) {
        return {
            message: "",
            deduction: 0
        }
    }
}