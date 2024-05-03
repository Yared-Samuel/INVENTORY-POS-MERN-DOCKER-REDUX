import React, {useEffect, useState} from 'react'
import "./productList.css"
import { SpinnerImg } from '../../components/loader/Loader'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEye } from "react-icons/ai"
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProducts } from "../../redux/features/product/productSlice"
import { useNavigate } from 'react-router-dom'
import Search from '../../components/search/Search'
import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel} from '@tanstack/react-table'
import ButtonPrimary from '../../components/button/ButtonPrimary'

const columns = [

  {
    header: 'Product Name',
    accessorKey: 'name',
  },
  {
    header: 'Category',
    accessorKey: 'category.name',
  },
  {
    header: 'Quantity',
    accessorKey: 'quatity',
    cell: info => {
      const row = info.row.original;
      const measurment = row.measurment
      const sub_measurment = row.sub_measurment || null;
      const sub_measurment_value = row.sub_measurment_value || null;
      if (sub_measurment && sub_measurment_value) {
            
      
                return  "1 " + measurment + "  =  " + sub_measurment_value + " " + sub_measurment
                  
                
               
              } else {
                return  measurment
              }
            },
    },
  {
    header: 'Description',
    accessorKey: 'description',
  },  
];

const ProductList = () => {

  const dispatch = useDispatch()
  const isLoggedIn =  useSelector(selectIsLoggedIn)
  const navigate = useNavigate()



  const [filterText, setFilterText] = useState("");
    
    

  useRedirectLoggedOutUser("/login");
 

  const goCreateProduct = () =>{
    navigate("/add-product")
  }
  const goCreateProductCategory = () =>{
    navigate("/add-prodCat")
  }
  const goToCategory = () =>{
    navigate("/prodCat")
  }


  const {products, isLoading, isError, message} = useSelector((state)=>state.product)
  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getProducts())
    }    

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])



const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

    const table = useReactTable({
      data: products,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
          sorting: sorting,
          globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
  })

  

  return (
    <div className='product-list'>
      <div className='table'>
        
        <div className='--flex-between'>
        <ButtonPrimary  onClick = {goCreateProduct} names="Product (ምርት መዝግብ)" className="--btn --btn-primary button-create"/>

        <ButtonPrimary  onClick = {goCreateProductCategory} names="Create Category (ምርት አይነት)" className="--btn --btn-primary button-create"/>

        <ButtonPrimary  onClick = {goToCategory} names="Cat List (ምርት አይነት ዝርዝር)" className="--btn --btn-primary button-create"/>
        <input type='text' value={filtering} onChange={(e)=> setFiltering(e.target.value)}/>


        </div>
        
        {isLoading && <SpinnerImg />}
        <div className='table'>
          {!isLoading && products.length === 0 ? (
            <p>No products found!</p>
          ) : (
            
            <div className="w3-container w3-responsive">
       
        <table className='w3-table-all w3-striped  w3-hoverable w3-card-4'>
            <thead>
            {table.getHeaderGroups().map(headerGroup=> (
                <tr key={headerGroup.id} className="w3-light-grey">
                    {headerGroup.headers.map(header=><th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                            header.column.columnDef.header, 
                            header.getContext()
                        )}
                        {
                            {asc: ' 🔼', desc: ' 🔽'}[header.column.getIsSorted() ?? null]
                        }
                    </th>)}
                </tr>
            ))}
            </thead>
            
            <tbody>
                {table.getRowModel().rows.map(row =>(
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell=>(
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>))}
                    </tr>
                ))}
                
            </tbody>
        </table>
        
    </div>
          )}
        </div>
        <div className='--flex-center'>
            <a onClick={()=> table.setPageIndex(0)} className="w3-btn w3-text-white w3-teal">First</a>
            <a disabled={!table.getCanPreviousPage()} onClick={()=> table.previousPage()} className="w3-btn w3-text-white w3-teal">Prev</a>
            <a disabled={!table.getCanNextPage()} onClick={()=> table.nextPage()} className="w3-btn w3-text-white w3-teal">Next</a>
            <a onClick={()=> table.setPageIndex(table.getPageCount() - 1)} className="w3-btn w3-text-white w3-teal">Last</a>
        
        </div>
      </div>
    </div>
  )
}

export default ProductList