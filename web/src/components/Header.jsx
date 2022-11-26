import React from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from './NewTransactionModal';

export default function Header() {
    return (
        <div className='pt-9 pb-28 bg-gray-900'>

            <div className='w-full my-0 mx-auto max-w-[1120px] px-6 flex justify-between items-center'>
                <h1 className='text-white font-bold text-3xl'>Finance App</h1>

                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <button className='bg-green-300 text-gray-900 font-bold p-4 rounded-md hover:bg-green-400'>Nova Transação</button>
                    </Dialog.Trigger>

                   <NewTransactionModal/>

                </Dialog.Root>

            </div>

        </div>
    )
}
