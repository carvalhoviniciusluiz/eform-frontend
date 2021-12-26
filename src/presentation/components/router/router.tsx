import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Signup } from '@/presentation/pages'

type RouterProps = {
  makeLogin: React.FC
}

const Router = ({ makeLogin: Login }: RouterProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/signup'
          element={
            <Signup
              validation={{
                validate: (fieldName: string, fieldValue: string) => {
                  return null
                }
              }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
