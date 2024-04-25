import React from 'react'
import Card from '../../card/Card'
import "./ProdCatForm.scss"

const ProdCatForm = ({prodCat, handleInputChange, saveProductcategory}) => {
  return (
    <div className='add-product'>
        <Card className={"card"}>
            <form onSubmit={saveProductcategory}>
                <label>Category Name:</label>
                <input type='text' placeholder='Product Name' name='name' value={prodCat?.name} onChange={handleInputChange}/>
                <label>Description:</label>
                <input type='text' placeholder='Description' name='description' value={prodCat?.description} onChange={handleInputChange}/>
            <div className='--my'>
                <button type='submit' className='--btn --btn-primary'>Save product</button>
            </div>
            </form>
        </Card>
    </div>
  )
}

export default ProdCatForm