const nodemailer = require("nodemailer");

function tryCatchWrapper(endpointFn) {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
}

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

async function sendMail({ to, subject, html }) {
  const email = {
    from: "nodesidorenko@meta.ua",
    to,
    subject,
    html,
  };

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transport.sendMail(email);
}

module.exports = {
  tryCatchWrapper,
  HttpError,
  sendMail,
};
