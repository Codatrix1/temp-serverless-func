// domain/.netlify/functions/1-hello
// http://localhost:8888/.netlify/functions/1-hello
// exports.handler = async (req, res, callback) => {
// const person = { name: "john" };

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: "Netlify Serverless Function",
  };
};
