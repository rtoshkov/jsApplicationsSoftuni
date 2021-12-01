import * as api2 from './api.js';

const pageSize = 4
const endpoint = {
    'allFurniture' : '/data/catalog/',
    'furnitureByFour':  (offset) => `/data/catalog?offset=${offset}&pageSize=${pageSize}`,
    'availablePages':  '/data/catalog?count'
}

function calculateOffset(pageNumber = 1){
    return (pageNumber -1) * pageSize;
}

export async function getAllFurniture(){
    return api2.get(endpoint.allFurniture);
}

export async function paginationFurniture(page){
    return api2.get(endpoint.furnitureByFour(calculateOffset(page)));
}

export async function NumberOfPages(){
    const records = await api2.get(endpoint.availablePages);
    return Math.ceil(records/pageSize);
}