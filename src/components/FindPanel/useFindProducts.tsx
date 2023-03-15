import axios from "axios"
import { useEffect, useState } from "react"
import { IProduct, ISalePrice } from "../../types/types"
import { useStore } from "effector-react"
import { $acces, $categories, $products } from "../../store/skladData"
// import { splitArr, сategoriesParse } from './../../utils/parsers'
import { API } from "../../utils/api"
let savedProducts: IProduct[] = []


const useFindProducts = () => {
    const [req, setReq] = useState('')
    const {access_token} = useStore($acces)
    const [isLoading, setIsLoading] = useState(true)
    const [filted, setFilted] = useState<IProduct[]>([])
    const allCategories = useStore($categories)
    const products = useStore($products)

    // (savedProducts)

    useEffect(() => {
        setIsLoading(true)

        
        if (req.length < 3) {
            setFilted([])
            return
        }
        else {
            axios.get(`${API.path}partner_grill/get_products/dd75ccb6-5f63-11ed-0a80-062400103edd`, API.configs.get(access_token))
            .then((data) => {
                const products = data.data.filter((product: IProduct) => {
                    return product.item_info.name.toLowerCase().includes(req.toLowerCase())
                })


                setFilted(products.map((item: any) => {
                    item.item_info.buyPrice.value /= 100
                    return item.item_info
                }))
                setIsLoading(false)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [req])



    return { req, setReq, filted, isLoading }
}

export default useFindProducts