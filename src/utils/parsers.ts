import { CategoryObject, ICategory, IProduct } from './../types/types';


// export const сategoriesParse = (arr: CategoryObject[]): ICategory[] => {
    // let categories: ICategory[] = [];

    // arr.forEach(obj => {
    //     categories.push(obj.category)

    //     if (obj.child) categories = categories.concat(сategoriesParse(obj.child))
    // })

    // return categories;
// }


export const findParentCategory = (categories: CategoryObject[], currentCategory: CategoryObject): CategoryObject | null => {
    for (const category of categories) {
        if (category.child) {
            const childFound = category.child.find(c => c === currentCategory);
            if (childFound) {
                return category;
            }
            const parent = findParentCategory(category.child, currentCategory);
            if (parent) {
                return parent;
            }
        }
    }
    return null;
}


export const getChildsFolders = (currentCategory: CategoryObject) => {
    if(currentCategory.child === null) return [currentCategory]
    let folders: CategoryObject[] = [];
    folders.push(currentCategory);
    if (currentCategory.child) {
        for (const child of currentCategory.child) {
            folders = folders.concat(getChildsFolders(child));
        }
    }

    
    folders.reverse()
    return folders
}


export const categoryNameParser = (name: string, padding: number) => name.split('/')[padding]


export const splitArr = (arr: any[], chunks: number) =>
[...Array(chunks)].map((_, c) => arr.filter((n, i) => i % chunks === c));


export const ProductGroupRow = (products: IProduct[]) => {
    const result: (IProduct | null)[][] = []
    
    for(let i = 0; i < products.length; i+=2) {
        if(products[i]) {
            if(products[i+1]) {
                result.push([products[i], products[i+1]])
            }
            else {
                result.push([products[i], null])
            }
        }
    }

    return result
}