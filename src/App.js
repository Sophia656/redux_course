import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asyncActions/customers';
import { addCashAction } from './store/cashReducer';
import { asyncDecrementCreator, asyncIncrementCreator, decrementCreator, incrementCreator } from './store/countReducer';
import { fetchUsers } from './store/userReducer';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);
  const count = useSelector(state => state.count.count);
  const users = useSelector(state => state.users.users)

  const addCash = (cash) => {
    dispatch({type: 'ADD_CASH', payload: cash})
  }
  const getCash = (cash) => {
    dispatch({type: 'GET_CASH', payload: cash})
  }
  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer))
  }
  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className={'app'}>
      <div style={{fontSize: '3rem'}}>Balance: {cash}</div>
      <div style={{fontSize: '3rem'}}>{count}</div>
      <div style={{display: 'flex'}}>
        <button onClick={() => dispatch(asyncIncrementCreator())} className={'btns'}>INCREMENNT++</button>
        <button onClick={() => dispatch(asyncDecrementCreator())} className={'btns'}>DECREMENNT--</button>
        <button onClick={() => dispatch(fetchUsers())} className={'btns'}>ADD USERS</button>
        <button onClick={() => addCash(Number(prompt()))} className={'btns'}>ADD CASH</button>
        <button onClick={() => getCash(Number(prompt()))} className={'btns'}>GET CASH</button>
        <button onClick={() => addCustomer(prompt())} className={'btns'}>ADD CUSTOMER</button>
        <button onClick={() => dispatch(fetchCustomers())} className={'btns'}>GET CUSTOMERS FROM THE DATABASE</button>
      </div>
      <div>
        {users.map(user =>
          <div key={user.id} style={{fontSize: '2rem', border: '1px solid #3b5e80', padding: '10px', marginTop: '20px'}}>{user.name}</div>
        )}
      </div>
      {customers.length > 0 ?
      <div>
        {customers.map(customer =>
          <div key={customer.id} onClick={() => removeCustomer(customer)} style={{fontSize: '2rem', border: '1px solid #3b5e80', padding: '10px', marginTop: '20px'}}>{customer.name}</div>
        )}
      </div>
      :
      <div style={{fontSize: '3rem'}}>There are no customers!</div>
      }
    </div>
  );
}

export default App;
