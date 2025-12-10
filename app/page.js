import React from 'react'
import LandingPage from './LandingPage'
import { categories,products } from '@/lib/Mockdata'
function page() {
  return (
    <div>
      <LandingPage categories={categories} products={products}/>
    </div>
  )
}

export default page