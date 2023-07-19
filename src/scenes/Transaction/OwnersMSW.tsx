import { useState, useEffect} from "react";
import { TransactionUtils } from "../../utils/TransactionUtils";
import { CHAIN_INFO, DEFAULT_CHAIN_ID } from "../../utils/Chain";
import SafeApiKit from "@safe-global/api-kit";


function OwnersMSW(){

    type ownerObject = {
        address: string,
        nickname: string,
      };

    const safeAddress = localStorage.getItem('safeAddress') || '';
    const [txServiceUrl, setTransactionServiceUrl] = useState<string>(CHAIN_INFO[DEFAULT_CHAIN_ID].transactionServiceUrl);
    const [owners, setOwners] = useState<ownerObject[]>([]);
    const [myNickname, setMyNickname] = useState<string[]>(Array(owners.length).fill(''))

    const [newThreshold, setNewThreshold] = useState<number>(1)

    function updateNumberApprovers(){
        TransactionUtils.changeThreshold(safeAddress, newThreshold);
    }

    const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewThreshold(Number.parseInt(e.target.value));
      }


    useEffect(() => {

        async function getSafeOwners() {
            const ethAdapter = await TransactionUtils.getEthAdapter(false)


            const chainId = await ethAdapter.getChainId();
            const chainInfo = CHAIN_INFO[chainId.toString()];
            let updatedTxServiceUrl = chainInfo.transactionServiceUrl;
            setTransactionServiceUrl(updatedTxServiceUrl);
            
            const safeService = new SafeApiKit({ txServiceUrl: updatedTxServiceUrl, ethAdapter })
            console.log({safeAddress, safeService});
            const safeOwners = ((await safeService.getSafeInfo(safeAddress)).owners)

            const ownerArray: { address: string; nickname: string }[] = safeOwners.map((str) => ({
              address: str,
              nickname: '',
            }));
            setOwners(ownerArray);
          }
      
          getSafeOwners()
    }, [safeAddress, txServiceUrl])

    const updateObjectAtIndex = (index: number, updatedObject: { address: string; nickname: string }) => {
        setOwners((prevArray) => {
          const newArray = [...prevArray]; // Create a copy of the original array
          newArray[index] = updatedObject; // Update the desired object at the specified index
          return newArray; // Return the updated array
        });
      };
    const handleNickName = (index: number, nickname: string) => {
        setMyNickname((prevArray) => {
            const newArray = [...prevArray]; // Create a copy of the original array
            newArray[index] = nickname; // Update the desired object at the specified index
            return newArray; // Return the updated array
          });
    }


    return(
        <div>
            <div>
                Update Number of Approvers
                <input
                    type="number"
                    className="form-control"
                    value={newThreshold}
                    onChange={handleNumber}
                />
                <button type="button" className="btn btn-outline-primary my-2" onClick={() => updateNumberApprovers()} >Enter</button>
            </div>
                <table className="table table-striped overflow-auto">
                    <thead>
                    <tr>
                        <th>Owner Address</th>
                        <th>Nickname</th>
                        <th>Enter Nickname</th>
                    </tr>
                    </thead>
                    <tbody>
                    {owners.map((owner, index) => (
                        <tr key={index}> 
                            <td>{owner.address}</td>
                            <td>{owner.nickname}</td>
                            <td>
                                <input type="text" className="form-control mb-3" placeholder="Enter nickname" onChange={(e) => handleNickName(index, e.target.value)}/>
                            </td>
                            <td>
                                <button type="button" className="btn btn-outline-primary my-2" onClick={() => updateObjectAtIndex(index, {address: owner.address, nickname: myNickname[index]})} >Enter</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
    )
}
export default OwnersMSW;

/**
 * 
 */