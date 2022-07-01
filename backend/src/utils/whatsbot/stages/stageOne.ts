import { storage } from '../storage';
import {Whatsapp} from "venom-bot"
import path from 'path'


interface parameters {
    from: string
    message?: string
    client?: Whatsapp
}

export default {
    exec({  from, message, client }: parameters) : Array<string> {
        if(message === "1"){
            const message = '🍔  CARDÁPIO  🌭 \n\n*Exemplo de pedido:* \n\nDigite Pedir, em seguida o nome do lanche e por ultimo a quantidade \n\n*Pedir Hambuger 2* \n\n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'

            const diretory = path.resolve("src", "utils", "whatsbot", "images", "menu.jpg")
            storage[from].stage = 2
            return [diretory, message]
        }
        else if (message === '0') {
            client?.markUnseenMessage(from)
            storage[from].stage = 5
            const message = '🔃 Encaminhando você para um atendente. \n⏳ *Aguarde um instante*.'
            storage[from].hasMedia = false
            return [message]
        }
         
        storage[from].hasMedia = false
        const resMessage = '❌ *Digite uma opção válida, por favor.* \n⚠️ ```APENAS UMA OPÇÃO POR VEZ``` ⚠️'
        return [resMessage]
    }
}