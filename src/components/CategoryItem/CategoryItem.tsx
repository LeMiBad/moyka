import { useStore } from "effector-react"
import { useState } from "react"
import styled from "styled-components"
import { clearLazyLoad } from "../../store/lazyLoadIndex"
import { setCategory } from "../../store/pickedCategory"
// import { $pickedSaleDot } from "../../store/pickedSaleDot"
import { $acces, getProducts, setProducts } from "../../store/skladData"
import { $tgInfo } from "../../store/tgData"
import { CategoryObject } from "../../types/types"
import { categoryNameParser, getChildsFolders, ProductGroupRow } from "../../utils/parsers"
import ArrowIcon from "../Ui/ArrowIcon/ArrowIcon"


const StyledCategoryItem = styled.h1<{dark: boolean, padding: number}>`
    color: ${props => props.dark? 'white' : 'black'};
    padding-left: ${props => props.padding*10}px;
    margin-bottom: 14px;
    font-size: 18px;
    margin: 0;
`


const CategoryItem: React.FC<{cat: CategoryObject, switchHandler: () => void}> = ({cat, switchHandler}) => {
    const {dark} = useStore($tgInfo)
    const {access_token} = useStore($acces)
    // const saleDot = useStore($pickedSaleDot)
    const [openState, setOpenState] = useState(false)

    const pickCategory = (category: CategoryObject) => {
        switchHandler()
        setProducts(ProductGroupRow(category.category))      
        setCategory(category)
        clearLazyLoad()
        // if(saleDot) getProducts({acces: access_token, category: getChildsFolders(category), saleDot})
    }


    return (
        <>
            <div key={cat.folder_name} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                <StyledCategoryItem onClick={() => {pickCategory(cat)}} padding={cat.padding} dark={dark}>{cat.folder_name? cat.folder_name : categoryNameParser(cat.folder_name, cat.padding)}</StyledCategoryItem> 
                {cat.child? 
                    <div style={{transform: openState? 'rotate(270deg)' : 'rotate(180deg)', transition: '0.3s'}}><ArrowIcon func={() => {setOpenState(openState? false : true)}}></ArrowIcon></div> 
                : 
                    null
                }
            </div>
            {openState && cat.child? 
                cat.child.map((categ, index) => <CategoryItem switchHandler={switchHandler} key={cat.folder_name + index} cat={categ} />)
            : 
                null
            }
        </>
    )
}

export default CategoryItem