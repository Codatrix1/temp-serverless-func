require("dotenv").config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE_ID)
  .table("products");

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      const product = await airtable.retrieve(id);
      const singleProduct = product.fields;
      const finalProduct = { id, ...singleProduct };
      if (finalProduct.error) {
        return {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }

      // const productFinal = { id, ...product };
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(finalProduct),
      };
    } catch (error) {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 500,
        body: `Server Error`,
      };
    }
  }

  try {
    const { records } = await airtable.list();
    const products = records.map((product) => {
      const { id } = product;
      const {
        name,
        price,
        images,
        colors,
        description,
        company,
        category,
        shipping,
        stock,
        stars,
        reviews,
        featured,
      } = product.fields;

      const image = images[0].url;
      return {
        id,
        name,
        price,
        image,
        colors,
        description,
        company,
        category,
        shipping,
        stock,
        stars,
        reviews,
        featured,
      };
    });
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 500,
      body: "Server Error",
    };
  }
};
