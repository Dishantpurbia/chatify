import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Chat from "./page/chat"
import Login from "./page/login"
import Signup from "./page/signup"
import { useauthstore } from './store/useauthstore'
import PageLoader from './components/PageLoader'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const {ischeckingauth,checkauth,authuser} = useauthstore()

  useEffect(()=>{
    checkauth()
  },[checkauth]);

  if(ischeckingauth) return <PageLoader />

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute pointer-events-none inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute pointer-events-none top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute pointer-events-none bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <Routes>
        <Route path="/" element={authuser? <Chat />: <Navigate to={"/login"}/>} />
        <Route path="/login" element={!authuser? <Login /> : <Navigate to={"/"}/>} />
        <Route path="/signup" element={!authuser? <Signup />: <Navigate to={"/"}/>} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
