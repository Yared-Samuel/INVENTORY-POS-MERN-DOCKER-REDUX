import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { getSprices } from '../../redux/features/sprice/spriceSlice'
import { SpinnerImg } from '../../components/loader/Loader'

import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import ButtonPrimary from '../../components/button/ButtonPrimary'
import moment from 'moment'




const SpriceList = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate()
  const [editableRows, setEditableRows] = useState([]);

  useRedirectLoggedOutUser("/login")

  const goCreateSprice = () => {
      navigate("/add-sprice")
  }




  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    
    {
      header: 'Quantity',
      accessorKey: 'products',
      cell: info => {
        const row = info.row.original;
        return (
          <div>
            {row.products.map((item, index) => (
              <div key={index}>
                <div style={{ fontWeight: "bold", fontSize: "14px" }}>{item.product.name} : {item.sellingPrice}</div>
               
              </div>
            ))
              }
              </div>
        )
      }},
    
    {
      header: 'Edit',
      accessorKey: '_id',
      cell: info => {
        const row = info.row.original;
        return (
          <Link to={`/price-edit/${row._id}`} className='save-btn' onClick={()=>handelEdit(row._id)}>
        Update
      </Link>
        )
      }
    },
    
    
  ];

  const handelEdit = (_id) => {
    setEditableRows((prevEditableRows)=>
    prevEditableRows.includes(_id) ? prevEditableRows.filter((rowId)=> rowId !== _id)
    : [...prevEditableRows, _id]
    )
  }





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
    
    // const filteredPrice = sprices.filter(row=>{
    //   const nameString =row.name && row.name.toString()
    //   return(
    //     nameString.toLowerCase().includes(filterText.toLowerCase())
    //   )
    // })

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
      const table = useReactTable({
        data: sprices,
        columns: columns,
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
    <hr />
    <div className='table'>
      <div className='--flex-between --flex-dir-column'>
      <ButtonPrimary  onClick = {goCreateSprice} names="Set Price (ዋጋ አውጣ)" className="--btn --btn-primary button-create"/>

      <input type='text' value={filtering} onChange={(e)=> setFiltering(e.target.value)}/>

      </div>
      
      {isLoading && <SpinnerImg />}
      <div className='table'>
        {!isLoading && sprices.length === 0 ? (
          <p>No Price list found!</p>
        ) : (
          <div className="w3-container w3-responsive">
          <table className='w3-table-all w3-striped  w3-hoverable w3-card-4 w3-center'>
              <thead>
              {table.getHeaderGroups().map(headerGroup=> (
                  <tr key={headerGroup.id} className="w3-light-grey">
                      {headerGroup.headers.map(header=><th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                          {header.isPlaceholder ? null : flexRender(
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
        
        </div>
      </div>
  )
}

export default SpriceList