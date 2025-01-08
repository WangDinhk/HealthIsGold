import HomePage from "../pages/HomePage/HomePage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage"; // import NotFoundPage
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import SearchPage from "../pages/SearchPage/SearchPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
  },
  {
    path: "/:type",
    page: TypeProductPage,
    isShowHeader: true
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false
  },
  {
    path: "/profile-user",
    page: ProfilePage,
    isShowHeader: true
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "/product/:id",
    page: ProductDetailsPage,
    isShowHeader: true
  },
  {
    path: "/search",
    page: SearchPage,
    isShowHeader: true
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
