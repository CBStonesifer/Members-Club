import React, { useState } from 'react';
import { TextUtils } from '../../utils/TextUtils';
import { TransactionUtils } from '../../utils/TransactionUtils';
import WalletManage from './WalletManage';
import AccountManage from './AccountManage';
import { SafeAuthKit, Web3AuthAdapter } from '@safe-global/auth-kit';
import MetaMaskConnect from "../Alchemy/MetaMaskConnect"


function WalletCreate() {
  const [inputs, setInputs] = useState([{ key: TextUtils.randomString(), value: '' }]);
  // usestate for threshold
  const [threshold, setThreshold] = useState(1);
  // usestate for safe address
  const [safeAddress, setSafeAddress] = useState(localStorage.getItem('safeAddress')||'');
  const [account, setAccount] = useState<SafeAuthKit<Web3AuthAdapter>>()
  const [newSafeMade, setNewSafeMade] = useState <boolean>(false)
  

  const addInput = () => {
    setInputs([
      ...inputs,
      { key: TextUtils.randomString(), value: '' }
    ]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = [...inputs];
    newInputs[index].value = e.target.value;
    setInputs(newInputs);
  };

  const handleThresholdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThreshold(Number.parseInt(e.target.value));
  }

  const handleLoggedIn = (loggedInAccount: SafeAuthKit<Web3AuthAdapter>) => {
    setAccount(loggedInAccount);
  }

  const removeInput = (inputToRemove: any) => {
    setInputs(inputs.filter((input, i) => input.key !== inputToRemove.key));
  };

  const createWallet = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(inputs);
    const safe = await TransactionUtils.createMultisigWallet(inputs.map((input) => input.value), threshold).then(()=> setNewSafeMade(true))
    
    console.log(safe);
  };

  function viewFunction(){
    const url = `https://app.safe.global/gor:${safeAddress}`;
    window.open(url, '_blank');
  }

  return (
    <div>
    <div className='EventDetail container card shadow my-5 p-5'>
        <h1 className='text-center mb-3'>
                Create a Wallet
        </h1>
      <form>
        {inputs.map((input, index) => (
          <div key={input.key} className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder={`Owner ${index + 1} Address`}
              value={input.value}
              onChange={(e) => handleInputChange(e, index)}
            />
            <button
              type="button"
              className="btn btn-outline-danger my-2"
              onClick={() => removeInput(input)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline-primary my-2"
          onClick={addInput}
        >
          Add Another Owner
        </button>
        <div>
          <hr/>

        <label>
        Owners needed to approve a transaction
        </label>
        <input
              type="number"
              className="form-control"
              value={threshold||inputs.length}
              onChange={handleThresholdChange}
            />
        </div>
        <button className="btn btn-primary my-2" onClick={createWallet}>
          Create Wallet
        </button>
      </form>
      {newSafeMade ? localStorage.getItem('safeAddress'): ''}
      <hr />

      
    </div>
    <div className='EventDetail container card shadow my-5 p-5'>
      <h3 className='text-center mb-3'>
              Load a Wallet
        </h3>
        <input
                type="text"
                className="form-control"
                placeholder={`Existing Safe Address`}
                value={safeAddress}
                onChange={(e) => setSafeAddress(e.target.value)}
              />
          <button
            type="button"
            className="btn btn-outline-primary my-2"
            onClick={() => {
              localStorage.setItem('safeAddress', safeAddress);
            }}
          >
            Save Safe Address to Local Storage
          </button>
          <button
            type="button"
            className="btn btn-outline-primary my-2"
            onClick= {() => viewFunction()}
          >
            View on Safe Wallet
          </button>
    </div>
    <MetaMaskConnect/>
    <WalletManage authKit={account} />
    </div>
  );
}

export default WalletCreate;
