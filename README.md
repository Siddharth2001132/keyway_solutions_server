# Kewsway_post_up_app
This is an authentication app where we can Register, Login and Log out.

---
## Authentication
- [X] Create Server
- [X] Add auth router
- [x] Create user with POST /auth/signup
  - [x] validate required fields
  - [x] check if email is unique
  - [x] hash password with bcrypt
  - [x] insert into db
- [x] Create Landing Page
  - [x] Link to Sign Up Page
- [x] Create Sign Up Page
  - [x] Form with: username and password
    - [x] verify password
  - [x] When form is submitted
    - [x] Validate username
      - [x] Display errors
    - [x] Validate password
      - [x] Display errors
    - [x] POST request to the server
      - [x] Display errors
      - [x] If successful sign up
        - [x] Rediret to the login page
- [x] Login user with POST /auth.login
  - [x] check if email in db
    - [x] compare password with nashed password in db
    - [x] created and sign a JWT
      - [x] Respond with JWT
- [x] Create  SignIn Page
  - [x] Form with: username and password
    - [x] verify password
  - [x] When form is submitted
    - [x] Validate username
      - [x] Display errors
    - [x] Validate password
      - [x] Display errors
    - [x] POST request to the server
      - [x] Display errors
      - [x] If successful signin
        - [x] Rediret to the Dashboard
- [ ] If Signedin -- visists login or signup page -- redircet to dashboard
- [ ] If a signedout -- visits the dashboard -- redirect to signin page
- [x] After sign up, immediately signin
- [ ] show username in dashboard
- [ ] Have one protected route on the bakend...
 - [ ] Only signedin users an request this route


---
## Authorization
- [ ] Visitors can only see the homepage
  - [ ] isLoggedIn middleware
    - [ ] Validate JWT in header
      - [ ] set req.user to be JWT payload
    - [ ] send an unauthorized error message
  - [ ] redirect to login form
- [ ] Logged in users can only see their page
  - [ ] allowAcess middleware
    - [ ] id in url must match id in req.user
    - [ ] send an unauthorized error message
  - [ ] redirect to user page if they visit homepage
    - [ ] set user_id in localStorage after login/signup
- [ ] Add GET /auth/logout to clear user_id cookie
  - [ ] redirect to login page

---
## STRETCH

## Admin Page:
- [ ] Admin page that list all users
  - [ ] admin table with user_id
  - [ ] de-activate users
- [ ] Admin an see any page on site
- [ ] Rate Limiting
  - [ ] Prevent brute force logins
- [ ] Password strength meter
