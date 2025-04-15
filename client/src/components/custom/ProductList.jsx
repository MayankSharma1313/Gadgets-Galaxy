import React from 'react'
import { ProductCard } from './ProductCard'
import { useSelector } from 'react-redux'

export const ProductList = () => {

  const { products } = useSelector((state) => state.product)

  return (
    <div className='w-[93vw] grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 mx-auto my-10 place-content-center'>
    {
      products?.map((product) => (
        <ProductCard key={product._id} {...product} />
      ))
    }
            
    </div>
  )
}
