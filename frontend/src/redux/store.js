import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../redux/features/auth/authSlice"
import productReducer from "../redux/features/product/productSlice"
import filterReducer from "../redux/features/product/filterSlice"
import prodCatReducer from "../redux/features/productCategory/categorySlice"
import purchaseReducer from "../redux/features/purchase/purchaseSlice"
import spriceReducer from "../redux/features/sprice/spriceSlice"
import storelistReducer from "../redux/features/store/storelistSlice"
import deliverReducer from "./features/delivery/deliverSlice"
import serveReducer from "./features/serve/serveSlice"
import saleServiceReducer from "./features/sale/saleServiceSlice"
import saleReducer from "./features/sale/saleSlice"
import reportReducer from "./features/reports/reportSlice"
import useReducer from "./features/use/useSlice"
import mainStoreSlice from "./features/mainStore/mainStoreSlice"
import grandSlice from "./features/grandReport/grandSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer,
        category: prodCatReducer,
        purchase: purchaseReducer,
        sprice: spriceReducer,
        storelist: storelistReducer,
        mainstore: mainStoreSlice,
        deliver: deliverReducer,
        serve: serveReducer,
        saleService: saleServiceReducer,
        sale: saleReducer,
        report: reportReducer,
        use: useReducer,
        grand: grandSlice
    }

})