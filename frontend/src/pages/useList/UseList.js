import React, {useEffect, useState} from 'react'
import { SpinnerImg } from '../../components/loader/Loader'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Search from '../../components/search/Search'
import moment from 'moment';
import { getUse } from '../../redux/features/use/useSlice';
import ButtonPrimary from '../../components/button/ButtonPrimary';


const UseList = () => {

    const dispatch = useDispatch();
    const isLoggedIn =  useSelector(selectIsLoggedIn)
    const navigate = useNavigate()

  useRedirectLoggedOutUser("/login");
  const goCreateUse = () =>{
    navigate("/add-use")
  }

   // Filtering

   const [filterText, setFilterText] = useState('');
 
   const columnss = [
  {
    name: 'Date',
    selector: row => row.date ? moment(row.date).format('DD-MMM-YYYY') : '',
    sortactive: true,
  },
  {
    name: 'Store',
    selector: row => row.to_store && row.to_store.name ? row.to_store.name : '',
    sortactive: true,
  },
  {
    name: 'Product',
    selector: row => row.product && row.product.name ? row.product.name : '',
    sortactive: true,
  },
  {
    name: 'Quantity',
    selector: row => row.quatity,
  },
   ];

   const {uses, isLoading, isError, message} = useSelector((state)=>state.use)
   useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getUse())
    }    

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])
  console.log(uses)
  const filteredUses = uses.filter(row =>{
    const nameString = row.product && row.product.name ? row.product.name.toString() : '';
    const date = moment(row.date).toString();
    const store_name = row.to_store && row.to_store.name ? row.to_store.name.toString() : "";
    return(
      nameString.toLowerCase().includes(filterText.toLowerCase()) ||
      date.includes(filterText.toLowerCase()) ||
      store_name.toLowerCase().includes(filterText.toLowerCase())

    )
            
    });
    console.log(filteredUses)
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
            fontSize: "1.6rem", 
            backgroundColor: "#47A992",
            color: "white",
          }
        },
        cells: {
          style: {
            fontWeight: "bold",
            color: "black",
            backgroundColor: "white",
            fontSize: "1.2rem",
            padding: "2px",
            margin: "0"
          }
        },
   }

  return (
    <div className='product-list'>
      <hr />
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
        <ButtonPrimary  onClick = {goCreateUse} names="Usage (ግብአት ተጠቀም)" className="--btn --btn-primary button-create"/>

          <span>
            <Search 
            type="text"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}

            />
          </span>
        </div>
        
        {isLoading && <SpinnerImg />}
        <div className='table'>
          {!isLoading && uses.length === 0 ? (   <p>No Used Products Found!</p>
          ) : (
            <DataTable
            
            title="Product Used In Process / ጥቅም ላይ የዋሉ ግብአቶች"
              
              columns={columnss}
              data={filteredUses}
              selectableRows
              persistTableHead
              pagination
              paginationPerPage={7} // Set the minimum pagination value to 5
              paginationRowsPerPageOptions={[7, 10, 15, 20]} // Define available pagination options
              fixedHeaderScrollHeight="300px"
              highlightOnHover
              pointerOnHover
              dense
              // theme="solarized"
              customStyles={customStyle}
              
            />
           
          )}
        </div>
      </div>
    </div>
  )
}

export default UseList