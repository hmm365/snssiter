import { authService, dbService } from 'fbase'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
const Profile = ({ userObj, refresUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const navigate = useNavigate()

    const onLogOutClick = () => {
        authService.signOut()

        navigate('/', { replace: true })
    }

    const getMyLetters = async () => {
        const q = query(collection(dbService, 'letters'), where('creatorId', '==', `${userObj.uid}`), orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
        })
    }
    useEffect(() => {
        getMyLetters()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const onChange = (event) => {
        const {
            target: { value },
        } = event
        setNewDisplayName(value)
    }
    const onSubmit = async (event) => {
        event.preventDefault()
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, { displayName: newDisplayName })
        }
        refresUser()
    }

    return (
        <>
            <form onSubmit={onSubmit} className="profile__form">
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                <button className="update__profile" type="submit">
                    Update Profile
                </button>
                <button type="button" className="logout" onClick={onLogOutClick}>
                    Log Out
                </button>
            </form>
        </>
    )
}

export default Profile
