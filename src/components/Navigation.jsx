import React from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsTwitter } from 'react-icons/bs'

const Navigation = ({ userObj }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <BsTwitter className="twitter__icon" />
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <CgProfile className="profile__icon" />
                    </Link>
                    <Link to="/profile">{`${userObj.displayName || userObj.email}'s Profile`}</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation
