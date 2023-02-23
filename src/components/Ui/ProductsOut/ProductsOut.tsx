import { useStore } from "effector-react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { $tgInfo } from "../../../store/tgData"
import Loader from "../Loader/Loader"



const StyledProductsOut = styled.div`
    height: 90vh;
    margin-top: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`



const ProductsOut = () => {
    const {dark} = useStore($tgInfo)
    const [isVisible, setIsVisible] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true)
        }, 3000)
    }, [])


    return <>
        {
            isVisible?  <StyledProductsOut>
                            <h1 style={{color: dark? 'white' : 'black', fontSize: 26}}>Товары отсутствуют :(</h1>
                        </StyledProductsOut> 
                        : 
                        <Loader/>
        }
    </>
}

export default ProductsOut