import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  getInvBalance,
  getStoreBalance,
} from "../../redux/features/reports/reportSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import DataTable from "react-data-table-component";
import Search from "../../components/search/Search";
// import { useNavigate } from "react-router-dom";
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import "./Dash.css"


const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const navigate = useNavigate();

  const [filterSale, setFilterSale] = useState("");

  const invBalanceCol = [
    {
      name: "Store Name",
      selector: (row) => row.storeName,
      sortable: true,
    },
    {
      name: "product / Balance",
      cell: (row) => (
        <div>
          {row.data.map((item, index) => (
            <div
              key={index}
              style={{
                // display: "flex",
                // justifyContent: "space-between",
                margin: 0,
                padding: 0,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  margin: 0,
                  padding: 0,
                  color: "teal",
                }}
              >
                {item.productName}
              </div>
              
              <div
               style={{
                display: "flex",
                justifyContent: "space-between",
                
              }}>
              <div
                style={{
                  margin: 0,
                  color: "#E25E3E",
                }}
              >
                {item.quantity}   {item.measurment}
                
              </div>   
              
              </div>
            </div>
          ))}
        </div>
      ),
      sortable: true,
    },
  ];

  const storeBalance = [
    {
      name: "Store Name",
      selector: (row) => row.storeName,
      sortable: true,
    },
    {
      name: "product / Balance",
      cell: (row) => (
        <div>
          {row.data.map((item, index) => (
            <div
              key={index}
              style={{
                // display: "flex",
                // justifyContent: "space-between",
                margin: 0,
                padding: 0,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "15px",
                  margin: 0,
                  padding: 0,
                  color: "teal",
                }}
              >
                {item.productName}
              </div>
              
              <div
               style={{
                display: "flex",
                justifyContent: "space-between",
                
              }}>
              <div
                style={{
                  margin: 0,
                  color: "#E25E3E",
                }}
              >
                {item.quantity}   {item.measurmentValue}
                
              </div>   
              <div
                style={{
                  
                  margin: 0,
                  color: "#A21EEE",
                  marginLeft: "5px",
                  justifySelf: "right"
                }}
              >
                {item.sub_quantity}   {item.sub_measurment}
                
              </div>
              </div>
            </div>
          ))}
        </div>
      ),
      sortable: true,
    },
  ];

  const { invBalances, storeBalances,  isError, message } =
    useSelector((state) => state.report);
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getInvBalance());
      
      dispatch(getStoreBalance());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);
  //  Filter
  const filterGetInvBalance = invBalances.filter((row) => {
    const storeName = row.storeName.toString(); // Convert the number to a string
    return storeName.toLowerCase().includes(filterSale.toLowerCase());
  });

  const filterStoreBalance = storeBalances.filter((row) => {
    const storeName = row.storeName.toString(); // Convert the number to a string
    return storeName.toLowerCase().includes(filterSale.toLowerCase());
  });

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
        backgroundColor: "gray",
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
        backgroundColor: "gray",
        color: "white",
      },
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
      },
    },
  };


   
   
  

return (
  <>
  <h3 className='dash-title'>Dashboard</h3>
  <div className="top-title">


    <div className="search">
      <Search
        type="text"
        value={filterSale}
        onChange={(e) => setFilterSale(e.target.value)}
      />
    </div>
  </div>

  
    <div className="boxs-rep">
      <DataTable
        title="Main Store Balance / የዋና ስቶር ቀሪ ምርት"
        columns={invBalanceCol}
        data={filterGetInvBalance}
        selectableRows
        persistTableHead
        pagination
        paginationPerPage={5} // Set the minimum pagination value to 5
        paginationRowsPerPageOptions={[5, 10, 15, 20]} // Define available pagination options
        fixedHeaderScrollHeight="300px"
        // customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        dense
        theme="solarized"
        customStyles={customStyle}
      />
    </div>

    <div className="boxs-rep">
      <DataTable
        title="Each Stores Balance / (የባር ኩሽና አልጋ) ቀሪ ምርት"
        columns={storeBalance}
        data={filterStoreBalance}
        selectableRows
        persistTableHead
        pagination
        paginationPerPage={5} // Set the minimum pagination value to 5
        paginationRowsPerPageOptions={[5, 10, 15, 20]} // Define available pagination options
        fixedHeaderScrollHeight="300px"
        // customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        dense
        theme="solarized"
        customStyles={customStyle}
      />
    </div>
  
</>
);
};
export default Dashboard