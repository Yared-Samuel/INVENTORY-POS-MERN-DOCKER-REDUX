import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { getDelivers } from '../../redux/features/delivery/deliverSlice';
import { SpinnerImg } from '../../components/loader/Loader'
import "./DeliverList.css"
import ButtonPrimary from '../../components/button/ButtonPrimary';
import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel} from '@tanstack/react-table'
import moment from 'moment';





const columns = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: info => moment(info.getValue()).format("DD-MMM-YYYY"),
  },
  {
    header: 'Product Name',
    accessorKey: 'product.name',
  },
  {
    header: 'From Store',
    accessorKey: 'to_mainstore.name',
  },
  {
    header: 'To Store',
    accessorKey: 'to_store.name',
  }, 
  {
    header: 'Quantity',
    accessorKey: 'quatity',
    cell: info => {
      const row = info.row.original;
      const product = row.product
      if (product && product.measurment) {
        if (product.sub_measurment_value !== null) {
      
      
                return  row.quatity / product.sub_measurment_value + " - " + product.measurment + " & " + row.quatity % product.sub_measurment_value + " - " + product.sub_measurment
                  
                } else {
                  return row.quatity + ' - ' + product.measurment;
                }
              } else {
                return 'Quantity Not Available';
              }
            },
    },
  
  {
    header: 'Unit Price',
    accessorKey: 'unit_price',
  },
  {
    header: 'Total Price',
    accessorKey: 'total_price',
  },
  
  
];


const DeliverList = () => {

    const dispatch = useDispatch()
    const isLoggedIn =  useSelector(selectIsLoggedIn)
    const navigate = useNavigate()

    useRedirectLoggedOutUser("/login");
    const goCreateDeliver = () =>{
    navigate("/add-delivery")
    }

 

    const { delivers, isLoading, isError, message } = useSelector((state)=>state.deliver)
    useEffect(() => {
      if(isLoggedIn === true) {
        dispatch(getDelivers())
      }
      
      if(isError) {
        console.log(message)
      }
    }, [isLoggedIn, isError, message, dispatch])
    

  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

    const table = useReactTable({
      data: delivers,
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
        <div className='--flex-between --flex-dir-column'>
        <ButtonPrimary  onClick = {goCreateDeliver} names="Delivery (ምርት አስተላልፍ)" className="--btn --btn-primary button-create"/>
        <input type='text' value={filtering} onChange={(e)=> setFiltering(e.target.value)}/>

        </div>
        
        {isLoading && <SpinnerImg />}
          {!isLoading && delivers.length === 0 ? (
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
  )
}

export default DeliverList





