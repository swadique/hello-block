import { useEffect, useState } from 'react';
import { abi } from './abi';
const Web3 = window.Web3;
const ethereum = window.ethereum;
var contract;
const contractAddress = '0x93410dd4D710b70eC560b9E9d2677437f24b0480';

function App() {
  const [message, setMessage] = useState('');

  const contractMessage = async () => {
    contract = new window.web3.eth.Contract(abi, contractAddress);
    let message = await contract.methods.getMessage().call();
    setMessage(message);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        ethereum.enable();
        contractMessage();
      } catch (error) {
        // User denied account access...
        console.log(error);
      }
    }
    // Non-dapp browsers...
    else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }
  }, []);
  return (
    <div className='App'>
      <div>{message}</div>
    </div>
  );
}

export default App;
