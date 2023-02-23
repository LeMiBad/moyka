import { useStore } from "effector-react"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import styled from "styled-components"
import { $lazyLoad, setLazyLoad } from "../../store/lazyLoadIndex"
import { IProduct } from "../../types/types"
import Product from "../Product/Product"

interface RowProps {
    products: IProduct | null[]
    isLast: boolean
}

const StyledProductRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 15px;
`


export const ProductRow: React.FC<RowProps> = ({products, isLast}) => {
    const {ref, inView} = useInView({delay: 100})
    const [imgLoading, setImgLoading] = useState(true)
    const loadIndex = useStore($lazyLoad)


    useEffect(() => {
        if(products && loadIndex < Math.ceil(products.length/2) && inView) {
            setLazyLoad(loadIndex+1)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView])


    return (
        <>
            <StyledProductRow ref={isLast? ref : null} >
                {products.map((data: IProduct | null) => {
                    return data? <Product
                    setImgLoading={setImgLoading}
                    data={data}
                /> : null
                })}
            </StyledProductRow>
        </>
    )
}

export default ProductRow