import { splitArr } from './../utils/parsers';
import { ISalePrice, IAcces } from './../types/types';
import axios from "axios";
import { createEvent, createStore } from "effector";
import { createEffect } from 'effector'
import { CategoryObject, ICategory, IProduct } from "../types/types";
import { API } from '../utils/api';



// Cash
interface ICachedCategory {
    [category: string]: any;
}

const cashedCategory: ICachedCategory = {};
// Cash

export const setAccId = createEvent<string>()
export const $accId = createStore('')
    .on(setAccId, (_, id) => id)

const initialAcces = {
    access_token: '',
    account_id: '',
    org_name: ''
}

export const setShopAcces = createEvent<string>()
export const $acces = createStore<IAcces>(initialAcces)
    .on(setShopAcces, (state, acces) => {
        return {
            access_token: acces,
            account_id: '',
            org_name: ''
        }
    })


export const getCategories = createEvent<IProduct[]>()
export const $categories = createStore<CategoryObject[]>([{ padding: 0, folder_name: '', category: [] }])
    .on(getCategories, (_, allProducts) => {
        function buildCategoryTree(categories: string[]): CategoryObject[] {
            const rootNode: CategoryObject = {
                padding: 0,
                folder_name: "",
                category: [],
                child: [],
            };

            for (const category of categories) {
                let currentNode = rootNode;
                const subcategories = category.split("/");

                for (const [i, subcategory] of Array.from(subcategories.entries())) {
                    let matchingNode = currentNode.child?.find(
                        (node) => node.folder_name === subcategory
                    );

                    if (!matchingNode) {
                        matchingNode = {
                            padding: i + 1,
                            folder_name: subcategory,
                            category: [],
                            child: [],
                        };
                        currentNode.child = currentNode.child || [];
                        currentNode.child.push(matchingNode);
                    }

                    currentNode = matchingNode;
                }
            }

            return rootNode.child || [];
        }

        function groupProducts(arr: CategoryObject[], products: IProduct[]): CategoryObject[] {
            return arr.map(obj => {
                const pathNameIncluded = products.filter(p => {
                    if(p) obj.folder_name.includes(p.pathName)
                });

                const updatedCategory = [...obj.category, ...pathNameIncluded];

                let updatedChild = null;
                if (obj.child) {
                    updatedChild = groupProducts(obj.child, products);
                }

                return {
                    ...obj,
                    category: updatedCategory,
                    child: updatedChild,
                };
            });
        }

        const result = groupProducts(buildCategoryTree(allProducts.map((prod, i) => {
            if (prod) return prod.pathName
            else return ''
        })), allProducts)

        return result
    })


export const setAllowSyncSklad = createEffect(async (clientId: string) => {
    const config = API.configs.get()

    const url = `${API.path}optimiser/2.0/apps/configure/${clientId}`
    const data = await axios(url, config)

    return data.data.allow_sync_sklad
})

export const $allow_sync_sklad = createStore<boolean>(false)
    .on(setAllowSyncSklad.done, (_, { result }) => result)


export const getProducts = createEffect(async ({ acces, category, saleDot }: { acces: string, category: any, saleDot: any }) => {
    const config = API.configs.get(acces)
    let urls: any[]
    let Allcategories: string


    if (typeof category !== 'string') {
        const caters = splitArr(category.map((cat: any) => `pathName=${cat.category.folder_name};`), category.length < 11 ? 1 : 5).map(spl => spl.join(''))

        urls = caters
        Allcategories = category.map((cat: any) => `pathName=${cat.category.folder_name};`).join('')
    }
    else {
        urls = ['pathName=' + category]
        Allcategories = 'pathName=' + category
    }

    if (cashedCategory[Allcategories]) return cashedCategory[Allcategories]

    const result = []

    const data = await axios.get(`${API.path}partner_grill/get_products/dd75ccb6-5f63-11ed-0a80-062400103edd`, config)
    let beetweenArr = []

    for (let i = 0; i < data.data.length; i++) {
        const product: IProduct = data.data[i].item_info

        product.buyPrice.value /= 100

        beetweenArr.push(product)


        if (beetweenArr.length === 2) {
            result.push(beetweenArr)
            beetweenArr = []
        }
        else if (beetweenArr.length === 1 && i === data.data.length - 1) {
            result.push([product, null])
        }
    }


    cashedCategory[Allcategories] = result
    return result
})



export const $products = createStore<IProduct[] | null>(null)
    .on(getProducts.done, (state, { result }) => result)