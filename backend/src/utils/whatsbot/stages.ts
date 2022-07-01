import { storage } from './storage';
import initialStage from './stages/initialStage'
import stageOne from './stages/stageOne';
import {Whatsapp} from "venom-bot"
import stageTwo from './stages/stageTwo';
 
interface parameters {
    from: string
    message?: string
    client?: Whatsapp

}

export const stages = [
    {
        descricao: 'Welcome',
        stage: initialStage,
    },
    {
        descricao: "Menu",
        stage: stageOne
    }, {
        descricao: "Address",
        stage: stageTwo
    }
  ]

export function getStage({ from }: parameters)  {
    if (storage[from]) {
        const {stage, hasMedia} = storage[from]
        return stage
    }
    storage[from] = {
        stage: 0,
        itens: [],
        address: '',
        hasMedia: true
    }
  
    const {stage} = storage[from]
    return stage
}

export function getMediaStatus(from: string){
    if (storage[from]) {
        const { hasMedia} = storage[from]
        return hasMedia
    }
}