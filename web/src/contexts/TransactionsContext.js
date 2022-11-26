import { createContext, useState, useEffect } from "react";
import { api } from "../lib/axios";

export const TransactionsContext = createContext()

export function TransactionsProvider({ children }) {

    const [transactions, setTransactions] = useState([])

    async function fetchTransactions(query) {
       const response = await api.get('/transactions', {
            params: {
                q: query
            }
       })

        setTransactions(response.data.count)
    }

    async function createTransaction(data){
        const response = await api.post('/transactions', {
            title: data.description,
            value: data.value,
            operation: data.type,
            category: data.category
        })

        setTransactions(state => [response.data, ...state ])
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return (
        <TransactionsContext.Provider 
        value={{ 
            transactions, 
            fetchTransactions,
            createTransaction
            }}>
            {children}
        </TransactionsContext.Provider>
    )
}