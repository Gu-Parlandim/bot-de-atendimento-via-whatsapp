import {create, Whatsapp, Message} from "venom-bot"
import path from "path"
import { stages, getStage, getMediaStatus } from "./stages"
//import mime from "mime-types"

class Sender {
    private client!: Whatsapp

    constructor(){
        this.initialize()
    }

    public async sendText(to: string, message: string){
       await this.client.sendText(to, message)
       .catch(err => console.log("error: ", err))
    }

    private async sendImage(from: string, diretory: string, message: string){
        
        await this.client.sendImage(from, diretory, "logo.jpg", message)
            .then((result) => {
                //console.log('Result: ', result); 
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); 
            })
    }


    private initialize(){

        const startBot = (client: Whatsapp) => {
            this.client = client

            this.client.onMessage(async (message) => {
                const {from} = message
                const isValidNumber = await client.checkNumberStatus(from)

                if(!message.isGroupMsg && isValidNumber) {
                    try{
                        const currentStage = getStage({ from })
                       
                        if(!currentStage && currentStage !== 0) throw Error("message")

                        const messageResponse = stages[currentStage].stage.exec({
                            from:from,
                            message: message.body,
                            client,
                        })

                        const hasMedia = getMediaStatus(from)

                        if (messageResponse) {
                            if(hasMedia){
                                const [diretory, resMessage] = messageResponse
                                await this.sendImage(from, diretory, resMessage)
                            }else{
                                const [resMessage] = messageResponse
                                await client.sendText(from, resMessage)
                            }
                        }
                    }
                    catch(error){
                        console.error(error)
                    }
                }
            })
        }

        create({
            session: 'whatsappbot',
            multidevice: true,
        })
          .then((client) => startBot(client))
          .catch((erro) => {console.log(erro)})
    }
}

export default Sender