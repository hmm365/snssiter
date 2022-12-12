import React, { useState } from 'react'
import { authService } from 'fbase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { BsTwitter } from 'react-icons/bs'

const AuthForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAccount, setNewAccount] = useState(false)
    const [error, setError] = useState('')

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        let data
        try {
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password)
            } else {
                data = await signInWithEmailAndPassword(authService, email, password)
            }
            console.log(data)
        } catch (error) {
            // console.log(error.message.replace('Firebase: ', ''))
            setError(error.message.replace('Firebase: ', ''))
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)
    return (
        <>
            <form onSubmit={onSubmit} className="login__form">
                <BsTwitter className="twitter__icon" />
                <input name="email" type="text" placeholder="email" required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder="Password" autoComplete="off" required value={password} onChange={onChange} />
                <input className="sign__in" type="submit" value={newAccount ? 'Create Account' : 'Log in'} />
                {error}
            </form>

            <span className="toggle__account" onClick={toggleAccount}>
                {newAccount ? 'Log in' : 'Create Account'}
            </span>
        </>
    )
}

export default AuthForm
