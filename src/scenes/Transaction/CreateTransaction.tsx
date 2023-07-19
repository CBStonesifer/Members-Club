import React, { useState } from 'react'
import { TransactionUtils } from '../../utils/TransactionUtils';
import { DEFAULT_DESTINATION_ADDRESS } from '../../utils/Chain';
import { SafeAuthKit, Web3AuthAdapter } from '@safe-global/auth-kit';

function CreateTransaction({authKit}: {authKit?: SafeAuthKit<Web3AuthAdapter>}) {
    const [address, setAddress] = useState<string>('');

    const [amount, setAmount] = useState<number>(1);

  
    function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        setAmount(Number(event.target.value));
    }

    //_____________Account Removal and Addition___________________________
    function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
      setAddress(event.target.value);
    }

    function removeAddressFromSafe(sponsored: boolean = false){
      // Perform logic with the input values
      if(amount > 0){
        const result = TransactionUtils.removeOwner(localStorage.getItem('safeAddress')!, address, amount);
        console.log('Remove called:', result);
      }
    };

    function addAddressToSafe (sponsored: boolean = false){
      // Perform logic with the input values
      if(amount > 0){
        const result = TransactionUtils.addOwner(localStorage.getItem('safeAddress')!, address, amount);
        console.log('Addition called: ', result);
      }
    };
    
  return (
    <div>
         <label>
        Address to Add/Remove
        </label>
      <br/>
        <label className='text-muted'>
        Example (vitalik.eth): {DEFAULT_DESTINATION_ADDRESS}
        </label>
        <input
              className="form-control mb-3"
              value={address}
              onChange={handleAddressChange}
            />

         <label>
        New Threshold Value
        </label>
        <input
              type="number"
              className="form-control mb-3"
              value={amount}
              onChange={handleAmountChange}
            />
            <button className="btn btn-outline-primary my-2" onClick={()=>addAddressToSafe()}>
              Add Owner
            </button>
            <button className="btn btn-primary my-2" onClick={()=>removeAddressFromSafe()}>
              Remove Owner
            </button>{' '}
            
    </div>
  )
}

export default CreateTransaction