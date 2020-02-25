import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { CustomerService } from '../customer.service';
import * as CustomerActions from '../state/customer.actions';
import { Customer } from '../customer.model';

@Injectable()
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  @Effect()
  loadCustomers$: Observable<Action> = this.actions$.pipe(
    ofType<CustomerActions.LoadCustomers>(
      CustomerActions.CustomerActionTypes.LOAD_CUSTOMERS
    ),
    mergeMap((action: CustomerActions.LoadCustomers) =>
      this.customerService.getCustomers().pipe(
        map(
          (customers: Customer[]) =>
            new CustomerActions.LoadCustomersSuccess(customers)
        ),
        catchError(err => of(new CustomerActions.LoadCustomersFail(err)))
      )
    )
  );

  @Effect()
  loadCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<CustomerActions.LoadCustomer>(
      CustomerActions.CustomerActionTypes.LOAD_CUSTOMER
    ),
    mergeMap((action: CustomerActions.LoadCustomer) =>
      this.customerService.getCustomerById(action.payload).pipe(
        map(
          (customer: Customer) =>
            new CustomerActions.LoadCustomerSuccess(customer)
        ),
        catchError(err => of(new CustomerActions.LoadCustomerFail(err)))
      )
    )
  );

  @Effect()
  createCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<CustomerActions.CreateCustomer>(
      CustomerActions.CustomerActionTypes.CREATE_CUSTOMER
    ),
    map((action: CustomerActions.CreateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.createCustomer(customer).pipe(
        map(
          (newCustomer: Customer) =>
            new CustomerActions.CreateCustomerSuccess(newCustomer)
        ),
        catchError(err => of(new CustomerActions.CreateCustomerFail(err)))
      )
    )
  );

  @Effect()
  updateCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<CustomerActions.UpdateCustomer>(
      CustomerActions.CustomerActionTypes.UPDATE_CUSTOMER
    ),
    map((action: CustomerActions.UpdateCustomer) => action.payload),
    mergeMap((customer: Customer) =>
      this.customerService.updateCustomer(customer).pipe(
        map(
          (updateCustomer: Customer) =>
            new CustomerActions.UpdateCustomerSuccess({
              id: updateCustomer.id,
              changes: updateCustomer
            })
        ),
        catchError(err => of(new CustomerActions.UpdateCustomerFail(err)))
      )
    )
  );

  @Effect()
  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType<CustomerActions.DeleteCustomer>(
      CustomerActions.CustomerActionTypes.DELETE_CUSTOMER
    ),
    map((action: CustomerActions.DeleteCustomer) => action.payload),
    mergeMap((id: number) =>
      this.customerService.deleteCustomer(id).pipe(
        map(() => new CustomerActions.DeleteCustomerSuccess(id)),
        catchError(err => of(new CustomerActions.DeleteCustomerFail(err)))
      )
    )
  );
}
