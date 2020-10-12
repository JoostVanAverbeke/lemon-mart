# LemonMart

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Project Description

## Identifying user roles

The first step of our design will be to think about who is using the application and why.

We envision four user states, or roles, for LemonMart:

* Authenticated; any authenticated user would have access to their profile
* Cashier, whose sole role is to check out customers
* Clerk, whose sole role is to perform inventory-related functions
* Manager, who can perform all actions a cashier and a clerk can perform but also have access to administrative functions

## Identifying high-level modules with a site map
Three high-level modules emerge as lazy-loading candidates:

* Point of Sale (POS)
* Inventory
* Manager

The Cashier will only have access to the POS module and component.  
The Clerk will only have access to the Inventory module, which will include additional screens for
* the Stock Entry
* Products
* Categories management components

The Manager will be able to access all three modules with the Manager module, 
including 
* user management and 
* receipt lookup components
