import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { createDeliver, selectIsLoading } from '../../redux/features/delivery/deliverSlice';
import { getFinishedProducts, getRawProducts } from '../../redux/features/product/productSlice';
import {  getStoreFinished, getStoreRaw} from '../../redux/features/store/storelistSlice';
import './AddDeliver.css';
import { useNavigate } from 'react-router-dom';
import { getMainStore } from '../../redux/features/mainStore/mainStoreSlice';
import { GiReturnArrow, GiSave } from 'react-icons/gi'


const AddDeliver = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isLoading = useSelector(selectIsLoading);

  // Initialize the state with an array of initial rows
  const [rows, setRows] = useState([
    {
      product: '',
      quatity: '',
      date: '',
    },
  ]);

  const [selectedStore, setSelectedStore] = useState(''); // To store the selected 'to_store'
  const [selectedMainStore, setSelectedMainStore] = useState(''); // To store the selected 'to_store'
  const [check, setCheck] = useState(false)


  const gToServe = () =>{
    navigate("/deliver")
  }
  const handleCheck = () => {
    // const { value } = e.target;
    setCheck(!check);
    setSelectedStore('')
    setSelectedMainStore('')
  };
  const handleStoreChange = (e) => {
    const { value } = e.target;
    setSelectedStore(value);
  };
  const handleMainStoreChange = (e) => {
    const { value } = e.target;
    setSelectedMainStore(value);
  };
  

  const handleInputChange = (e, rowIndex) => {
    const { name, value } = e.target;

    // Create a new array with the updated row and set it in state
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [name]: value, to_store: selectedStore, to_mainstore: selectedMainStore };
    setRows(updatedRows);
  };

  const addRow = () => {
    // Add a new empty row to the array with the selected 'to_store'
    setRows([...rows, { product: '', quatity: '' ,date:'', to_store: selectedStore, to_mainstore: selectedMainStore }]);
  };

  const removeRow = (rowIndex) => {
    // Remove the specified row from the array
    const updatedRows = [...rows];
    updatedRows.splice(rowIndex, 1);
    setRows(updatedRows);
  };

  

  const saveDeliver = async (e) => {
    e.preventDefault();
    // You can access the data from the rows array for submission
    const formData = rows;
    console.log(formData)
    await dispatch(createDeliver(formData));
  };

  const { productFinished, message, isError } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getFinishedProducts());
    dispatch(getRawProducts());

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);

  const {  productRaw } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getRawProducts());

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);

  const { finishedStore } = useSelector((state) => state.storelist);
  useEffect(() => {
    dispatch(getStoreFinished());    
  }, [ dispatch]);
  const { rawStore } = useSelector((state) => state.storelist);
  useEffect(() => {
    dispatch(getStoreRaw());    
  }, [ dispatch]);

  const {mainstores} = useSelector((state)=> state.mainstore)
  useEffect(() => {
    dispatch(getMainStore())
  },[dispatch])

  // console.log(finishedStore)
  useEffect(() => {
    // Set the 'to_store' value for the initial row when component loads
    if (finishedStore.length > 0) {
      setSelectedStore(finishedStore[0]._id);
    }
  }, [finishedStore]);
  
  
  
  return (
    <div>
      {isLoading && <Loader />}
      <div className='title-button'>
      {check === true ? (<h3 className="title-one">Transfer Raw Products</h3>) :
      (<h3 className="title-two">Transfer Finished Products</h3>)}
    <button type='button' className='back-button'  onClick={gToServe}>Back <GiReturnArrow /></button>
      

      </div>
      <div className="add-delivers">
        <div className="cards">

        
          <form onSubmit={saveDeliver} >
            <div className="--flex">
            <div id='switch-wrap'>
            <label class="switch">
              <input type="checkbox" onClick={handleCheck}/>
              <span class="slider round"></span>              
            </label>
            <h1 className='switch-text'>Select Product and Store Type</h1>
            </div>

            <select
                name="to_mainstore"
                value={selectedMainStore}
                onChange={handleMainStoreChange}
                required
                className='select'
              >
                  <option disabled value="">
                    From Store /  ከ...
                  </option>
                {mainstores.map((store) => {
                  const { _id, name } = store;
                  return (
                    <option key={_id} value={_id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            
            {check === true ? (
              <select
                name="to_store"
                value={selectedStore}
                onChange={handleStoreChange}
                required
                className='select'
              >
                  <option disabled value="">
                    To Store / እስከ (Raw)
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
            ) : (
              <select
                name="to_store"
                value={selectedStore}
                onChange={handleStoreChange}
                required
                className='select'
              >
                  <option disabled value="">
                  To Store / እስከ (Finished)
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
            )}
              
            
              
            </div>
            
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="input-dynamic">
              {check === false ? (
                <select
                  name="product"
                  value={row.product}
                  onChange={(e) => handleInputChange(e, rowIndex)}
                  required
                  className='select'
                >
                  <option disabled value="">
                    Finished Product
                  </option>
                  {productFinished.map((product) => {
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
                  className='select'
                >
                  <option disabled value="">
                    Raw Product
                  </option>
                  {productRaw.map((product) => {
                    const { _id, name } = product;
                    return (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              )}
                

                <input
                  type="decimal"
                  placeholder="Quantity"
                  name="quatity"
                  value={row.quatity}
                  onChange={(e) => handleInputChange(e, rowIndex)}
                  required
                  className='input-one'
                />
                <input
                  type="date"
                  placeholder="Date"
                  name="date"
                  value={row.date}
                  onChange={(e) => handleInputChange(e, rowIndex)}
                  className='input-one'

                />
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
              <button type="submit" className="save-btn" >
                Save product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeliver;
