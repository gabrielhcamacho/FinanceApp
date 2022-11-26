import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import DashCard from '../src/components/DashCard'
import Header from '../src/components/Header'
import { SearchForm } from '../src/components/SearchForm'
import { dateFormatter, priceFormatter } from '../src/utils/formatter'
import { useSummary } from '../src/hooks/useSummary'
import { TransactionsContext } from '../src/contexts/TransactionsContext'

export default function Home() {
  
  const { transactions } = useContext(TransactionsContext)
  const summary = useSummary()

  return (
    <div className='h-screen w-screen bg-gray-800 overflow-x-hidden overflow-y-auto pb-10'>

      <Header />

      <div className='w-full max-w-[1120px] mx-auto gap-14 px-5 grid grid-cols-3 mt-[-4rem]'>
        <DashCard title="Entrada" amount={priceFormatter.format(summary.in)}/>
        <DashCard title="Saida" amount={priceFormatter.format(summary.out)}/>
        <DashCard title="Total" amount={priceFormatter.format(summary.total)}/>
      </div>

      <div className='w-full max-w-[1120px] mt-4 mb-0 mx-auto px-5 '>
        <SearchForm />
        <table className='w-full mt-6 border-separate border-spacing-y-2'>

          <tbody>
            {transactions.map(transaction => {
              const type = transaction.operation
              console.log(type)
              return (
                <tr key={transaction.id}>
                  <td className='w-1/3'>{transaction.title}</td>
                  <td className=''>
                    <span className={`${type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.operation === 'out' && '- '}
                      {priceFormatter.format(transaction.value)}
                    </span>
                  </td>
                  <td className=''>{transaction.category}</td>
                  <td className=''>{dateFormatter.format(new Date(transaction.changeDate))}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>



    </div >
  )
}

