export const API_ROUTES = {
  AUTH: {
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGIN: '/auth/authenticate',
    LOGOUT: '/auth/logout',
  },
  USER: {
    GET_CURRENT_USER: '/users/me',
  },
  CATEGORY: {
    GET_ALL: '/category/all',
    GET: '/category/:id',
    GET_CATEGORY_AND_PRODUCTS: '/product/getCategoryAndProductByCategory',
  },
  VOUCHER: {
    GET_ALL: '/vouchers/getAll',
    GET: '/vouchers/getById/:id',
    CHECK_CODE: '/vouchers/check_voucher',
  },
  PRODUCT: {
    GET_ALL: '/product/getProductsBySearch',
    GET: '/product/:id',
    UPDATE: '/product/:id',
    GET_BY_CATEGORY: '/product/getProductsByCategoryAndName',
    GET_BY_LIST_ID: '/product/getProductByListId',
  },
  UPLOAD: {
    SINGLE: '/upload/single',
  },
  ORDER: {
    CREATE: '/orders/create_order',
    GET_ALL: '/orders/getOrders',
    GET: '/orders/getOrderById/:id',
    GET_ITEMS: '/order_items/:id',
  },
};
