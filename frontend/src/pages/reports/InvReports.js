import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
import { useDispatch, useSelector } from "react-redux";
import {
  getInvBalance,
  getStoreBalance,
} from "../../redux/features/reports/reportSlice";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import "./Reports.css";
import { MdOutlinePointOfSale } from "react-icons/md";
import { useNavigate } from "react-router-dom";




const invBalanceCol = [
  {
    header: 'Main Store / ዋና ስቶር',
    accessorKey: 'storeName',
  },
  {
    header: 'Balance / ቀሪ',
    accessorKey: '_id',
    cell: info => {
      const row = info.row.original;
        return (
          <div>
          {row.data.map((item, index) => (
            <div key={index}>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>{item.productName}</div>
             <div>
               <div style={{ display: "flex", justifyContent: "space-between" , border: "1px solid black", padding: "2px" }}>
                {item.quantity} {item.measurment}
              </div>
            </div>
            </div>
          ))
            }
            </div>
        )
        
              }
    },
]

const storeBalance = [
  {
    header: 'Store / ስቶር',
    accessorKey: 'storeName',
  },
  {
    header: 'Balance / ቀሪ',
    accessorKey: '_id',
    cell: info => {
      const row = info.row.original;
        return (
          <div>
          {row.data.map((item, index) => (
            <div key={index}>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>{item.productName}</div>
             <div>
               <div style={{ display: "flex", justifyContent: "space-between" , border: "1px solid black", padding: "2px" }}>
                {item.quantity} {item.measurmentValue}
              </div>
            </div>
            </div>
          ))
            }
            </div>
        )
        
              }
    },
]

const InvReports = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();




  const { invBalances, storeBalances,  isError, message } =
    useSelector((state) => state.report);
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getInvBalance());
      dispatch(getStoreBalance());
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);


  const goToSaleReports = () => {
    navigate("/reports");
  };
  const goToGrandReports = () => {
    navigate("/grand-reports");
  };


  //  Filter
const [sorting, setSorting] = useState([])
const [filtering, setFiltering] = useState('')
  const table = useReactTable({
    data: invBalances,
    columns: invBalanceCol,
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

  const tableStore = useReactTable({
    data: storeBalances,
    columns: storeBalance,
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
      <div className="top-title">
        <div className="multi-button">
          <button className="report-btn" onClick={goToSaleReports}>
            <MdOutlinePointOfSale /> Sale Report
          </button>
          <button className="report-btn-active">
            <MdOutlinePointOfSale /> Balance Report
          </button>
          <button className="report-btn" onClick={goToGrandReports}>
            <MdOutlinePointOfSale /> Grand Report
          </button>
        </div>

        <div className="search">
        <input type='text' value={filtering} onChange={(e)=> setFiltering(e.target.value)}/>

        </div>
      </div>

      <div className="containers">
        <div className="boxs">
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
        <div className='--flex-center'>
            <a onClick={()=> table.setPageIndex(0)} className="w3-btn w3-text-white w3-teal">First</a>
            <a disabled={!table.getCanPreviousPage()} onClick={()=> table.previousPage()} className="w3-btn w3-text-white w3-teal">Prev</a>
            <a disabled={!table.getCanNextPage()} onClick={()=> table.nextPage()} className="w3-btn w3-text-white w3-teal">Next</a>
            <a onClick={()=> table.setPageIndex(table.getPageCount() - 1)} className="w3-btn w3-text-white w3-teal">Last</a>
        
        </div>
        </div>

        <div className="boxs">
        <div className="w3-container w3-responsive">
            <table className='w3-table-all w3-striped  w3-hoverable w3-card-4 w3-center'>
                <thead>
                {tableStore.getHeaderGroups().map(headerGroup=> (
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
                    {tableStore.getRowModel().rows.map(row =>(
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
            <a onClick={()=> tableStore.setPageIndex(0)} className="w3-btn w3-text-white w3-teal">First</a>
            <a disabled={!tableStore.getCanPreviousPage()} onClick={()=> tableStore.previousPage()} className="w3-btn w3-text-white w3-teal">Prev</a>
            <a disabled={!tableStore.getCanNextPage()} onClick={()=> tableStore.nextPage()} className="w3-btn w3-text-white w3-teal">Next</a>
            <a onClick={()=> tableStore.setPageIndex(tableStore.getPageCount() - 1)} className="w3-btn w3-text-white w3-teal">Last</a>
        
        </div>
          
        </div>
      </div>
    </>
  );
};

export default InvReports;
