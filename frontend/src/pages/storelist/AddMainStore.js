import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import {
  selectIsLoading,
} from "../../redux/features/mainStore/mainStoreSlice";
import "./AddStorelist";
import { createMainStore } from "../../redux/features/mainStore/mainStoreSlice";
import { GiReturnArrow, GiSave } from "react-icons/gi";
// import { toast } from "react-toastify";

const initialState = {
  name: "",
  operator: "",
  description: "",
  
};
const AddMainStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [storelist, setStorelist] = useState(initialState);
  const gToStoreList = () => {
    navigate("/storelist");
  };


  const isLoading = useSelector(selectIsLoading);
  const { name, operator, description } = storelist;

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setStorelist({ ...storelist, [name]: value });
  };
  const saveStorelist = async (e) => {
    e.preventDefault();
    const formData = { name, operator, description };
    console.log(formData)
    await dispatch(createMainStore(formData));
    navigate("/storelist");
  };

  

  return (
    <div>
      {isLoading && <Loader />}
      <div className="title-button">
        <h3 className="title-one --mt">Create Mian Store</h3>
        <button type="button" className="back-button" onClick={gToStoreList}>
          Back <GiReturnArrow/>
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
                required
              />
              <input
                className="input-one"
                type="text"
                placeholder="Bar man / store man"
                name="operator"
                value={storelist?.operator}
                onChange={handleInputChange}
              />
              <input
                className="input-one"
                type="text"
                placeholder="Description"
                name="description"
                value={storelist?.description}
                onChange={handleInputChange}
              />
              
            </div>
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save main store . <GiSave />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMainStore;
