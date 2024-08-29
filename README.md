
## Employee Management System - Nasscript


Nasscript Employee Management System is an app build to manage the employee-related tasks and information efficiently.




## Installation

1 - Clone the repository.

```bash
  git clone https://github.com/hijaaz1998/Nasscript.git
```
2 - Navigate to frontend.
```bash
cd frontend
```
4 - Install frontend dependencies.
```bash
npm install

```

5 - start frontend.
```bash
npm start

```
5 - Go back.
```bash
cd ..

```
6 - Navigate to backend.
```bash
cd backend

```
7 - Install backend dependencies.
```bash
npm install

```
5 - Start the backend.

```bash
npm start
```








    
## Optimizations

1. Added the API Url into the .env file for hiding the API and for security reasons

2. In Dashboard, wrapped the summary calculation with useMemo to reduce the repetition of the calculation which effect the performance

3. Created a seperate component for Summary Card, to reduce the code in the dashboard and code reusability

4. Created a seperate component for Employee Table, to reduce the code in the dashboard and code reusability

5. Wrapped the Sidebar, Createdemployees, LeaveVacation, Reports and EditEmployee components with lazy loading to reduce the intial load time 







## Note: 

There was a dependency conflict in the frontend when trying to install the dependencies, tried to solve it, but could not be finished due to time limitation
