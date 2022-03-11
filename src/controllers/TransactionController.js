import * as Yup from "yup";
import { parsePhoneNumber } from "libphonenumber-js";
import { cpf, cnpj } from "cpf-cnpj-validator";

import Transaction from "../models/Transaction";
import TransactionService from "../services/TransactionService";

class TransactionController {
    async index(req, res) {
        try {
            const transactions = await Transaction.find()
            return res.status(200).json(transactions)
        } catch (err) {
            console.log(err)
            return res.status(500).json({message:"Ocorreu algum erro no servidor. Tente novamente mais tarde!"})
        }
    }

    async show(req, res) {
        try {
            const { userEmail } = req.params; 
            const transactions = await Transaction.find({email:userEmail})
            return res.status(200).json(transactions)
        } catch (err) {
            console.log(err)
            return res.status(500).json({message:"Ocorreu algum erro no servidor. Tente novamente mais tarde!"})
        }
    }

    async create(req, res) {
        try {
            const {
                cartCode,
                paymentType,
                installments,
                customerEmail,
                customerName,
                customerMobile,
                customerDocument,
                billingAddress,
                billingNumber,
                billingNeighborhood,
                billingCity,
                billingState,
                billingZipCode,
                creditCardNumber,
                creditCardExpiration,
                creditCardHolderName,
                creditCardCvv
            } = req.body;

            const schema = Yup.object({
                cartCode: Yup.string().required(),
                paymentType: Yup.mixed().oneOf(["credit_card", "billet"]).required(),

                installments: Yup.number()
                    .min(1)
                    .when("paymentType", (paymentType, schema) => 
                        paymentType === "credit_card" ? schema.max(12) : schema.max(1)),

                customerName: Yup.string().required().min(3),
                customerEmail: Yup.string().required().email(),

                customerMobile: Yup.string().required().test(
                    "is-valid-mobile", "${path} is not a number", 
                    (value) => parsePhoneNumber(value, "BR").isValid()),

                customerDocument: Yup.string().required().test(
                    "is-valid-document", "${path} is not a valid CPF / CNPJ", 
                    (value) => cpf.isValid(value) || cnpj.isValid(value)),
                
                billingAddress: Yup.string().required(),
                billingNumber: Yup.string().required(),
                billingNeighborhood: Yup.string().required(),
                billingCity: Yup.string().required(),
                billingState: Yup.string().required(),
                billingZipCode: Yup.string().required(),

                creditCardNumber: Yup.string()
                    .when("paymentType", (paymentType, schema) =>
                    paymentType === "credit_card" ? schema.required() : schema),
                
                creditCardExpiration: Yup.string()
                    .when("paymentType", (paymentType, schema) =>
                    paymentType === "credit_card" ? schema.required() : schema),

                creditCardHolderName: Yup.string()
                    .when("paymentType", (paymentType, schema) =>
                    paymentType === "credit_card" ? schema.required() : schema),

                creditCardCvv: Yup.string()
                    .when("paymentType", (paymentType, schema) =>
                    paymentType === "credit_card" ? schema.required() : schema),
            });

            if(!(await schema.isValid(req.body))) {
                return res.status(400).json({message: "Erro ao inserir as informações. Tente novamente mais tarde!"})
            }
            
            const service = new TransactionService();
            const respose = await service.process(
                {
                    cartCode,
                    paymentType,
                    installments,
                    customer: {
                        email: customerEmail,
                        name: customerName,
                        mobile: parsePhoneNumber(customerMobile, "BR").format("E.164"),
                        document: customerDocument,
                    },
                    billing: {
                        address: billingAddress, 
                        number: billingNumber,
                        neighborhood: billingNeighborhood,
                        city: billingCity,
                        state: billingState,
                        zipcode: billingZipCode,
                    },
                    creditCard: {
                        number: creditCardNumber,
                        expiration: creditCardExpiration,
                        holderName: creditCardHolderName,
                        Cvv: creditCardCvv
                    }
                }
            );
            return res.status(200).json(respose);

        } catch (err) {
            console.log(err)
            return res.status(500).json({message:"Ocorreu algum erro no servidor. Tente novamente mais tarde!"})
        }
    }
}

export default new TransactionController();