import { Action } from "@ngrx/store";
import { Customer } from "../customer.model";

export enum CustomerActionTypes {
    LOAD_CUSTOMERS = "[Customer] Load Customers",
    LOAD_CUSOTMERS_SUCCESS = "[Customer] Load Customers Success",
    LOAD_CUSTOMERS_FAIL = "[Customer] Load Customers Fail"
}

export class LoadCustomers implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMERS;
}

export class LoadCustomersSuccess implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSOTMERS_SUCCESS;
    constructor(public payload: Customer[]) {}
}

export class LoadCustomersFail implements Action {
    readonly type = CustomerActionTypes.LOAD_CUSTOMERS_FAIL;
    constructor(public payload: string) {}
}

export type Action = LoadCustomers | LoadCustomersSuccess | LoadCustomersFail;