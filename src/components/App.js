import React, { useEffect, useState } from 'react'
import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
    const [init, setInit] = useState(false)
    const [userObj, setUserObj] = useState(null)

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    // updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
                })
            } else {
                setUserObj(null)
            }
            setInit(true)
        })
    }, [])

    const refresUser = () => {
        const user = authService.currentUser
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
        })
    }
    return <>{init ? <AppRouter refresUser={refresUser} userObj={userObj} /> : 'Initializ...'}</>
}

export default App
