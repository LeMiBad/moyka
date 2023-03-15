import axios from "axios"
import { useStore } from "effector-react"
import { useEffect, useState } from "react"
import MainButton from "../components/MainButton/MainButton"
import OrderModal from "../components/OrderModal/OrderModal"
import Tost from "../components/Product/Tost"
import { $basket, addBasketItem } from "../store/basket"
import { $pageId } from "../store/pages"
import { $ProductPage } from "../store/ProductPage"
import { $allow_sync_sklad } from "../store/skladData"
import { API } from "../utils/api"
import useAxiosConfig from "./useAxiosConfig"
import usePage from "./usePage"
import useTost from "./useTost"




const useMainButton = () => {
    const pageId = useStore($pageId)
    const basket = useStore($basket)
    const [modal, setModal] = useState(false)
    const {products, curVariant} = useStore($ProductPage)
    const [exist, setExist] = useState(true)
    const {toBasket, toProductList} = usePage()
    const allowSync = useStore($allow_sync_sklad)
    const {tost, setTost} = useTost()
    const config = useAxiosConfig()

    const basketSum = basket.reduce((acc, item) => {
        return acc + +item.data.buyPrice.value * item.counter
    }, 0)


    const modalHandler = () => setModal(modal? false : true)

    useEffect(() => {
        if(allowSync) {
            if(products[curVariant].id.length) {
                const url = `${API.path}remap/1.2/report/stock/bystore/current?filter=assortmentId=${products[curVariant].id};storeId=${''}`
                axios(url, config)
                .then(data => {
                    if(data.data.length) {
                        if(data.data[0].stock < 0) {
                            setExist(false)
                        }
                        else {
                            setExist(true)
                        }
                    }
                    else {
                        setExist(false)
                    }
                })
            }
        }
    }, [allowSync, config, curVariant, products])

    useEffect(() => {
        setTost([''])
    }, [products, setTost])

    if(pageId === 0) {
        if(basket.length) {
            return <MainButton func={toBasket}>{`Оформить заказ`}</MainButton>
        }
        else return null
    }
    else if(pageId === 1) {
        if(basketSum) return <>
            {modal? <OrderModal modalHandler={modalHandler}/> : null}
            <MainButton func={() => {modalHandler();toBasket()}}>{`Перейти к оформлению`}</MainButton>
        </>
        else return <MainButton func={toProductList}>Назад к товарам</MainButton>
    }
    else if(pageId === 2 && products[curVariant] ) {
        if(products[curVariant].buyPrice.value && exist) return <>
            <MainButton func={() => {
                setTost([...tost, products[curVariant].name])
                addBasketItem({
                    data: products[curVariant],
                    counter: 1
                })
            }}>{`Добавить в корзину`}</MainButton>
            {tost.map((tost, i) => tost.length? <Tost key={i}>{tost}</Tost> : null)}
        </>
        else return <MainButton func={toProductList}>Товара нет в наличии</MainButton>
    }
}

export default useMainButton