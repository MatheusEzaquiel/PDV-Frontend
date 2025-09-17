export class APIRoutes {

    static readonly LOCAL_URL = "http://127.0.0.1:8080" 

    // Endpoints
    static readonly PRODUCTS = `${APIRoutes.LOCAL_URL}/products`;
    static readonly PRODUCTS_SEARCH = `${APIRoutes.LOCAL_URL}/products/search`

    static readonly CATEGORY = `${APIRoutes.LOCAL_URL}/categories`;
    
    static readonly USER = `${APIRoutes.LOCAL_URL}/users`;
    static readonly USER_ROLE = `${APIRoutes.LOCAL_URL}/users/userRole`;

    static readonly SALE = `${APIRoutes.LOCAL_URL}/sales`;
    static readonly SALE_COMPLETE = `${APIRoutes.LOCAL_URL}/sales/complete-sale`;

}