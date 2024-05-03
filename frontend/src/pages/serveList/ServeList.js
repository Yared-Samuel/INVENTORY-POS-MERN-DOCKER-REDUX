import React, {useEffect, useState} from 'react'
import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel} from '@tanstack/react-table'
import { SpinnerImg } from '../../components/loader/Loader'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import { getServes } from '../../redux/features/serve/serveSlice'
import ButtonPrimary from '../../components/button/ButtonPrimary'
import moment from "moment";



const ServeList = () => {

  const dispatch = useDispatch()
  const isLoggedIn =  useSelector(selectIsLoggedIn)
  const navigate = useNavigate()


  useRedirectLoggedOutUser("/login");

  const goCreateservice = () =>{
    navigate("/add-serve")
  }

  const columns = [
        
    {
        header: 'Service Name',
        accessorKey: 'serveName',
        footer: 'Service Name',
    },
    {
        header: 'Price',
        accessorKey: 'servePrice',
        footer: 'Price',
    },
    {
        header: 'Measurment',
        accessorKey: 'serveMeasure',
        footer: 'Measurment',
    },
    {
        header: 'Created At',
        accessorKey: 'CreatedAt',
        footer: 'Created At',
        cell: info => moment(info.getValue()).format("DD-MMM-YYYY"),
    },
]

  const {serves, isLoading, isError, message} = useSelector((state)=>state.serve)
 
  useEffect(() => {
    if(isLoggedIn === true){
      dispatch(getServes())
    }    

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])
 

  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')

  const table = useReactTable({
      data: serves,
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
    <div className='w3-card-4'>     
      
        <div className='--flex-between --flex-dir-column'>
          <span>
            <h3>Services</h3>
          </span>
          
        <ButtonPrimary  onClick = {goCreateservice} names="New serve (አዲስ አገልግሎት)" className="--btn --btn-primary button-create"/>
          </div>
       

        {isLoading && <SpinnerImg />}    
   
        <div className="w3-container w3-responsive">
        <input type='text' value={filtering} onChange={(e)=> setFiltering(e.target.value)}/>
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
    <div className='--flex-center'>
            <a onClick={()=> table.setPageIndex(0)} className="w3-btn w3-text-white w3-teal">First</a>
            <a disabled={!table.getCanPreviousPage()} onClick={()=> table.previousPage()} className="w3-btn w3-text-white w3-teal">Prev</a>
            <a disabled={!table.getCanNextPage()} onClick={()=> table.nextPage()} className="w3-btn w3-text-white w3-teal">Next</a>
            <a onClick={()=> table.setPageIndex(table.getPageCount() - 1)} className="w3-btn w3-text-white w3-teal">Last</a>
        
        </div>
    


        
        
      
    </div>
  )
}

export default ServeList



