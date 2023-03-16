import axios from "axios"
import { useStore } from "effector-react"
import { useState } from "react"
import PhoneInput from "react-phone-input-2"
import styled, { keyframes } from "styled-components"
import { $basket } from "../../store/basket"
import { $acces, $skladId } from "../../store/skladData"
import { $tgInfo } from "../../store/tgData"
import 'react-phone-input-2/lib/style.css'
import Loader from "../Ui/Loader/Loader"
import { Controller, useForm } from "react-hook-form"
import { IForm } from "./form"
import { $dostavkaState } from "../../store/dostavka"


interface OrderModalProps {
    modalHandler: () => void
}

const openModal = keyframes`
    0% {
        opacity: 0;
    }
    
    100%{
        opacity: 1;
    }
`

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;   
    animation: ${openModal} 0.3s forwards;
    z-index: 304;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(8px);
`

const Modal = styled.div<{ dark: boolean, focus: boolean }>`
    background-color: ${props => props.dark ? 'white' : 'rgba(0, 0, 0, 0.7)'};
    width: 80%;
    height: 27%;   
    display: flex;
    z-index: 302;
    flex-direction: column;
    justify-content: space-between;
    padding: 10% 7%;
    box-sizing: border-box;
    gap: 5%;
    position: relative;
    border-radius: 10px;
`

const Button = styled.button<{ dark: boolean }>`
    border: 0;
    background-color: ${props => props.dark ? 'black' : 'white'};
    color: ${props => props.dark ? 'white' : 'black'};
    border-radius: 10px;
    font-weight: 500;
    font-size: 16px;
    box-sizing: border-box;
    padding: 10px 25px;
`

const Input = styled.input`
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
`

const MainButton = styled.button<{ dark: boolean, warning?: boolean, focus?: boolean }>`
    ${props => !props.focus ? 'position: fixed;' : ''}
    width: 100%;
    padding: 2.5vh 0;
    z-index: 300;
    bottom: -1px;
    font-size: 16px;
    border: 0;
    outline: none;
    cursor: pointer;
    left: 0;
    background-color: ${props => props.warning ? 'red' : props.dark ? 'white' : 'black'};
    color: ${props => props.dark ? 'black' : 'white'};
