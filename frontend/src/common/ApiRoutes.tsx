// const mainUrl = 'https://langcard.herokuapp.com/'
// const mainUrl = 'http://localhost:3000/'
const mainUrl = 'http://localhost:8080'
const rootRoute = {
    users: mainUrl + '/users',
    auth: mainUrl + '/users/auth',
    offers: mainUrl + '/offers',
}

export const apiRoutes = {
   user: rootRoute.users + '/user',
   register: rootRoute.auth + '/register',
   login: rootRoute.auth + '/login',
   getOffers: rootRoute.offers + '/all',
   addOffer: rootRoute.offers + '/add',
}
