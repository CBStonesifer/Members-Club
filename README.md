# MURAL.XYZ Coding Project

### Project Requirements
- Login via Metamask
- Create a UI to display the user's current balance, send funds, and display transaction history (linking each transaction to etherscan)
- Allow users to setup a gnosis safe with an arbitrary number of approvers
- Create a UI showing approvers/owners, give them nicknames, change approvers, and adjust the threshold value

### Running the Project
This project should be run in the following way after cloning it from GitHub:

1. Switch to Node version 18.0.0 by running `nvm install 18.0.0` with Node Version Manager installed.

2. Next, run `yarn install` in the terminal of the Member's Club directory to install all of the project's dependencies.

3. Run `npm start` to begin the program and open your web browser. Use the browser's console to follow along with the functions being called in the project.

### Project Structure

#### Create Wallet
- Here, the user can create a Multisig Wallet by inputting an arbitrary number of owners' public addresses. Owners can be added and removed prior to submitting the new wallet to the network.
- The user also has the ability to choose the threshold of approvers for transactions proposed to the wallet. This number should be greater than 1 and less than the number of owners.
- Using the MetaMask Wallet extension in the browser, the user can sign for the creation of the wallet after pressing 'Create Wallet'. If the wallet is successfully created, the Gnosis Safe address will appear at the bottom of the box.

#### Load Wallet
- The textbox here allows the user to insert the address of an existing Safe Wallet. The new Wallet address from the box above can also be copied into the textbox.
- Once the Safe Wallet address is pasted and saved to local storage, the wallet can be viewed on the Gnosis Safe Wallet interface in a separate tab.

#### Fund Wallet
- To use this tab, a `.env` file must be created and filled with the following values:
```
REACT_APP_ALCHEMY_API=
REACT_APP_METAMASK_PRIVATE_KEY= 
```
- Next, with the account whose private key was used, press 'Connect Wallet'.
- In the input space below, the user can paste an address and input an amount to transfer.
- The Wallet's transaction history can be viewed in the next tab.

#### Manage Wallet
- This box is for managing the Safe Wallet. Here, owners can be removed from the safe, and new addresses can be added as new owners. The approval threshold can also be changed, although it should always be greater than one and less than the total number of owners.
- Pending transactions will appear in the 'Review Transactions' tab. Here, owners can sign proposed transactions by selecting 'Confirm'. Once enough proposers have signed, the transaction can be executed by selecting 'Execute'.
- Finally, the wallet owners can be viewed in the final tab. The option to name each of the owners can also be found here.

### Known Bugs
#### Create Wallet
- Occainsionally, an error will occur that states that gas fees cannot be estimated. Adding optional parameters to set gaslimits only appears to break the gnosis safe protocol-kit's function call 'deploySafe'. I have found that rerunning npm start or simply waiting for some time resolved the error.

#### Fund Wallet
- To transfer funds, I used the alchemy-sdk. When transferring funds to a generated Safe Wallet, the Gnosis Safe Wallet interface does not update with the new amount of transfered GoerliETH, although the transaction does appear on the block explorer.

#### Manage Wallet
- The 'Review Transactions' tab does not update on its own, even given that 'getPendingTransactions' calls itself withing a React useEffect statement. Once a transaction is proposed, after given a moment to process on the testnet, the page must be refreshed to view the pending transactions. This also includes loading the execute button when the threshold of approvals is met.

\
\
Main resources used for this project: \
https://github.com/5afe/safe-space \
https://docs.safe.global/ \
https://safe-global.github.io/safe-core-sdk/ \
https://www.alchemy.com/sdk

