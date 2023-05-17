const mainUrl = "http://localhost:8080";

const rootRoute = {
  users: mainUrl + "/users",
  auth: mainUrl + "/users/auth",
  offers: mainUrl + "/offers",
  files: mainUrl + "/files",
};

export const apiRoutes = {
  user: rootRoute.users + "/user",
  userRep: rootRoute.users + "/user/repuser",
  isUserRep: rootRoute.users + "/user/checkrepuser",
  likeOffer: rootRoute.users + "/user/favorites/add",
  dislikeOffer: rootRoute.users + "/user/favorites/delete",
  checkFavOffer: rootRoute.users + "/user/favorites/checkfav",
  getFavs: rootRoute.users + "/user/favorites",
  register: rootRoute.auth + "/register",
  login: rootRoute.auth + "/login",
  getOffers: rootRoute.offers + "/all",
  getCategories: rootRoute.offers + "/all/categories",
  addOffer: rootRoute.offers + "/add",
  updateOffer: rootRoute.offers + "/update",
  deleteOffer: rootRoute.offers + "/delete",
  deactivateOffer: rootRoute.offers + "/toggleactive",
  getSingle: rootRoute.offers,
  uploadFile: rootRoute.files + "/upload",
  downloadFile: rootRoute.files + "/download",
  getOfferFiles: rootRoute.files + "/download/all",
  deleteFileFromOffer: rootRoute.files + "/delete",
};
