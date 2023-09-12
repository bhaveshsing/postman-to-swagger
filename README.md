# postman-to-swagger

1. Clone repo.
2. Run npm install.
3. Run Server using “npm start”.
4. Go to the postman, export the collection which you need to convert in swagger.
5. Create a new POST request in postman and enter the URL “http://localhost:3456/convert-swagger-to-postman”.
6. Go to the body of the POST request, Select form-data and add the key “swagger”.
7. Select type of the key as file and select the already exported postman collection.
8. Hit the API and You will get the swagger of the postman collection in the Response.
9. Now You can copy the raw Response and use it.
10. If you want to copy any specific API, Go to https://editor.swagger.io/ and paste the raw response in the left side of the page.
11.  Hover over the API which you want to copy and click on ↵, it will redirect to the swagger of that API in left side of the page.
12. Now you can copy the Swagger API and use it.

## update Swagger configuration file

import path from 'path';
import { SWAGGER_URL } from '@config/secret';

const SwaggerDocument = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API for DaycareSOS',
      version: '1.0.0',
      description: 'This is the REST API for DaycareSOS',
    },
    host: `${SWAGGER_URL}`,
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [
      {
        bearerAuth: [] as string[],
      },
    ],
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  explorer: true,
  apis: [path.join(__dirname, '..', '..', 'swagger-doc', '*.yaml')],
};

export default SwaggerDocument;
