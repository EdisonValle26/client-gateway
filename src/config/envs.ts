import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars{
    PORT: number;
    PRODUCTS_MS_HOST: string;
    PRODUCTS_MS_PORT: number;
    //DATABASE_URL: string;
}


const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MS_HOST: joi.string().required(),
    PRODUCTS_MS_PORT: joi.number().required(),
    //DATABASE_URL: joi.string().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );

if( error )
    throw new Error(`Config validation error: ${ error.message }`);

const envsVars: EnvVars = value;


export const envs = {
    port: envsVars.PORT,
    producMsHost: envsVars.PRODUCTS_MS_HOST,
    productMsPort: envsVars.PRODUCTS_MS_PORT,
    //databaseUrl: envsVars.DATABASE_URL,
}