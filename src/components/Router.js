import React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from 'routes/Auth'
import Home from 'routes/Home'
import Profile from 'routes/Profile'
import Navigation from 'components/Navigation'

const AppRouter = ({ userObj, refresUser }) => {
    return (
        <HashRouter>
            {userObj && <Navigation userObj={userObj} />}
            <Routes>
                {userObj ? (
                    <>
                        <Route path="/" element={<Home userObj={userObj} />}></Route>
                        <Route path="/profile" element={<Profile userObj={userObj} refresUser={refresUser} />}></Route>
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Auth />}></Route>
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </>
                )}
            </Routes>
        </HashRouter>
    )
}

export default AppRouter
