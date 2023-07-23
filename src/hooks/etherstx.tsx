import { ethers, JsonRpcSigner } from "ethers";
const contractAddress = "0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B";

const gas_abi = require('./abi.json');

export const viewTokenURI = async (signer: JsonRpcSigner) => {
  const contractInstance = new ethers.Contract(
    contractAddress,
    gas_abi,
    signer
  );
  const result = await contractInstance.tokenURI(0)
  return result;
};
