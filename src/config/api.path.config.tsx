const BASE_URL_SERVER = '';
// const BASE_URL_LOCAL = process.env.REACT_APP_API_URI;
//const BASE_URL_LOCAL = 'https://tycapi.eu-gb.mybluemix.net';
const BASE_URL_LOCAL = ' https://echoes.agency';
export const PathApi = {
  BASE_URL: BASE_URL_LOCAL,
  user: '/users/login',
  product: '/products',
  post: '/posts',
  updatePost: '/posts/',
  submitPost: '/post',
  submitProduct: '/product',
  submitnews: '/news',
  getallusers: '/user',
  submitnationalnews: '/nationalrisknews',
  updateProduct: '/products/',
  postCategories: '/posts/categories',
  productCategories: '/product/categories',
  files: '/media',
  fileUpload: '/file/',
  uploads: '/uploads/',
  categories: '/categories',
  category: '/category',
  users: '/users',
  userSearch: '/userSearch',
  userUpdateById: '/user/',
  newsUpdateById: '/news/',
  nationalnewsUpdateById: '/nationalrisknews/',
  getnfcTapCountFilter: '/getnfcTapCountFilter',
  usersByFilterDate: '/usersByFilterDate',

  citylistsByCountry: '/citylistsByCountry/',

  uploadNfcData: '/uploadNfcData', // key:'File'
  getNfcList: '/allnfcTagsWithCustomerDetails',
  deleteNfcTagData: '/deleteNfcTagData/',

  usersByid: '/user/',
  newsByid: '/news/',
  nationalnewsByid: '/nationalrisknews/',

  stockMultipleDelete: '/deleteMultipleNfcTagData/',
  stockMarkAsPurchased: '/updateMultipleStock',

  orders: '/orders',
  updateOrderStatus: '/updateOrderStatus/', //ORDER_RECEIVED, PROCESSING_ORDER, IN_TRANSIST , SUCCESSFUL, CANCELLED
  nfcUpdateUser: '/nfc-tag-update/ownerShip',
  getNfcById: '/nfc-tag/',
};
