import { dbService } from 'fbase'
import React, { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import Letters from 'components/Letters'
import LetterFactory from 'components/LetterFactory'

const Home = ({ userObj }) => {
    const [letters, setLetters] = useState([])

    useEffect(() => {
        // getLetters()
        const q = query(collection(dbService, 'letters'), orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
            const letterArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setLetters(letterArray)
        })
    }, [])

    return (
        <div className="home__wrap">
            <LetterFactory userObj={userObj} />
            <div>
                {letters.map((letter) => (
                    <Letters key={letter.id} letterObj={letter} isOwner={letter.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    )
}

export default Home
