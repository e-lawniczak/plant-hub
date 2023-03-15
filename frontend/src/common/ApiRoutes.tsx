// const mainUrl = 'https://langcard.herokuapp.com/'
// const mainUrl = 'http://localhost:3000/'
const mainUrl = 'http://localhost:8080'
const rootRoute = {
    user: mainUrl + '/users',
  
}

export const apiRoutes = {
   testMethod: rootRoute.user + "/hi"
}
