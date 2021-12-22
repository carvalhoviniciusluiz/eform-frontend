import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

type RouterProps = {
  makeLogin: React.FC
}

const Router = ({ makeLogin: Login }: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
