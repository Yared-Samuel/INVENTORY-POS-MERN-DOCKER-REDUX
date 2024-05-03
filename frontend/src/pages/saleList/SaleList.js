import React, { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { SpinnerImg } from '../../components/loader/Loader';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { getSales } from '../../redux/features/sale/saleSlice';
import moment from 'moment';
import ButtonPrimary from '../../components/button/ButtonPrimary';

const columns = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: info => moment(info.getValue()).format('DD-MMM-YYYY'),
  },
  {
    header: 'Store',
    accessorKey: 'to_store.name',
  },

      {
        header: 'Product/Service',
        accessorKey: '_id',
        cell: info => {
          const row = info.row.original;
          const product = row.product || ""
          const serve = row.serve || ""
            return  serve.serveName ? serve.serveName : product.name
                  }
        },
  {
    header: 'Quantity',
    accessorKey: 'quatity',
  },
  {
    header: 'Sale / cash',
    accessorKey: 'total_price',
  }
  
];

const SaleList = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  useRedirectLoggedOutUser("/login");


  const goCreateSale = () => {
    navigate("/add-sale");
  }



  const {sales, isLoading, isError,message} = useSelector((state)=>state.sale)
  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getSales())
    }    

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])

  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')
    const table = useReactTable({
      data: sales,
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
      <div className='table'>
        <div className='--flex-between --flex-dir-column'>
        <ButtonPrimary  onClick = {goCreateSale} names="Sales (ምርት ሽያጭ)" className="--btn --btn-primary button-create"/>

        <input type='text' value={filtering} onChange={(e)=> setFiltering(e.target.value)}/>

        </div>
        
        {isLoading && <SpinnerImg />}
        <div className='table'>
          {!isLoading && sales.length === 0 ? (   <p>No sales found!</p>
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

export default SaleList