import { Contract } from 'ethers';
export interface AssetsList {
    name: string;
    balance: number;
    APY: number;
    tokenSrc: string;
    contract?: Contract;
    address? : string;
}