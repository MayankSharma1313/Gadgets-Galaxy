import { FilterMenu } from '@/components/custom/FilterMenu'
import { HeaderDisplay } from '@/components/custom/HeaderDisplay'
import { ProductList } from '@/components/custom/ProductList'
import React from 'react'

export const Home = () => {

  

  return (
    <div className=''>
      <HeaderDisplay/>
      <FilterMenu/>
      <ProductList/>
    </div>
  )
}
