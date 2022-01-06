// domain/.netlify/functions/1-hello
// http://localhost:8888/.netlify/functions/1-hello
// const person = { name: "john" };

exports.handler = async (event, context, cb) => {
  return {
    statusCode: 200,
    body: "Our First Netlify Function Example",
  };
};
