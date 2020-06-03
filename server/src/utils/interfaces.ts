export interface Item {
    title:string,
    image:string,
    id: Number
};
export interface PointRequest{
    name: string,
    email: string,
    whatsapp: string,
    latitude: string,
    longitude: string,
    city: string,
    uf: string,
    items: [Number]
}