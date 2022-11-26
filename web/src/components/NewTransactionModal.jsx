import React from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { AiOutlineClose } from 'react-icons/ai'
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs'
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useForm, Controller } from 'react-hook-form'
import { api } from '../lib/axios';


export function NewTransactionModal() {

    const { control, register, handleSubmit, formState: { isSubmitting }, reset } = useForm({})

    async function handleCreateNewTransaction(data) {
        // console.log(data)
        await api.post('/transactions', {
            title: data.description,
            value: data.value,
            operation: data.type,
            category: data.category
        })

        reset()
    }

    return (

        <Dialog.Portal>
            <Dialog.Overlay className='fixed w-screen h-screen inset-0 bg-black opacity-75' />

            <Dialog.Content className='min-w-[32rem] rounded-md py-9 px-12 bg-gray-800 fixed 
            top-1/2 left-1/2 transform translate-y-[-50%] translate-x-[-50%]'>
                <Dialog.Title>Nova Transação</Dialog.Title>

                <Dialog.Close className='absolute bg-transparent border-none top-6 right-6 leading-none text-gray-500'>
                    <AiOutlineClose className='text-lg' />
                </Dialog.Close>



                <form onSubmit={handleSubmit(handleCreateNewTransaction)} className='mt-6 flex flex-col gap-4'>
                    <input
                        {...register('description')}
                        type="text"
                        placeholder='Descrição'
                        className='rounded-sm border-none bg-gray-900 text-gray-300 p-4 
                    placeholder:text-gray-500'/>
                    <input
                        {...register('value', { valueAsNumber: true })}
                        type="number"
                        placeholder='Preço' className='rounded-sm border-none bg-gray-900 text-gray-300 p-4 
                    placeholder:text-gray-500'/>
                    <input
                        {...register('category')}
                        type="text"
                        placeholder='Categoria' className='rounded-sm border-none bg-gray-900 text-gray-300 p-4 
                    placeholder:text-gray-500'/>

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <RadioGroup.Root onValueChange={field.onChange} value={field.value}className='grid grid-cols-2 gap-4 mt-2'>
                                    <RadioGroup.Item value="in" className={`bg-gray-700 p-4 flex items-center justify-center rounded-md border-none text-gray-300 gap-2 focus:bg-green-500`
                                    }>
                                        <BsArrowUpCircle className='text-lg text-green-300' />
                                        Entrada
                                    </RadioGroup.Item>

                                    <RadioGroup.Item value="out" className='bg-gray-700 p-4 flex items-center justify-center rounded-md border-none text-gray-300 gap-2 focus:bg-red-500'>
                                        <BsArrowDownCircle className='text-lg text-red-300' />
                                        Saida
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            )
                        }}
                    />

                    <button
                        disabled={isSubmitting}
                        type='submit'
                        className='h-[58px] border-none 
                    bg-green-600 font-bold px-5 rounded-md mt-6 hover:bg-green-700 
                    transition-all ease-in'>
                        
                        Cadastrar
                    </button>
                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}
