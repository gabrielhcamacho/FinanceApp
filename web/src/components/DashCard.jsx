import React from 'react'

import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs'

export default function DashCard({ title }) {

    let amount = 500

    let icon;

    if (title === 'Entrada') {
        icon = (
            <BsArrowUpCircle className='text-green-500 text-2xl' />
        )
    }
    if (title === 'Saida') {
        icon = (
            <BsArrowDownCircle className='text-red-500 text-2xl' />
        )
    }
    if (title === 'Total') {
        icon = (
            <span className='text-white text-2xl'>$</span>
        )
    }


    return (
        <div className='shadow-md rounded-md w-80 p-4 bg-gray-700 '>
            <div className='flex justify-between items-center '>
                <span className='text-white text-xl '>{title}</span>
                {icon}
            </div>
            <div className='flex w-full mt-4'>
                <span className='text-3xl text-white font-semibold'>R$ {amount}</span>
            </div>
        </div>
    )
}