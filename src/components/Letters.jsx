import { dbService, storageService } from 'fbase'
import React, { useState } from 'react'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

const Letters = ({ letterObj, isOwner }) => {
    const [editing, setEditing] = useState(false)
    const [newLetter, setNewLetter] = useState(letterObj.text)

    const onDeleteClick = async () => {
        const ok = window.confirm('정말로 삭제하시겠습니까?')
        if (ok) {
            const letterRef = doc(dbService, 'letters', `${letterObj.id}`)
            if (letterObj.attachmentUrl !== '') {
                const desertRef = ref(storageService, `${letterObj.attachmentUrl}`)
                await deleteObject(desertRef)
            }
            await deleteDoc(letterRef)
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev)
    const onSubmit = async (event) => {
        event.preventDefault()
        // console.log(letterObj, newLetter)
        const letterRef = doc(dbService, 'letters', `${letterObj.id}`)
        await updateDoc(letterRef, {
            text: newLetter,
        })
        setEditing(false)
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event
        setNewLetter(value)
    }
    return (
        <div className="cweet">
            {editing ? (
                <>
                    <form className="edit__form" onSubmit={onSubmit}>
                        <input className="edit" onChange={onChange} type="text" placeholder="Edit your Letter" value={newLetter} required />

                        <button className="edit" type="submit">
                            Update Letter
                        </button>
                    </form>
                    <button className="cancel" onClick={toggleEditing}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <h4>{letterObj.text}</h4>
                    {letterObj.attachmentUrl && <img src={letterObj.attachmentUrl} alt="사진" width="100px" height="100px" />}
                    {isOwner && (
                        <div className="edit__wrap">
                            <button onClick={onDeleteClick}>
                                <AiFillDelete className="delete__icon" />
                            </button>
                            <button onClick={toggleEditing}>
                                <AiFillEdit className="update__icon" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Letters
