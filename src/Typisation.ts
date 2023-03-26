export type ShoppingListPropsType = {
    title: string
    goods: GoodsType[]
    addGoods: (title: string) => void
    changeFilterValue: (filter: FilterValue) => void
    deleteGoods: (goodsId: string) => void
    changeGoodsStatus: (goodsId: string, inChecked: boolean) => void
    filter: FilterValue
}
export type FilterValue = "All" | "Not to buy" | "Bought"

export type GoodsType = {
    id: string
    title: string
    expectedPrice: string
    realPrice: string
    inCart: boolean
}