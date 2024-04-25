import React, { useEffect, useState } from 'react'
import "./Storelist.scss"
import Search from '../../components/search/Search'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getStorelists } from '../../redux/features/store/storelistSlice'
import { SpinnerImg } from '../../components/loader/Loader'
import DataTable from 'react-data-table-component';
import { getMainStore } from '../../redux/features/mainStore/mainStoreSlice'
import ButtonPrimary from '../../components/button/ButtonPrimary'
// createTheme 
const customStyle = {
  table: {
    style: {
      width: "100%",
      margin: "0",
      padding: "2px",
    },
  },
  header: {
    style: {
      width: "100%",
      margin: "0",
      padding: "0",
    },
  },
  pagination: {
    style: {
      width: "100%",
      height: "5px",
      margin: "0",
      padding: "0",
      color: "White",
      backgroundColor: "#47A992"
    },
  },
      rows: {
        style: {
          fontSize: "1.2rem",
          padding: "0",
          margin: "0", 
        },
      },
  
      headCells: {
        style: {
          fontSize: "1.2rem", 
          backgroundColor: "#47A992",
          color: "white",
        }
      },
      cells: {
        style: {
          fontWeight: "bold",
          borderStyle: "solid",
          borderWidth: "0.02px",
          borderColor: "#47A992",
          color: "black",
          backgroundColor: "white",
          fontSize: "1rem",
        }
      },
 }
const StorelistList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useRedirectLoggedOutUser("/login");

    const goCreateStoreList = () => {
        navigate("/add-storelist")
    }
    const goCreateMainStore = () => {
        navigate("/add-mainstore")
    }

        // Filtering


        const [filterText, setFilterText] = useState('');

        const columnssub = [
          {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            
          },
          {
            name: 'Seling Price Name',
            selector: row => row.sPrice.name,
            
          },
          {
            name: 'Operator',
            selector: row => row.operator,
            
          },
          {
              name: 'Type',
              selector: row => row.processing,
          },
          {
              name: 'Description',
              selector: row => row.description,
          },
                    
        ];
        const columnsmain = [
          {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            
          },
          {
            name: 'Operator',
            selector: row => row.operator,
            
          },
          {
            name: 'Description',
            selector: row => row.description,
            
          },
                    
        ];
    const { storelists, isLoading, isError, message } = useSelector((state)=>state.storelist)
    const {mainstores} = useSelector((state)=>state.mainstore)
    useEffect(()=>{
        if(isLoggedIn === true){
            dispatch(getStorelists())
        }
        if(isError){
            console.log(message)
        }
    },[isLoggedIn, dispatch, isError, message])
    useEffect(()=>{
        if(isLoggedIn === true){
            dispatch(getMainStore())
        }
        if(isError){
            console.log(message)
        }
    },[isLoggedIn, dispatch, isError, message])

    const filteredSubStore = storelists.filter(
      row =>{
      const nameString = row.name.toString();
      return(
        nameString.toLowerCase().includes(filterText.toLowerCase())
      )
      });
      console.log(mainstores)
    
  return (

    <>
    <div className='product-list'>
      <hr />
      <div className='table'>
  
        <div className='btnflex'>
        <ButtonPrimary  onClick = {goCreateStoreList} names="Main store (ዋና ስቶር)" className="--btn --btn-primary button-create"/>

        <ButtonPrimary  onClick = {goCreateMainStore} names="Sub Store (ትናንሽ ስቶር)" className="--btn --btn-primary button-create"/>

        </div>
        <span>
          <Search 
            type="text"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}

            />
          </span>
        {isLoading && <SpinnerImg />}
          <div className='table-containers'>
        <div className='table'>
          {!isLoading && filteredSubStore.length === 0 ? (
            <p>No Sub Stores found!</p>
          ) : (

            <DataTable
            
            title="Sub Store List / ትናንሽ ስቶር"
              
              columns={columnssub}
              data={filteredSubStore}
              selectableRows
              persistTableHead
              pagination
              fixedHeaderScrollHeight="300px"
              // customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              dense
              customStyles={customStyle}
              
              
            />
            
          )}
        </div>
        <div className='table'>
          {!isLoading && mainstores.length === 0 ? (
            <p>No Main Store List found!</p>
          ) : (

            <DataTable
            
            title="Main Store List / ዋና ስቶር"
              
              columns={columnsmain}
              data={mainstores}
              selectableRows
              persistTableHead
              pagination
              fixedHeaderScrollHeight="300px"
              highlightOnHover
              pointerOnHover
              dense
              customStyles={customStyle}
              
              
            />
            
          )}
        </div>
        </div>
      </div>
    </div>
    

    
    </>
    
    )
}

export default StorelistList