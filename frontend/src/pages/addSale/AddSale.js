import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSale, selectIsLoading } from "../../redux/features/sale/saleSlice";
// import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getFinishedProducts } from "../../redux/features/product/productSlice";
import { getServes } from "../../redux/features/serve/serveSlice";
import {
  getStoreFinished,
  getStoreRaw,
} from "../../redux/features/store/storelistSlice";
import "./AddSale.css";
import { createSaleService } from "../../redux/features/sale/saleServiceSlice";
import Loader from "../../components/loader/Loader";
import { GiReturnArrow, GiSave } from 'react-icons/gi'




const AddSale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading =  useSelector(selectIsLoading)
  const [selectedStore, setSelectedStore] = useState(""); // To store the selected 'to_store'
  const [pice, setPice] = useState(false);
  const [saleType, setSaleType] = useState(true)

  // Initialize the state with an array of initial rows
  const [rows, setRows] = useState([
    {
      product: "",
      quantity: "",
      date: "",
      pice: false,
      saleType: true
    },
  ]);

  if(saleType == true){
    let sele
  }
  // Selected Store
  const handleStoreChange = (e) => {
    const { value } = e.target;
    setSelectedStore(value);
  };

  const handlePice = () => {
    // const { value } = e.target;
    setPice(!pice);
  };

  const handleSaleType = () =>{
    setSaleType(!saleType)

  }

  const handleInputChange = (e, rowIndex) => {
    const { name, value, type,checked  } = e.target;
      // Check if the input is a checkbox
  if (type === "checkbox") {
    // Update the checkbox value directly
    const updatedRows = [...rows];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      [name]: checked,
    };
    setRows(updatedRows);
  } else {
    // For other input types, update as usual
    const updatedRows = [...rows];
    updatedRows[rowIndex] = {...updatedRows[rowIndex],[name]: value,to_store: selectedStore
    };
    setRows(updatedRows);
  }
  };

  const addRow = () => {
    // Add a new empty row to the array with the selected 'to_store'
    setRows([
      ...rows,
      { product: "", quantity: "", date: "",pice: "", to_store: selectedStore },
    ]);
  };

  const removeRow = (rowIndex) => {
    // Remove the specified row from the array
    const updatedRows = [...rows];
    updatedRows.splice(rowIndex, 1);
    setRows(updatedRows);
  };

  const goToSales = () => {
    navigate("/sale-list");
  };

  const saveSale = (e) => {
    e.preventDefault();
    const formData = rows;
    console.log(formData)
    dispatch(createSale(formData));
    goToSales()
  };

  const saveService = (e) => {
    e.preventDefault();
    const formData = rows;  
    dispatch(createSaleService(formData));
  };

  const { productFinished, message, isError } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getFinishedProducts());
    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);



  const { finishedStore } = useSelector((state) => state.storelist);
  useEffect(() => {
    dispatch(getStoreFinished());
  }, [dispatch]);
  const { rawStore } = useSelector((state) => state.storelist);
  useEffect(() => {
    dispatch(getStoreRaw());
  }, [dispatch]);

  const { serves } = useSelector((state) => state.serve);
  useEffect(() => {
    dispatch(getServes());
  }, [dispatch]);

  return (
    <>
      {isLoading && <Loader />}
        <div className="upper">
          <h3 className="title-one">Sale Processed Products</h3>
          <button type="button" className="back-button" onClick={goToSales}>
            Back <GiReturnArrow />
          </button>
        </div>
   
      <div className='--flex'> 
                  {saleType ? <h1 className='switch-text'>ገዝቶ መሸጥ / Sale</h1> : 
                  <h1 className='switch-text'>ሰርቶ መሸጥ / Serve</h1>}
                  
                <label  className="switch">
              <input name="saleType" type="checkbox" onClick={handleSaleType} />
              <span className="slider round"></span>              
              </label>
              
              </div>
      <div className="add-delivers">
        <div className="cards"> 
            <form onSubmit={saleType ? saveSale : saveService}>
            
              <div className="--flex">
              
                <select
                  name="to_store"
                  value={selectedStore}
                  onChange={handleStoreChange}
                  className="select"
                  required={saleType ? true : false}
                  disabled={saleType ? false : true}
                  
                >
                  <option disabled value="">
                    Stores For Ready Products
                  </option>
                  {finishedStore.map((storelist) => {
                    const { _id, name } = storelist;
                    return (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="to_store"
                  value={selectedStore}
                  onChange={handleStoreChange}
                  className="select"                  
                  required={saleType ? false : true}
                  disabled={saleType ? true : false}
                >
                  <option disabled value="">
                    Stores For Services
                  </option>
                  {rawStore.map((storelist) => {
                    const { _id, name } = storelist;
                    return (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
              {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="input-dynamic">
                {saleType ?(
                  <select
                      name="product"                      
                      value={row.product}
                      onChange={(e) => handleInputChange(e, rowIndex)}
                      required
                      className="select"
                    >
                      <option disabled value={""}>
                        Select product
                      </option>
                      {productFinished.map((product, index) => {
                        const { _id, name } = product;
                        return (
                          <option key={_id} value={_id}>
                            {name}
                          </option>
                        );
                      })}
                    </select>
                ) : (
                  <select
                      name="product"                      
                      value={row.product}
                      onChange={(e) => handleInputChange(e, rowIndex)}
                      required
                      className="select"
                    >
                      <option disabled value={""}>
                        Select product
                      </option>
                      {serves.map((product, index) => {
                        const { _id, serveName, serveMeasure } = product;
                        return (
                          <option key={_id} value={_id}>
                            {serveName}  \ {serveMeasure}
                          </option>
                        );
                      })}
                    </select>
                )}
                    
                  <input
                    type="decimal"
                    className="input-one"
                    placeholder="Quantity"
                    name="quantity"
                    value={row.quantity}
                    onChange={(e) => handleInputChange(e, rowIndex)}
                  />
                  <input
                    type="date"
                    placeholder="Date"
                    name="date"
                    value={row.date}
                    onChange={(e) => handleInputChange(e, rowIndex)}
                    className="input-one"
                  />


                  {/* <div className='check-pice'> */}
                  <div className='--flex'> 
                  {!pice ? <h1 className='switch-text'>ጅምላ</h1> : 
                  <h1 className='switch-text'>ችርቻሮ</h1>}
                  
                <label  className="switch">
              <input name="pice" type="checkbox" value={row.pice} onClick={handlePice} onChange={(e) => handleInputChange(e, rowIndex)}/>
              <span className="slider round"></span>              
              </label>
              
              </div>

                  

                  {rowIndex > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeRow(rowIndex)}
                  >
                    Remove
                  </button>
                )}
                </div>
              ))}

              <div className="button-group">
                <button type="button" className="add-btn" onClick={addRow}>
                  Add Row
                </button>
                <button type="submit" className="save-btn">
                  Save product
                </button>
              </div>
            </form>
         
        </div>
      </div>
    </>
  );
};

export default AddSale;
