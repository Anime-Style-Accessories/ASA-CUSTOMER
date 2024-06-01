import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './constants';
import {
  BasePage,
  CartPage,
  CategoryDetailPage,
  CategoryPage,
  CheckoutPage,
  FavoritePage,
  HomePage,
  OrderDetailPage,
  PaymentProcessing,
  ProductDetailPage,
  SearchPage,
} from './pages';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <BasePage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTES.CATEGORIES.INDEX,
        element: <CategoryPage />,
      },
      {
        path: ROUTES.CATEGORIES.ID,
        element: <CategoryDetailPage />,
      },
      {
        path: ROUTES.PRODUCTS.ID,
        element: <ProductDetailPage />,
      },
      {
        path: ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: ROUTES.CHECKOUT,
        element: <CheckoutPage />,
      },
      {
        path: ROUTES.FAVORITES,
        element: <FavoritePage />,
      },
      {
        path: ROUTES.SEARCH,
        element: <SearchPage />,
      },
      {
        path: ROUTES.PAYMENT_PROCESS,
        element: <PaymentProcessing />,
      },
      {
        path: ROUTES.ORDERS.ID,
        element: <OrderDetailPage />,
      },
      {
        path: '*',
        element: <div>Not Found</div>,
      },
    ],
  },
]);
