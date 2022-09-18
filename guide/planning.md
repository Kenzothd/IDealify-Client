// Authentication & Authorization

// Front End

react router

1. check if sessionStorage token exists
2. authorization path that we .post() to backend to check

sessionStorage = {token: "token"}

using React Router private route

- on mount we check if session storage have token (can be expired)
  if null -> redirect to landing page <Landing />
  if present -> check if token is valid
- token validity - sending post request to backend "/tokenAuth"
- if authorized then send back {message : "token valid"} -> redirect to <Outlet />
- if authorized then send back {message : "token invalid"} -> redirect to <ReLogin />

Pros of Using React Private Route

- If route is a secret and does not have .get() or .post() we will still be able to see the route
- On load we will still see the page until fetch gets back data and if data error then will redirect

Cons of Using React Private Route

-

Pros of just redirecting when we fetch fail

- don't need to learn and use React private Route as it is an extra step
-

Cons of just redirecting when we fetch fail

- On load we will still see the page until fetch gets back data and if data error then will redirect

// Back End

1. protect frontend: verification route for front end "/tokenAuth"
2. protect backend: every route - middleware which checks if token exist and is valid

Data Flow Example

1. user login -> .post() returns token -> store to sessionStorage redirect to projects
2. upon changing of route, react private route will do checks:

- check if exist
  -> no exist, send back to Login
  -> if exist, .post() to "/tokenAuth"
