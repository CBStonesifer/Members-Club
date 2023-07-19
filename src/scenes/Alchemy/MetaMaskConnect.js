// Importing modules
import React, { useState, useEffect } from "react";
import { Alchemy, Network, Utils, Wallet } from "alchemy-sdk";

const MetaMaskConnect = () => {
    const [transactions, setTransactions] = useState([]);
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [data, setdata] = useState({
        address: "",
        Balance: null,
        Tsx: null,
    });
    const alchemyConfig = {
        apiKey: process.env.REACT_APP_ALCHEMY_API,
        network: Network.ETH_GOERLI,
      };
    const alchemy = new Alchemy(alchemyConfig);


    // Button handler button for handling a
    // request event for metamask
    const btnhandler = () => {

        // Asking if metamask is already present or not
        if (window.ethereum) {

        // res[0] for fetching a first wallet
        window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((res) => accountChangeHandler(res[0]));
        } else {
        alert("install metamask extension!!");
        }
        console.log("Connect")
    };

    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = (address) => {

        // Requesting balance method
        window.ethereum
        .request({
            method: "eth_getBalance",
            params: [address, "latest"]
        })
        .then((balance) => {
            // Setting balance
            setdata({
            address: address,
            Balance: Utils.formatEther(balance),
            Tsx: transactions,
            });            
        });
    };

    // Function for getting handling all events
    const accountChangeHandler = (account) => {
        // Setting an address data
        setdata({
        address: account,
        });

        // Setting a balance
        historyRetrieval(account);
        getbalance(account); //hel
    };

    const historyRetrieval = async (address) => {
        const res = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: address,
            withMetadata: false,
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
          });
          setTransactions(res.transfers);
    }
    
    const sendTransaction = async(reciever, amount) => {
        console.log("Priv key: "+ process.env.REACT_APP_METAMASK_PRIVATE_KEY);
        let wallet = new Wallet(process.env.REACT_APP_METAMASK_PRIVATE_KEY);

        const nonce = await alchemy.core.getTransactionCount(
            wallet.address,
            "latest"
          );
        
          let transaction = {
            to: reciever,
            value: Utils.parseEther(amount),
            gasLimit: "21000",
            maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
            maxFeePerGas: Utils.parseUnits("20", "gwei"),
            nonce: nonce,
            type: 2,
            chainId: 5,
          };
        
          let rawTransaction = await wallet.signTransaction(transaction);
          let tx = await alchemy.core.sendTransaction(rawTransaction);
          console.log("Sent transaction", tx);
          historyRetrieval(data.address);
    }

    useEffect((account) => {
        if(data.address != ""){
            historyRetrieval(account);
        }
      }, []);
    
    
    const transferComponent = () => {
        return (
            <div>
                    <div>
                    Enter an address to transfer funds to
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={`Owner Address`}
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder={`Amount`}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-outline-primary my-2"
                        onClick={() => sendTransaction(account, amount)} 
                    >
                    Confirm
                    </button>
                </div>
        )
      }

      const historyComponent = () => {
        return (
            <div>
                <table className="table table-striped overflow-auto">
                    <thead>
                    <tr>
                        <th>Block Number</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Value</th>
                        <th>Hash</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.hash}>
                            <td>{transaction.blockNum}</td>
                            <td>{transaction.from}</td>
                            <td>{transaction.to}</td>
                            <td>{transaction.value}</td>
                            <td>
                                <a href={`https://goerli.etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noreferrer">View on Etherscan</a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )}
    
      const steps = [
        {
          name: 'transfer',
          title: 'Transfer Funds',
          component: transferComponent(),
        },
        {
          name: 'history',
          title: 'Transaction History',
          component: historyComponent(),
        },
      ]
      const [defaultTab, setDefaultTab] = useState('transfer');
      


      return (
        <div>
            <div className='TransactionManagement container card shadow my-5 p-5'>
                <h1 className='text-center mb-3'>
                     Fund Wallet
                </h1>
                <button
                        type="button"
                        className="btn btn-outline-primary my-2"
                        onClick={() => btnhandler()} 
                    >
                    Connect Wallet
                    </button>  
        <ul className="nav nav-tabs" id="popupTab" role="tablist">
        {steps.map((step, index) => {
          return (
            <li className="nav-item" role="presentation" key={index}>
              <button className={`nav-link ${defaultTab === step.name ? 'active' : ''}`} id={`${step.name}-tab`} data-bs-toggle="tab" data-bs-target={`#${step.name}`} type="button" role="tab" aria-controls={step.name} aria-selected="true" onClick={() => setDefaultTab(step.name)}>
                {step.title}
              </button>
            </li>
          )
        })
        }
      </ul>
      <div className="p-3 tab-content" id="popupTabContent">
        {steps.map((step, index) => {
          return (
            <div className={`tab-pane fade ${defaultTab === step.name ? 'show active' : ''}`} id={step.name} role="tabpanel" aria-labelledby={`${step.name}-tab`} key={index}>
              {step.component}
            </div>
          )
        })
        }
      </div>
      </div>
      </div>

      );


    // return (
    //     <div>
    //         <div className='TransactionManagement container card shadow my-5 p-5'>
    //         <h1 className='text-center mb-3'>
    //             Fund Wallet
    //         </h1>
    //             <div>
                    // <button
                    //     type="button"
                    //     className="btn btn-outline-primary my-2"
                    //     onClick={() => btnhandler()} 
                    // >
                    // Connect Wallet
                    // </button>
    //             </div>
    //             <hr/>
                
    //         </div>
    //     </div>
    // );
}

export default MetaMaskConnect;

/* CODE GRAVE
{transactions.map((transaction, index) => (
                    <div key={index}>
                    <h2>Transaction {index + 1}</h2>
                    <p>Block number: {transaction.blockNum}</p>
                    <p>
                        <a href={`https://goerli.etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noreferrer">Hash: {transaction.hash}</a>
                    </p>
                    <p>From: {transaction.from}</p>
                    <p>To: {transaction.to}</p>
                    <p>Value: {transaction.value}</p>
                    </div>
                ))}
*/
