import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { getSprices } from '../../redux/features/sprice/spriceSlice'
import { SpinnerImg } from '../../components/loader/Loader'
import DataTable from 'react-data-table-component';
import Search from '../../components/search/Search'

import ButtonPrimary from '../../components/button/ButtonPrimary'


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
      // width: "100%",
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
          borderStyle: "solid",
          borderWidth: "0.02px",
          borderColor: "#47A992",
          color: "black",
          backgroundColor: "white",
          fontSize: "1.5rem",
        }
      },
 }

const SpriceList = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate()
  const [editableRows, setEditableRows] = useState([]);

  useRedirectLoggedOutUser("/login")

  const goCreateSprice = () => {
      navigate("/add-sprice")
  }


  const [filterText, setFilterText] = useState('');


  const columns = [
    {
      name: 'Name',
      selector: row => row.name || '',
      sortable: true,
    },
    {
      name: 'Products',
      cell: (row) => (
        <ul>
          {row.products.map((product) => (
            <li style={{ borderBottom: 'solid', borderWidth: "1px" }} key={product._id}>
              {product.product && product.product.name}: {product.sellingPrice}
            </li>
          ))}
        </ul>
      ),
    },
    {
      name: 'Edit',
      cell: (row) => (<Link to={`/price-edit/${row._id}`} className='save-btn' onClick={()=>handelEdit(row._id)}>
      Update
    </Link>),
      button: true
      

      },
    
  ];

  const handelEdit = (_id) => {
    setEditableRows((prevEditableRows)=>
    prevEditableRows.includes(_id) ? prevEditableRows.filter((rowId)=> rowId !== _id)
    : [...prevEditableRows, _id]
    )
  }


  const conditionalRowStyles = editableRows.map((_id)=>({
    when: (row)=>row._id === _id,
    style: {
      backgroundColor: 'rgba(255, 223, 186,0.7)'
    }
  }))



    const {sprices, isLoading, isError, message} = useSelector((state)=>state.sprice)
    useEffect(() => {
      if(isLoggedIn === true){
        dispatch(getSprices())
        // console.log(sprices)
      }
      if(isError) {
        console.log(message)
      }
                            
    }, [isLoggedIn, isError, message, dispatch])
    
    const filteredPrice = sprices.filter(row=>{
      const nameString =row.name && row.name.toString()
      return(
        nameString.toLowerCase().includes(filterText.toLowerCase())
      )
    })

  return (
    <div className='product-list'>
    <hr />
    <div className='table'>
      <div className='--flex-between --flex-dir-column'>
      <ButtonPrimary  onClick = {goCreateSprice} names="Set Price (ዋጋ አውጣ)" className="--btn --btn-primary button-create"/>

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
        {!isLoading && filteredPrice.length === 0 ? (
          <p>No Price list found!</p>
        ) : (
             <DataTable
            
            title="Selling Price List / የዋጋ ዝርዝር"
              
              columns={columns}
              data={filteredPrice}
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
        
        </div>
      </div>
  )
}

export default SpriceList