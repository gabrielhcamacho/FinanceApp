import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'


export function useSummary(){
    const { transactions } = useContext(TransactionsContext)

    const summary = transactions.reduce(
      (acc, transaction) => { 
  
        if(transaction.operation === 'in'){
          acc.in += transaction.value
          acc.total += transaction.value
        } else {
          acc.out += transaction.value
          acc.total -= transaction.value
        }
        return acc
       },
      {
        in: 0,
        out: 0,
        total: 0
      }
    )

    return summary
  
}