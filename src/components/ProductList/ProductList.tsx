import { useStore } from "effector-react"
import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"
import useOpen from "../../hooks/useOpeningSwitcher"
import { $lazyLoad, clearLazyLoad, setLazyLoad } from "../../store/lazyLoadIndex"
import { setCurVariant } from "../../store/ProductPage"
import { $acces, $categories, $products, getCategories, getProducts } from "../../store/skladData"
import { $tgInfo } from "../../store/tgData"
import { CategoryObject, IProduct } from "../../types/types"
import Header from "../Header/Header"
import Loader from "../Ui/Loader/Loader"
import Product from "../Product/Product"
import ProductPage from "../ProductPage/ProductPage"
import { $category } from "../../store/pickedCategory"
import { categoryNameParser, findParentCategory} from "../../utils/parsers"
import ArrowIcon from "../Ui/ArrowIcon/ArrowIcon"
import ProductsOut from "../Ui/ProductsOut/ProductsOut"

const sortByGroup = (products: IProduct[] | null, count: number, index: number) => {
    const result = [];
    if(!products) return []
    if(products.length < 18) return products
    else index += 2
    if(products.length / 2 === index - 1) return products

    for (let s = 0, e = count; s < products.length; s += count, e += count)
        result.push(products.slice(s, e));

    const final = []

    for(let i = 0; i < index; i++)
        if(result[i])final.push(result[i])

    
    return final.flat(1)
}

const ProductListStyled = styled.div`
    display: flex;
    width: 90%;
    margin: 55px auto 0 auto;
    flex-direction: column;
    padding-bottom: 10vh;
`

const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const CategoryCard = styled.div<{dark: boolean}>`
    width: 100%;
    min-height: 40px;
    background-color: ${props => props.dark? 'white' : 'black'};
    color: ${props => props.dark? 'black' : 'white'};
    border-radius: 7px;
    text-align: center;
    display: flex;
    padding-left: 5%;
    font-weight: 300;
    box-sizing: border-box;
    align-items: center;
    cursor: pointer;
`

const ProductRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 15px;
`


const ProductList = () => {
    const {openState, switchHandler} = useOpen()
    const [isLoading, setIsLoaing] = useState(true)
    const [imgLoading, setImgLoading] = useState(true)
    const {dark} = useStore($tgInfo)
    const {access_token} = useStore($acces)
    const products = useStore($products)
    const currentCategory = useStore($category)
    const categories = useStore($categories)
    const loadIndex = useStore($lazyLoad)
    const myRef = useRef<HTMLDivElement>(null)


    const {ref, inView} = useInView({delay: 100})


    useEffect(() => {
        clearLazyLoad()
        setCurVariant(0)
        getProducts.pending.watch(pending => {
            setIsLoaing(pending)
        })
    }, [currentCategory])

    useEffect(() => {
        if(myRef.current) {
            myRef.current?.scrollTo({
                top: 0
            })
        }
    }, [products])

    const pickCategory = (category: CategoryObject | null) => {
        // if(category) { 
        //     setCategory(category)
        //     getProducts({acces: access_token, category: getChildsFolders(category), saleDot})
        // }
        // else {
        //     setCategory(null)
        //     getProducts({acces: access_token, category: categories, saleDot})
        // }
    }
    
    useEffect(() => {
        getProducts({acces: access_token, category: '', saleDot: ''})
        if(products) getCategories(products.flat(1))
    }, [access_token, products])
    

    useEffect(() => {
        if(products && loadIndex < products.length/2 && inView) {
            setLazyLoad(loadIndex+1)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView])


    return (
        <>
            <Header/>
            {openState? <ProductPage exit={switchHandler}></ProductPage> : null}
            <ProductListStyled ref={myRef}>
                {
                    !isLoading? 
                    <>
                        {currentCategory? <div style={{display: 'flex', alignItems: 'center', marginBottom: '1.5vh'}}>
                            <ArrowIcon BackgroundOff func={() => pickCategory(findParentCategory(categories, currentCategory))}/>
                            <h1 style={{fontSize: 28, fontWeight: 400, color: dark? 'white' : 'black'}}>Категории</h1>
                        </div> : <></>}
                        <CategoryWrapper>
                            {currentCategory && currentCategory.child? 
                            currentCategory.child.map((cat, index) => <CategoryCard onClick={() => pickCategory(cat)} key={index} dark={dark}>{categoryNameParser(cat.folder_name, cat.padding)}</CategoryCard>)
                            : null
                        }
                        </CategoryWrapper>
                        <h1 style={{fontSize: 28, fontWeight: 400, color: dark? 'white' : 'black', marginBottom: '0.5vh', marginTop: '1.5vh'}}>Товары</h1>
                        {sortByGroup(products, 2, loadIndex).map((row, i: number, arr) => {
                            return <ProductRow key={i} ref={i === arr.length-1? ref : null} >
                                {row.map((data: IProduct | null) => {
                                    return data? <Product
                                    setImgLoading={setImgLoading}
                                    key={data.code}
                                    data={data}
                                /> : null
                                })}
                            </ProductRow>
                        })}
                    </> 
                    :
                    products && products.length? 
                        <Loader></Loader> 
                    :
                    
                        <ProductsOut/>
                }
            </ProductListStyled> 
        </>
    )
}

export default ProductList