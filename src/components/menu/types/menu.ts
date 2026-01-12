export interface MenuItem{
    id: number;
    name: string;
    description: string;
    price: number;
};

export interface MenuSection{
    id: number,
    title: string,
    items: MenuItem[];
}