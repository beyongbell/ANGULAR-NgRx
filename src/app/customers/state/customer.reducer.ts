import * as CustomerActions from "./customer.actions";
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Customer } from "../customer.model";
import * as fromRoot from "../../state/app-state";

export interface CustomerState {
    customers:Customer[],
    loading:boolean,
    loaded:boolean,
    error:string,
}

export interface AppState extends fromRoot.AppState {
    customers: CustomerState
}

export const initialState: CustomerState = {
    customers: [],
    loading: false,
    loaded: false,
    error: ""
}

export function CustomerReducer(
    state = initialState,
    action: CustomerActions.Action
): CustomerState {
    switch(action.type) {
        case CustomerActions.CustomerActionTypes.LOAD_CUSTOMERS : {
            return {
                ...state,
                loading: true
            }
        }
        case CustomerActions.CustomerActionTypes.LOAD_CUSOTMERS_SUCCESS : {
            return {
                ...state,
                loading: false,
                loaded: true,
                customers : action.payload
            }
        }
        case CustomerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL : {
            return {
                ...state,
                loading: false,
                loaded: true,
                error : action.payload
            }
        }
        default: {
            return state;
        }
    }
}

const getCustomerFeatureState = createFeatureSelector<CustomerState>("customers")

export const getCustomers = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.customers
)
export const getCustomersLoading = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.loading
)
export const getCustomersLoaded = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.loaded
)
export const getError = createSelector(
    getCustomerFeatureState,
    (state: CustomerState) => state.error
)