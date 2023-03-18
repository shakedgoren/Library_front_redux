import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import {Loan} from '../models/Loan';
import { getLoans, addLoan, deleteLoan, updateLoan } from '../api/LoansAPI';


export interface LoansState {
  loan:Loan[],
  refresh:boolean
}

const initialState: LoansState = {
  loan:[],
  refresh: false
};

export const getLoansAsync = createAsyncThunk(
  'loans/getLoans',
  async (access:string) => {
    const response = await getLoans(access);
    return response;}
);

export const addLoanAsync = createAsyncThunk(
  'loans/addLoan',
  async (data:any) => {
    const response = await addLoan(data.loan,data.access);
    return response;}
);

export const deleteLoanAsync = createAsyncThunk(
  'loans/deleteLoan',
  async (data:any) => {
    const response = await deleteLoan(data.loan,data.access);
    return response;}
);

export const updateLoanAsync = createAsyncThunk(
  'loans/updateLoan',
  async (data:any) => {
    const response = await updateLoan(data.loan,data.access);
    return response;}
);

export const LoansSlice = createSlice({
  name: 'loans',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoansAsync.fulfilled, (state,action) => {
        state.loan = action.payload.data
      })
      .addCase(addLoanAsync.fulfilled, (state) => {
        state.refresh =! state.refresh
      })
      .addCase(deleteLoanAsync.fulfilled, (state) => {
        state.refresh =! state.refresh
      })
      .addCase(updateLoanAsync.fulfilled, (state) => {
        state.refresh =! state.refresh
      });
  },
});

export const { } = LoansSlice.actions;
export const selectLoan = (state: RootState) => state.loans.loan;
export const selectRefresh = (state: RootState) => state.loans.refresh;
export default LoansSlice.reducer;
