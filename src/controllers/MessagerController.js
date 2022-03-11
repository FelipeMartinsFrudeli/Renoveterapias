
import { parsePhoneNumber } from "libphonenumber-js";
const venom = require('venom-bot');

var clientG = false;

class MessagerController {
    constructor() {
        this.client = {};
    }

    async initialize(req, res) {
        venom.create(
            'Comercial',
            undefined,
            (statusSession, session) => {
                console.log('Status Session: ', statusSession);
                //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
                //Create session wss return "serverClose" case server for close
                console.log('Session name: ', session);
            },
            {
                multidevice: false,
                autoClose: 50000,
            }
        )
        .then((client) => {
            clientG = client;

            client.onMessage((message) => {
                if (message.body === '.' && message.isGroupMsg === false ) {
                client
                    .sendText(message.from, Math.random(1,999).toString())
                    .then((result) => {
                        console.log('Result: ', result);
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro);
                    });
                }
            });

            return res.status(200).json({message:"connected in server"})
        })
        .catch((erro) => {
            console.log(erro);
            return res.status(200).json({message:"connection failed"})
        });
    }

    async closeServer(req, res) {
        if(clientG) {
            clientG.close();
            clientG = false;
            return res.status(400).json({message:"Server successfully closed!"})
        } else {
            return res.status(400).json({message:"Error to connect or disconnected!"})
        }
    }

    async SendMessage(req, res) {
        if (clientG) {

            let client = clientG;

            let message = 'Pedido de compra: '
            const listAddress = [
                {
                  title: "Meus endereços",
                  rows: [
                    {
                      title: "Endereço cadastrado:",
                      description: "Nome: Nome teste,     Rua: Rua teste,     Estado: São paulo,     Numero: 123",
                    },
                  ]
                }
            ];
            
            //console.log(client.getAllChatsGroups()) 8555141

            const userPhoneNumber = `${parsePhoneNumber('15998555141', "BR").format("E.164").split('+')[1]}@c.us`

            // sendText
            client.sendListMenu(
                userPhoneNumber,
                'Meu carrinho de compras:',
                'subTitle', 'Total: R$20.00                     Clique em "endereços" para confirmar seu endereço!',
                'endereços', listAddress)
                    .then(() => {
                        client.sendText(userPhoneNumber, 'Obrigado por sua preferência! Logo entraremos em contato para efetuar a sua compra.')
                            .catch((err) => {
                                console.log(err)
                                return res.status(400).json({message:"Error to send message!"})
                            })
                        return res.status(200).json({message:"Message sent successfully!"})
                    })
                    .catch((err) => {
                        console.log(err)
                        return res.status(400).json({message:"Error to send message!"})
                    })

        } else {
            return res.status(400).json({message:"Error to connect or disconnected!"})
        }
    }
}

export default new MessagerController();