// const mainUrl = 'https://langcard.herokuapp.com/'
// const mainUrl = 'http://localhost:3000/'
const mainUrl = 'http://localhost:8080'
const rootRoute = {
    user: mainUrl + '/users',
    auth: mainUrl + '/users/auth',
}

export const apiRoutes = {
   getUser: rootRoute.user + '/user',
   register: rootRoute.auth + '/register',
   login: rootRoute.auth + '/login',
   main: "/",
}
