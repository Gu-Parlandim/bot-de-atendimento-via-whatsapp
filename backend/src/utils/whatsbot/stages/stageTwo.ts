import { storage } from '../storage';
import {Whatsapp} from "venom-bot"
import menu from "../menu"



interface parameters {
    from: string
    message?: string
    client?: Whatsapp
}

export default {
    exec({  from, message, client }: parameters) : Array<string> {
        storage[from].hasMedia = false

        const order =
        '\n-----------------------------------\n#️⃣ - ```FINALIZAR pedido``` \n*️⃣ - ```CANCELAR pedido```'

        const [,name, amount] = message?.split(" ")
        console.log("name: ", name)

        if (message === '*') {
            storage[from].stage = 0
            storage[from].itens = []
           
            const message = '🔴 Pedido *CANCELADO* com sucesso. \n\n ```Volte Sempre!```'
            return [message]
        }
        else if (message === '#') {
            storage[from].stage = 3

            const message =  (
                '🗺️ Agora, informe o *ENDEREÇO*. \n ( ```Rua, Número, Bairro``` ) \n\n ' +
                '\n-----------------------------------\n*️⃣ - ```CANCELAR pedido```'
              )
            return [message]
        }
        else {
            if (!menu[name]) {
                const resMessage = `❌ *Código inválido, digite novamente!* \n\n ${order}`
                return [resMessage]
            }
        }

        storage[from].itens?.push(menu[name])

        const resMessage =  (
            `✅ *${menu[name].description}* adicionado com sucesso! \n\n` +
            '```Digite outra opção```: \n\n' +
            `*Lista de pedidos*\n\n${""}` +
            order
          )

        return [resMessage]
    }
}