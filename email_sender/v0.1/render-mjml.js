module.exports = function (mjml) {
  const MjmlClient = require('./services/mjml-api');
  const client = new MjmlClient(process.env.MJML_APPLICATION_ID, process.env.MJML_SECRET_KEY);

  return new Promise((resolve, reject) => {
    client.render(mjml).then(data => {
      if (data.errors.length) {
        data.errors.message = 'Errors in your MJML:';
        reject(data.errors);
      }
      resolve(data.html);
    }, clientError => {
      reject(clientError.body);
    });
  });
};
