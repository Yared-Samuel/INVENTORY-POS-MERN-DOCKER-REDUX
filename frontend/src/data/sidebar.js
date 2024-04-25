import { FaTh } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi"
import { BiLogoProductHunt } from "react-icons/bi"
import { BiTransfer } from "react-icons/bi"
import { FcSalesPerformance } from "react-icons/fc"
import { GiPriceTag } from "react-icons/gi"
import { LuArchiveRestore } from "react-icons/lu"
import { ImMakeGroup } from "react-icons/im"
import { GrDocumentCloud } from "react-icons/gr"


const menu = [
  {
    title: "Dashboard",
    icon: <FaTh color="green"/>,
    path: "/dashboard",
  },
  
  {
    title: "Purchase",
    icon: <BiPurchaseTag color="teal"/>,
    path: "/purchase",
  },
  {
    title: "Transfer",
    icon: <BiTransfer color="purple"/>,
    path: "/deliver",
  },
  {
    title: "Sales",
    icon: <FcSalesPerformance color="teal"/>,
    path: "/sale-list",
  },
  {
    title: "Exploit",
    icon: <ImMakeGroup color="#5ca1e1"/>,
    path: "/use-list",
  },
  {
    title: "Reports",
    icon: <GrDocumentCloud color="orange"/>,
    path: "/reports",
  },
  
  {
    title: "Configurations",
    icon: <AiFillSetting color="brown"/>,
    path: "",
    childrens: [
      {
        title: "Product",
        icon: <BiLogoProductHunt color="brown"/>,
        path: "/product",
      },
      {
        title: "Price",
        icon: <GiPriceTag color="brown" />,
        path: "/sprice",
      },
      {
        title: "Store",
        icon: <LuArchiveRestore color="brown" />,
        path: "/storelist",
      },
      {
        title: "Service",
        icon: <LuArchiveRestore color="brown" />,
        path: "/serve",
      },
      
    ],
  },
  

  
];

export default menu;