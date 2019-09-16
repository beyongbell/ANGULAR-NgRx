import { Injectable } from "@angular/core";

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";

import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { CustomerService } from "../customer.service";
import * as CustomerActions from "../state/customer.actions";
import { Customer } from "../customer.model";

@Injectable()
export class CustomerEffect {
    constructor(
        private actions$: Actions,
        private CustomerService: CustomerService
    ) {}

    @Effect()
    loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<CustomerActions.LoadCustomers>(
        CustomerActions.CustomerActionTypes.LOAD_CUSTOMERS
    ),
    mergeMap((action: CustomerActions.LoadCustomers) =>
      this.CustomerService.getCustomers().pipe(
        map(
          (customers: Customer[]) =>
            new CustomerActions.LoadCustomersSuccess(customers)
        ),
        catchError(err => of(new CustomerActions.LoadCustomersFail(err)))
      )
    )
  );
}