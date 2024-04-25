import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import AddProduct from './pages/addproduct/AddProduct';
import ProductList from './pages/productList/ProductList';
import AddProdCat from './pages/addprodCat/AddProdCat';
import ProdCategoryList from './pages/prodCategoryList/CategoryList';
import AddPurchase from './pages/addPurchase/AddPurchase';
import PurchaseList from './pages/purchaseList/PurchaseList';
import AddSprice from './pages/addsprice/AddSprice';
import SpriceList from './pages/spriceList.js/SpriceList';
import StorelistList from './pages/storelist/StorelistList';
import AddStorelist from './pages/storelist/AddStorelist';
import AddDeliver from './pages/adddeliver/AddDeliver';
import DeliverList from './pages/deliveryList/DeliverList';
import AddServe from './pages/addServe/AddServe';
import ServeList from './pages/serveList/ServeList';
import AddSale from './pages/addSale/AddSale';
import SaleList from "./pages/saleList/SaleList";
import Reports from './pages/reports/Reports';
import AddUse from './pages/addUse/AddUse';
import UseList from './pages/useList/UseList';
import InvReports from './pages/reports/InvReports';
import AddMainStore from './pages/storelist/AddMainStore';
import EditSprice from './pages/editSprice/EditSprice';
import GrandReport from './pages/grandReports/GrandReport';



axios.defaults.withCredentials = true // make us able to get credentials when using axios

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function loginStatus(){
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])
  
  return (
    <BrowserRouter >
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />

        <Route path='/dashboard' element={ 
        <Sidebar>
          <Layout>
            <Dashboard />
          </Layout>
        </Sidebar> }/>
        {/*product */}
        {/* Add Product */}
        <Route path='/add-product' element={ 
        <Sidebar>
          <Layout>
            <AddProduct />
          </Layout>
        </Sidebar> }/>
        {/* Get Product */}
        <Route path='/product' element={ 
        <Sidebar>
          <Layout>
          <ProductList />
          </Layout>
        </Sidebar> }/>
        {/* product category List*/}
        <Route path='/prodCat' element={ 
        <Sidebar>
          <Layout>
          <ProdCategoryList />
          </Layout>
        </Sidebar> }/>
        {/* Create product category */}
        <Route path='/add-prodCat' element={ 
        <Sidebar>
          <Layout>
          <AddProdCat />
          </Layout>
        </Sidebar> }/>

        {/* Get All Purchase */}
        <Route path='/purchase' element={ 
        <Sidebar>
          <Layout>
          <PurchaseList />
          </Layout>
        </Sidebar> }/>
        {/* Create Purchase */}
        <Route path='/add-purchase' element={ 
        <Sidebar>
          <Layout>
          <AddPurchase />
          </Layout>
        </Sidebar> }/>

        {/* Get All selling Price */}
        <Route path='/sprice' element={ 
        <Sidebar>
          <Layout>
          <SpriceList />
          </Layout>
        </Sidebar> }/>

        {/* Create selling Price */}

        <Route path='/add-sprice' element={ 
        <Sidebar>
          <Layout>
          <AddSprice />
          </Layout>
        </Sidebar> }/>


        {/* Get All Storelist */}
        <Route path='/storelist' element={ 
        <Sidebar>
          <Layout>
          <StorelistList />
          </Layout>
        </Sidebar> }/>

          {/* Add storelist */}
        <Route path='/add-storelist' element={ 
        <Sidebar>
          <Layout>
          <AddStorelist />
          </Layout>
        </Sidebar> }/>


        {/* Create Store category */}

        <Route path='/add-mainstore' element={ 
        <Sidebar>
          <Layout>
          <AddMainStore />
          </Layout>
        </Sidebar> }/>


        {/* Create Delivery */}

        <Route path='/add-delivery' element={ 
        <Sidebar>
          <Layout>
          <AddDeliver />
          </Layout>
        </Sidebar> }/>

        {/* Get All Delivery */}

        <Route path='/deliver' element={ 
        <Sidebar>
          <Layout>
          <DeliverList />
          </Layout>
        </Sidebar> }/>



        {/* Create Serve */}

        <Route path='/add-serve' element={ 
        <Sidebar>
          <Layout>
          <AddServe />
          </Layout>
        </Sidebar> }/>

        {/* Get All Serve */}

        <Route path='/serve' element={ 
        <Sidebar>
          <Layout>
          <ServeList />
          </Layout>
        </Sidebar> }/>


        {/* Create Serve */}

        <Route path='/add-sale' element={ 
        <Sidebar>
          <Layout>
          <AddSale />
          </Layout>
        </Sidebar> }/>


        {/* Get Serve */}

        <Route path='/sale-list' element={ 
        <Sidebar>
          <Layout>
          <SaleList />
          </Layout>
        </Sidebar> }/>

        {/* Get Report */}
        <Route path='/reports' element={ 
        <Sidebar>
          <Layout>
          <Reports />
          </Layout>
        </Sidebar> }/>

        {/* Add Use */}
        <Route path='/use-list' element={ 
        <Sidebar>
          <Layout>
          <UseList />
          </Layout>
        </Sidebar> }/>

        {/* create use */}
        <Route path='/add-use' element={ 
        <Sidebar>
          <Layout>
          <AddUse />
          </Layout>
        </Sidebar> }/>
        {/* Get inv balance */}
        <Route path='/inv-reports' element={ 
        <Sidebar>
          <Layout>
          <InvReports />
          </Layout>
        </Sidebar> }/>
        {/* Get inv balance */}
        <Route path='/grand-reports' element={ 
        <Sidebar>
          <Layout>
          <GrandReport />
          </Layout>
        </Sidebar> }/>



        {/* Edit=Price */}
        <Route path='/price-edit/:_id' element={ 
        <Sidebar>
          <Layout>
          <EditSprice />
          </Layout>
        </Sidebar> }/>


        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
