import { Request, Response} from 'express'
import { getRepository, Index } from 'typeorm'
import Products from '../models/Products'
import productsView from '../views/productsView';
import * as Yup from 'yup'

export default{
    async show(request: Request, response: Response){
        const { id } = request.params;
        const productsRepository = getRepository(Products);

        const product = await productsRepository.findOneOrFail(id, {
            relations: ['images']
        })
        return response.json(productsView.render(product))
    },

    async index(request: Request, response: Response){
        const productsRepository = getRepository(Products);

        const products = await productsRepository.find({
            relations: ['images']
        })
        return response.json(productsView.renderMany(products))
    },

    async create(request: Request, response: Response){
        const {     
            name,
            type,
            price,
            description,
        } = request.body;

        const productsRepository = getRepository(Products);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image =>{
            return { path: image.filename }
        })

        const data = {
            name,
            type,
            price,
            description,
            images
        }
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            type: Yup.string().required(),
            price: Yup.number().required(),
            description: Yup.string().required().max(300),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })
        await schema.validate(data, {
            abortEarly: false,
        })

        const product = productsRepository.create(data);

        await productsRepository.save(product);

        return response.status(201).json(product); 
    }
}