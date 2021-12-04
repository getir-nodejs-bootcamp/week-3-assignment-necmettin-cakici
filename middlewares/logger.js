const moment = require("moment");
const { appendFile } = require("fs/promises");

// Loglama işlemini gerçekleştirecek fonksiyon:
const loggingFunction = async (req, res, next) => {
  const { url, method } = req;

  // İsteğin ne zaman yapıldığını
  const dateNow = moment().format("DD-MM-YYYY HH:mm:ss");
  // Loglanacak satırın gelen parametrelerle oluşturulması:
  let logLine = `*${dateNow}* --- ${url} --- ${method} requested.\n`;

  // Try-Catch bloguyla dosya varsa logLine ekleme
  // Yoksa dosyayı oluşturup logLine ekleme, hata durumunda error basma
  try {
    await appendFile(`${__dirname}\\..\\logs.txt`, logLine);
    console.log(`successfully logged`);
    next();
  } catch (error) {
    console.error("there was an error:", error.message);
  }
};

module.exports = { loggingFunction };
