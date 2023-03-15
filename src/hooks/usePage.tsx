import { useStore } from "effector-react"
import Basket from "../components/Basket/Basket"
import ProductList from "../components/ProductList/ProductList"
import ProductPage from "../components/ProductPage/ProductPage"
import { $pageId, setCurrentPage } from "../store/pages"




const usePage = () => {
    const pages = [<ProductList key={'ProductListPage'}/>, 
    <Basket key={'BasketPage'}/>, 
    <ProductPage key={'ProductPagePage'} exit={() => {setCurrentPage(0)}}/>]
    const pageId = useStore($pageId)


    const navigator = {
        toProductList: () => setCurrentPage(0),
        toBasket: () => setCurrentPage(1),
        toProductPage: () => setCurrentPage(2),
    }

    return {currentPage: pages[pageId], ...navigator}
}

export default usePage