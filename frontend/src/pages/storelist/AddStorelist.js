import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import {
  createStorelist,
  selectIsLoading,
} from "../../redux/features/store/storelistSlice";
import { getSprices } from "../../redux/features/sprice/spriceSlice";
import "./AddStorelist";
import { GiReturnArrow, GiSave } from "react-icons/gi";
// import { toast } from "react-toastify";

const initialState = {
  name: "",
  operator: "",
  category: "",
  sPrice: "",
  processing: "",
};
const AddStorelist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storelist, setStorelist] = useState(initialState);
  const gToStoreList = () => {
    navigate("/storelist");
  };


  const isLoading = useSelector(selectIsLoading);
  const { name, operator, description, sPrice, processing } = storelist;

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setStorelist({ ...storelist, [name]: value });
  };
  const saveStorelist = async (e) => {
    e.preventDefault();
    const formData = { name, operator, description, sPrice, processing };
    await dispatch(createStorelist(formData));
    // navigate("/storelist");
  };

  // Get selling price
  const { sprices, isError, message } = useSelector((state) => state.sprice);

  useEffect(() => {
    dispatch(getSprices());

    if (isError) {
      console.log(message);
    }
  }, [dispatch, message, isError]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className="title-button">
        <h3 className="title-one --mt">Create new Store</h3>
        <button type="button" className="back-button" onClick={gToStoreList}>
          Back <GiReturnArrow />
        </button>
      </div>

      <div className="add-delivers">
        <div className="cards">
          <form onSubmit={saveStorelist}>
            <div className="--flex">
              <input
                className="input-one"
                type="text"
                placeholder="Store Name"
                name="name"
                value={storelist?.name}
                onChange={handleInputChange}
              />
              <input
                className="input-one"
                type="text"
                placeholder="Bar man / store man"
                name="operator"
                value={storelist?.operator}
                onChange={handleInputChange}
              />

                   
            <select
              name="sPrice"
              value={storelist?.sPrice}
              onChange={handleInputChange}
              className="select"
              
              
            >
              <option disabled value={""}>
                Selling price
              </option>
              {sprices.map((sprice, index) => {
                const { _id, name } = sprice;
                return (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                );
              })}
            </select>
              
            </div>
       

            <select
              name="processing"
              value={storelist?.processing}
              onChange={handleInputChange}
              className="select"
              required
            >
              <option disabled value={""}>
                Processing status
              </option>
              <option value={"finished"}>Finished - Buy and sell</option>
              <option value={"raw"}>Raw - Process and sell</option>
              <option value={"fixed"}>Buy and sell</option>
              <option value={"use-and-throw"}>Use and throw</option>
              <option value={"others"}>Others</option>
            </select>

            <input
                className="input-one"
                type="text"
                placeholder="Description"
                name="description"
                value={storelist?.description}
                onChange={handleInputChange}
              />

            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save product . <GiSave />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStorelist;
