import React, { useEffect, useState } from 'react'
import "./Storelist.css"
import Search from '../../components/search/Search'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getStorelists } from '../../redux/features/store/storelistSlice'
import { SpinnerImg } from '../../components/loader/Loader'
import DataTable from 'react-data-table-component';
import { getMainStore } from '../../redux/features/mainStore/mainStoreSlice'
import ButtonPrimary from '../../components/button/ButtonPrimary'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
 


const StorelistList = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useRedirectLoggedOutUser("/login");

    const goCreateStoreList = () => {
        navigate("/add-storelist")
    }
    const goCreateMainStore = () => {
        navigate("/add-mainstore")
    }

        // Filtering


        const [filterText, setFilterText] = useState('');

        const columnssub = [
          {
            header: 'Store / ትንንሽ ስቶር',
            accessorKey: 'name',
          },
          {
            header: 'Price Category / ዋጋ',
            accessorKey: 'sPrice.name',
          },
          {
            header: 'Oprator',
            accessorKey: 'operator',
          },
          {
            header: 'Type',
            accessorKey: 'processing',
          },
          {
            header: 'Description',
            accessorKey: 'description',
          },
        ]

        const columnsmain = [
          {
            header: 'Store / ትልቅ ስቶር',
            accessorKey: 'name',
          },
          {
            header: 'Oprator',
            accessorKey: 'operator',
          },
          {
            header: 'Description',
            accessorKey: 'description',
          },
        ]
        
    const { storelists, isLoading, isError, message } = useSelector((state)=>state.storelist)
    const {mainstores} = useSelector((state)=>state.mainstore)
    useEffect(()=>{
        if(isLoggedIn === true){
            dispatch(getStorelists())
        }
        if(isError){
            console.log(message)
        }
    },[isLoggedIn, dispatch, isError, message])

    useEffect(()=>{
        if(isLoggedIn === true){
            dispatch(getMainStore())
        }
        if(isError){
            console.log(message)
        }
    },[isLoggedIn, dispatch, isError, message])

  //  Filter
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('')
    const table = useReactTable({
      data: storelists,
      columns: columnssub,
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
  
    const tableMain = useReactTable({
      data: mainstores,
      columns: columnsmain,
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

    <>
    
    
      
  
        <div className='btnflex'>
        <ButtonPrimary  onClick = {goCreateStoreList} names="Main store (ዋና ስቶር)" className="--btn --btn-primary button-create"/>

        <ButtonPrimary  onClick = {goCreateMainStore} names="Sub Store (ትናንሽ ስቶር)" className="--btn --btn-primary button-create"/>

        </div>
        <span>
        <input type='text' value={filtering} onChange={(e)=> setFiltering(e.target.value)}/>

          </span>
        {isLoading && <SpinnerImg />}
          <div className='table-containers'>
        <div className='--dir-column'>
          {!isLoading && storelists.length === 0 ? (
            <p>No Sub Stores found!</p>
          ) : (

            <div className="containers">
           
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
                <div className='--flex-center'>
                <a onClick={()=> table.setPageIndex(0)} className="w3-btn w3-text-white w3-teal">First</a>
                <a disabled={!table.getCanPreviousPage()} onClick={()=> table.previousPage()} className="w3-btn w3-text-white w3-teal">Prev</a>
                <a disabled={!table.getCanNextPage()} onClick={()=> table.nextPage()} className="w3-btn w3-text-white w3-teal">Next</a>
                <a onClick={()=> table.setPageIndex(table.getPageCount() - 1)} className="w3-btn w3-text-white w3-teal">Last</a>
            
            </div>
                
            </div>
            
          
    
            
            <div className="w3-container w3-responsive">
                <table className='w3-table-all w3-striped  w3-hoverable w3-card-4 w3-center'>
                    <thead>
                    {tableMain.getHeaderGroups().map(headerGroup=> (
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
                        {tableMain.getRowModel().rows.map(row =>(
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell=>(
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>))}
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div className='--flex-center'>
                <a onClick={()=> tableMain.setPageIndex(0)} className="w3-btn w3-text-white w3-teal">First</a>
                <a disabled={!tableMain.getCanPreviousPage()} onClick={()=> tableMain.previousPage()} className="w3-btn w3-text-white w3-teal">Prev</a>
                <a disabled={!tableMain.getCanNextPage()} onClick={()=> tableMain.nextPage()} className="w3-btn w3-text-white w3-teal">Next</a>
                <a onClick={()=> tableMain.setPageIndex(tableMain.getPageCount() - 1)} className="w3-btn w3-text-white w3-teal">Last</a>
            
            </div>
                
            </div>
            
              
            </div>
          
            
          )}
        </div>
        </div>
    
    
    

    
    </>
    
    )
}

export default StorelistList