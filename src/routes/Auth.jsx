import React from 'react'
import { authService } from 'fbase'
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth'
import AuthForm from 'components/AuthForm'
import { AiOutlineGooglePlus, AiFillGithub } from 'react-icons/ai'

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event
        let provider
        if (name === 'google') {
            provider = new GoogleAuthProvider()
        } else if (name === 'github') {
            provider = new GithubAuthProvider()
        }
        // eslint-disable-next-line no-unused-vars
        const data = await signInWithPopup(authService, provider)
    }

    return (
        <div className="auth__wrap">
            <AuthForm />
            <div className="socail__wrap">
                <button className="google" onClick={onSocialClick} name="google">
                    Continue with Google
                    <AiOutlineGooglePlus className="google__icon" />
                </button>
                <button className="github" onClick={onSocialClick} name="github">
                    Continue with Github
                    <AiFillGithub className="github__icon" />
                </button>
            </div>
        </div>
    )
}

export default Auth
