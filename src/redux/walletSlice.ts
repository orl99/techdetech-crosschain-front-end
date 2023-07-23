import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface WalletState {
    walletAddress: string;
    assets: [];

}

const initialState: WalletState = {
    walletAddress: '',
    assets: [],
}

export const walletSlice = createSlice({
    name: 'walletState',
    initialState,
    reducers: {
        setAllWalletState: (state, action: PayloadAction<WalletState>)  => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
        state = action.payload
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
export const { setAllWalletState  } = walletSlice.actions

export default walletSlice.reducer