`

const OrderModal: React.FC<OrderModalProps> = ({ modalHandler }) => {
    const { dark, tgUserName, tgNickName } = useStore($tgInfo)
    const { access_token } = useStore($acces)
    const basket = useStore($basket)
    const [focus, setFocus] = useState(false)
    const tg = window.Telegram.WebApp
    const { desktop } = useStore($tgInfo)
    const [isEnd, setIsEnd] = useState(false)
    const [validate, setValidate] = useState(false)
    const skladId = useStore($skladId)
    const dostavkaState = useStore($dostavkaState)
    const { register, control, getValues } = useForm<IForm>({ defaultValues: { phone: '', name: tgUserName } })


    const accepHandler = async () => {
        setIsEnd(true)
        const configForAgent = {
            method: 'post',
            url: "https://www.mc.optimiser.website/api/agent_id",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "token": access_token,
                "phone": getValues('phone').replace(/[^\d]/g, ''),
                "tg_username": tgNickName,
                "name": getValues('name')
            })
        }

        const positions = basket.map(prod => {
            const type = typeof prod.data.variantsCount === 'number' ? "product" : "variant"

            return {
                "quantity": prod.counter,
                "price": prod.data.buyPrice.value * 100,
                "discount": 0,
                "vat": 0,
                "assortment": {
                    "meta": {
                        "href": `https://online.moysklad.ru/api/remap/1.2/entity/product/${prod.data.id}`,
                        "type": type,
                        "mediaType": "application/json"
                    }
                }
            }
        })

        
        if(dostavkaState) {
            positions.push(
                {
                    "quantity": 1,
                    "price": 350 * 100,
                    "discount": 0,
                    "vat": 0,
                    "assortment": {
                        "meta": {
                            "href": `https://online.moysklad.ru/api/remap/1.2/entity/product/${'47dc383b-6bb3-11eb-0a80-09e20010ae54'}`,
                            "type": 'services',
                            "mediaType": "application/json"
                        }
                    }
                }
                )
            }


        const agent = await axios(configForAgent)


        const org = await axios('https://www.mc.optimiser.website/api/remap/1.2/entity/organization', {
            headers: { "Authorization": `Bearer ${access_token}` }
        })

            
        const body = JSON.stringify({
            "organization": {
                "meta": {
                    "href": `https://online.moysklad.ru/api/remap/1.2/entity/organization/${org.data.rows[0].id}`,
                    "type": "organization",
                    "mediaType": "application/json"
                }
            },
            "agent": {
                "meta": {
                    "href": `https://online.moysklad.ru/api/remap/1.2/entity/counterparty/${agent.data.agent_id}`,
                    "type": "counterparty",
                    "mediaType": "application/json"
                }
            },
            "store": {
                "meta": {
                    "href": `https://online.moysklad.ru/api/remap/1.2/entity/store/${skladId}`,
                    "type": "store",
                    "mediaType": "application/json"
                }
            },
            "positions": positions,
            "shipmentAddress": getValues('location'),
            "description": `Имя клиента: ${getValues('name')}\nНомер телефона: ${getValues('phone').replace(/[^\d]/g, '')}\nКомментарий: ${getValues('desk')}`
        })
        const config = {
            method: 'post',
            url: "https://www.mc.optimiser.website/api/create_order",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            data: body
        }


        const order = await axios(config)


        tg.sendData(JSON.stringify({ order: order.data.id, acces: access_token }))
        tg.close()
    }

    const validateInputs = () => setValidate(getValues('phone').length > 9 && getValues('name').length > 0)

    if (isEnd) return (
        <Wrapper>
            <div onClick={modalHandler} style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
                <Loader />
            </div>
        </Wrapper>
    )


    const basketSum = basket.reduce((acc, item) => {
        return acc + +item.data.buyPrice.value * item.counter
    }, 0)


    return (
        <>
            <Wrapper>
                {/* <div onClick={modalHandler} style={{width: '100%', height: '60%'}}></div> */}
                <Modal focus={focus} dark={dark} onChange={validateInputs}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <h1 style={{ color: dark ? 'black' : 'white', fontSize: 15, textAlign: 'center' }}>Сумма заказа: {basketSum} руб</h1>
                        <h1 style={{ color: dark ? 'black' : 'white', fontSize: 16, textAlign: 'center' }}>Вы уверены?</h1>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button dark={dark} onClick={accepHandler}>Да</Button>
                        <Button dark={dark} onClick={modalHandler}>Нет</Button>
                    </div>
                    {/* <Input {...register('name')} onFocus={focusHandler} onBlur={unFocusHandler} placeholder="Имя"></Input>
                    <Controller
                        control={control}
                        name="phone"
                        rules={{ required: true }}
                        render={({ field: { ref, onBlur, ...field } }) => (
                            <PhoneInput
                                onFocus={focusHandler} 
                                onBlur={unFocusHandler}
                                {...field}
                                inputProps={{
                                    ref,
                                    required: true,
                                    autoFocus: true
                                }}
                                country={"ru"}
                                specialLabel={"Player Mobile Number"}
                            />
                        )}
                    />
                    <Input {...register('desk')} onFocus={focusHandler} onBlur={unFocusHandler} placeholder="Коментарий (необязательно)"></Input>
                    <Input {...register('location')} onFocus={focusHandler} onBlur={unFocusHandler} placeholder={'Адрес доставки'}></Input> */}
                    {/* {basket.length?  <MainButton focus={focus} onClick={accepHandler} dark={dark}>Оформить</MainButton> */}
                    {/* : <MainButton warning={true} focus={focus} dark={dark}>Оформить</MainButton>} */}

                </Modal>
            </Wrapper>
        </>
    )
}

export default OrderModal