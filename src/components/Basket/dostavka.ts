import { IProduct } from '../../types/types';

export const DostavkaObject = {
            meta: {
                "href": "https://online.moysklad.ru/api/remap/1.2/entity/service/47dc383b-6bb3-11eb-0a80-09e20010ae54",
                "metadataHref": "https://online.moysklad.ru/api/remap/1.2/entity/product/metadata",
                "type": "service",
                "mediaType": "application/json",
                "uuidHref": "https://online.moysklad.ru/app/#good/edit?id=47dc3209-6bb3-11eb-0a80-09e20010ae52"
            },
            id: "47dc383b-6bb3-11eb-0a80-09e20010ae54",
            accountId: "7d408f60-5980-11e9-9109-f8fc0000577b",
            owner: {
                meta: {
                    href: "https://online.moysklad.ru/api/remap/1.2/entity/employee/b0fa502f-6478-11e9-912f-f3d40012a749",
                    metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/employee/metadata",
                    type: "employee",
                    mediaType: "application/json",
                    uuidHref: "https://online.moysklad.ru/app/#employee/edit?id=b0fa502f-6478-11e9-912f-f3d40012a749"
                }
            },
            shared: true,
            group: {
                meta: {
                    "href": "https://online.moysklad.ru/api/remap/1.2/entity/group/7d40e9f0-5980-11e9-9109-f8fc0000577c",
                    "metadataHref": "https://online.moysklad.ru/api/remap/1.2/entity/group/metadata",
                    "type": "group",
                    "mediaType": "application/json"
                }
            },
            updated: "2022-12-02 11:01:33.200",
            name: "Доставка",
            description: "Доставка для заказов менее 5000 р",
            code: "219",
            externalCode: "7E54qN9-hw7N5iylB9O9D1",
            archived: false,
            pathName: "",
            useParentVat: true,
            taxSystem: "SIMPLIFIED_TAX_SYSTEM_INCOME_OUTCOME",
            uom: {
                meta: {
                    href: "https://online.moysklad.ru/api/remap/1.2/entity/uom/19f1edc0-fc42-4001-94cb-c9ec9c62ec10",
                    metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/uom/metadata",
                    type: "uom",
                    mediaType: "application/json"
                }
            },
            minPrice: {
                value: 0.0,
                currency: {
                    meta: {
                        href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                        metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                        type: "currency",
                        mediaType: "application/json",
                        uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                    }
                }
            },
            salePrices: [
                {
                    value: 0.0,
                    currency: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                            metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                            type: "currency",
                            mediaType: "application/json",
                            uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                        }
                    },
                    priceType: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/678ac222-65f0-11e9-9109-f8fc000abd73",
                            type: "pricetype",
                            mediaType: "application/json"
                        },
                        id: "678ac222-65f0-11e9-9109-f8fc000abd73",
                        name: "25%",
                        externalCode: "1d34d0c2-4132-477f-aed5-7420ebe48a52"
                    }
                },
                {
                    value: 0.0,
                    currency: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                            metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                            type: "currency",
                            mediaType: "application/json",
                            uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                        }
                    },
                    priceType: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/19735de9-a8d2-11e9-9107-5048000aee8f",
                            type: "pricetype",
                            mediaType: "application/json"
                        },
                        id: "19735de9-a8d2-11e9-9107-5048000aee8f",
                        name: "20%",
                        externalCode: "252728a5-94d6-4059-8682-6778f9aa9ce6"
                    }
                },
                {
                    value: 0.0,
                    currency: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                            metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                            type: "currency",
                            mediaType: "application/json",
                            uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                        }
                    },
                    priceType: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/8dc4cf03-d8c2-11e9-0a80-01d1000d5510",
                            type: "pricetype",
                            mediaType: "application/json"
                        },
                        id: "8dc4cf03-d8c2-11e9-0a80-01d1000d5510",
                        name: "15%",
                        externalCode: "598c063d-1b19-4c4c-a859-f52e5ae1a875"
                    }
                },
                {
                    value: 0.0,
                    currency: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                            metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                            type: "currency",
                            mediaType: "application/json",
                            uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                        }
                    },
                    priceType: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/716892e2-8a68-11ec-0a80-0e78000c530b",
                            type: "pricetype",
                            mediaType: "application/json"
                        },
                        id: "716892e2-8a68-11ec-0a80-0e78000c530b",
                        name: "10%",
                        externalCode: "dccfa877-ed6f-4977-9381-80e418a0b46e"
                    }
                },
                {
                    value: 0.0,
                    currency: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                            metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                            type: "currency",
                            mediaType: "application/json",
                            uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                        }
                    },
                    priceType: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/78120c62-5830-11eb-0a80-050f003e9f97",
                            type: "pricetype",
                            mediaType: "application/json"
                        },
                        id: "78120c62-5830-11eb-0a80-050f003e9f97",
                        name: "33%",
                        externalCode: "450bb0db-6dbc-4eb7-b268-f4fc29bed4d1"
                    }
                },
                {
                    value: 0.0,
                    currency: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                            metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                            type: "currency",
                            mediaType: "application/json",
                            uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                        }
                    },
                    priceType: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/7168947f-8a68-11ec-0a80-0e78000c530c",
                            type: "pricetype",
                            mediaType: "application/json"
                        },
                        id: "7168947f-8a68-11ec-0a80-0e78000c530c",
                        name: "7%",
                        externalCode: "c1459375-e931-4899-aa7f-c5ee7e06b56a"
                    }
                },
                {
                    value: 35000.0,
                    currency: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                            metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                            type: "currency",
                            mediaType: "application/json",
                            uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                        }
                    },
                    priceType: {
                        meta: {
                            href: "https://online.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/7d6e7269-5980-11e9-9107-504800096a2e",
                            type: "pricetype",
                            mediaType: "application/json"
                        },
                        id: "7d6e7269-5980-11e9-9107-504800096a2e",
                        name: "Индивидуальная цена",
                        externalCode: "cbcf493b-55bc-11d9-848a-00112f43529a"
                    }
                }
            ],
            buyPrice: {
                value: 0.0,
                currency: {
                    meta: {
                        href: "https://online.moysklad.ru/api/remap/1.2/entity/currency/7d6c0504-5980-11e9-9107-504800096a2d",
                        metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/currency/metadata",
                        type: "currency",
                        mediaType: "application/json",
                        uuidHref: "https://online.moysklad.ru/app/#currency/edit?id=7d6c0504-5980-11e9-9107-504800096a2d"
                    }
                }
            },
            barcodes: [
                {
                    ean13: "2000000002521"
                }
            ],
            paymentItemType: "SERVICE",
            discountProhibited: false,
            files: {
                meta: {
                    href: "https://online.moysklad.ru/api/remap/1.2/entity/service/47dc383b-6bb3-11eb-0a80-09e20010ae54/files",
                    type: "files",
                    mediaType: "application/json",
                    size: 0,
                    limit: 1000,
                    offset: 0
                }
            }
        }