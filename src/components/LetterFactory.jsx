import React, { useState } from 'react'
import { dbService, storageService } from 'fbase'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { v4 as uuidv4 } from 'uuid'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'

const LetterFactory = ({ userObj }) => {
    const [letter, setLetter] = useState('')
    const [attachment, setAttachment] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault()
        let attachmentUrl = ''
        if (attachment !== '') {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
            const response = await uploadString(attachmentRef, attachment, 'data_url')
            attachmentUrl = await getDownloadURL(response.ref)
        }
        try {
            const docRef = await addDoc(collection(dbService, 'letters'), {
                text: letter,
                createdAt: serverTimestamp(),
                creatorId: userObj.uid,
                attachmentUrl,
            })
            setLetter('')
            setAttachment('')
            console.log('Document written with ID: ', docRef.id)
        } catch (error) {
            console.error('Error adding document: ', error)
        }
    }

    const onChange = (event) => {
        const {
            target: { value },
        } = event
        setLetter(value)
    }

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event
        const theFile = files[0]
        const reader = new FileReader()
        reader.onloadend = (finishedEvent) => {
            // console.log(finishedEvent)
            const {
                currentTarget: { result },
            } = finishedEvent
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
    }

    const onClearAttachment = () => setAttachment(null)

    return (
        <form className="home__form" onSubmit={onSubmit}>
            <input value={letter} onChange={onChange} type="text" placeholder="What's on your mind " maxLength={120} />
            <label htmlFor="fileInput" className="plus__icon__wrap">
                Add photos
                <BiMessageSquareAdd className="plus__icon" />
            </label>
            <input id="fileInput" type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />

            {attachment && (
                <div className="preview__img">
                    <img src={attachment} alt="사진" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )}

            <label htmlFor="submit__cweet" className="arrow__icon__wrap">
                <BsFillArrowRightCircleFill className="arrow__icon" />
            </label>
            <input id="submit__cweet" type="submit" value="done" />
        </form>
    )
}

export default LetterFactory
