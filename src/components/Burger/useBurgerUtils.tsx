import { useStore } from "effector-react"
import { useEffect } from "react"
import { $category, setCategory } from "../../store/pickedCategory"
import { $acces, $categories, getCategories, getProducts, setAllowSyncSklad } from "../../store/skladData"
import { CategoryObject } from "../../types/types"
import { getChildsFolders } from "../../utils/parsers"




const useBurgerUtils = () => {
    const activeCategory  = useStore($category)
    const categories = useStore($categories)

    useEffect(() => {
        if(categories.length) setCategory(activeCategory ? activeCategory : null)
    }, [activeCategory, categories])


    // useEffect(() => {
    //     if(saleDot) {
    //         if(activeCategory) getProducts({acces: access_token, category: getChildsFolders(activeCategory), saleDot})
    //         else {
    //             const final: CategoryObject[] = []

    //             categories.forEach(cat => {
    //                 final.push(...getChildsFolders(cat))
    //             })

    //             getProducts({acces: access_token, category: final, saleDot})
    //         }
    //     }
    // }, [access_token, activeCategory, categories, saleDot])
    
    // return {saleDot, categories, access_token}
}

export default useBurgerUtils