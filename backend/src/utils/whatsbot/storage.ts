
interface Props {
    stage?: number
    itens?: Array<Object>
    address?:string
    hasMedia?: boolean 
}

interface Storage {
    [key: string]: Props
}

export const storage: Storage = {}
