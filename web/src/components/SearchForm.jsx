import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {BsSearch} from 'react-icons/bs'
import { TransactionsContext } from '../contexts/TransactionsContext'


export function SearchForm() {

  const { fetchTransactions } = useContext(TransactionsContext)

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({})

  async function handleSearchTransactions(data){
    await fetchTransactions(data.query)

    console.log(data)
  }

  return (
    <form className='flex gap-4 mt-6' onSubmit={handleSubmit(handleSearchTransactions)}>

        <input 
          {...register('query')}
          type="text" 
          className='flex-1 rounded-md border-none
         bg-gray-900 text-gray-300 p-4 placeholder:text-gray-500 outline-green-300'              placeholder='Busque aqui'
         />
         <button 
          disabled={isSubmitting}
          type="submit"
          className='flex items-center gap-3 p-4 bg-transparent
         border-[1px] border-green-300 text-green-300 font-bold rounded-md 
         hover:bg-green-500 hover:border-green-500 hover:text-white transition-all duration-200'>
            <BsSearch className='text-md'/> Buscar
         </button>

    </form>
  )
}
