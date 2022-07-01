import { storage } from '../storage';
import {Whatsapp} from "venom-bot"
import path from 'path'


interface parameters {
    from: string
    message?: string
    client?: Whatsapp
}

export default {
  exec({ from }: parameters) : Array<string> {
    storage[from].stage = 1
    storage[from].hasMedia = true

    const diretory = path.resolve("src", "utils", "whatsbot", "images", "burger-logo.jpg")

    const message = '👋 Olá, como vai? \n\nEu sou o *assistente virtual* do BurgerGrill. \n*Posso te ajudar?* 🙋‍♂️ \n-----------------------------------\n1️⃣ - ```FAZER PEDIDO``` \n2️⃣ - ```VERIFICAR TAXA DE ENTREGA```\n0️⃣ - ```FALAR COM ATENDENTE```'

    return [diretory, message]
  },
}