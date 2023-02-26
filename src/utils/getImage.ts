import axios from "axios"
import { IImage } from "../types/types"
import { API } from "./api"

//Cash
const cashedImages: any = {}
//Cash


export const getImage = async (url: string, acces: string, isVariant: boolean) => {
    const config = {
        headers: {
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Accept": "*/*",
            "Content-Type": "application/json",
            'Access-Control-Allow-Credentials': "true",
            "Authorization": `Bearer ${acces}`
        },
    }

    const images: Promise<any>[] = []
    const link = `${API.path}remap/1.2/entity/${isVariant? 'variant' : 'product'}/${url.split('/').slice(8).join('/')}`

    const imagesUrl = await axios(link, config)
    if(cashedImages[link]) {
        return cashedImages[link]
    }

    if(imagesUrl.data.rows.length) {
        imagesUrl.data.rows.forEach(async (imgData: IImage) => {
            const cfg = {
                method: 'post',
                url: `${API.path}get_image`,
                headers: { 
                    'Authorization': `Bearer ${acces}`, 
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    "img_id": imgData.meta.downloadHref.split('/').slice(7).join('/')
                })
            }

            images.push(axios(cfg))
        })
    }

    cashedImages[link] = images
    return images
}