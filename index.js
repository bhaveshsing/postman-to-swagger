// Require Package
const postmanToOpenApi = require('postman-to-openapi')
const fileUpload = require('express-fileupload')
const express = require('express')
const app = express()

// default options
app.use(fileUpload())

// Postman Collection Path
const postmanCollection = './postman_collection.json'
// Output OpenAPI Path
const outputFile = './collection.yml'

app.post('/convert-swagger-to-postman', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.')
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const postmanFile = req.files.swagger

    // Use the mv() method to place the file somewhere on your server
    await postmanFile.mv('./postman_collection.json', async (err) => {
      if (err) {
        return res.status(500).send(err)
      }

      const swaggerDoc = await postmanToOpenApi(postmanCollection, outputFile, {
        defaultTag: 'General',
      })
      if (!swaggerDoc) {
        return res.status(500).send({
          status: 500,
          data: error,
          message: 'Something went wrong',
        })
      }
      return res.status(200).send(swaggerDoc)
    })
  } catch (error) {
    return res.status(500).send({
      status: 500,
      data: error,
      message: 'Something went wrong',
    })
  }
})

const port = 3456;
app.listen(port, () => {
  console.log('Listening at http://localhost:%s', port)
})
