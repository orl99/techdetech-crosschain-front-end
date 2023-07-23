import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AssetsList } from '../interface/AssetsList';

// export interface ListedAssets { 
//     balance: number;
//     token: string;
//     contract: Contract;
// }
export interface WalletState {
    listedAssets: AssetsList[]
}

const initialState: WalletState = {
    listedAssets: []
}

export const walletSlice = createSlice({
    name: 'walletState',
    initialState,
    reducers: {
        setListedAssetsState: (state, action: PayloadAction<AssetsList[]>)  => {
            return {
                ...state,
                listedAssets: [...action.payload]
            }
        },
    //     decrement: (state) => {
    //         state.value -= 1
    //     },
    //     incrementByAmount: (state, action: PayloadAction<number>) => {
    //         state.value += action.payload
    //     },
    },
})

// Action creators are generated for each case reducer function
export const selectListedAssets = (state: WalletState) => state.listedAssets;
export const { setListedAssetsState  } = walletSlice.actions

export default walletSlice.reducer