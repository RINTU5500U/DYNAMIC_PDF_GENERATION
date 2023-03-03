const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
// const fs = require('fs')
const app = express();

app.use(bodyParser.json());

app.get('/generate-pdf', (req, res) => {
  const doc = new PDFDocument();
const { seller, sellerGstin, sellerAddress, buyer, buyerGstin, buyerAddress, items } = req.body

    // const filePath = './invoice.pdf';
    const fileName = 'invoice.pdf';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  doc.pipe(res);

  doc
    .fontSize(14)
    .text(`Seller: ${seller}`, 100)
    .moveDown()
    .fontSize(12)
    .text(sellerAddress)
    .fontSize(10)
    .text(`GSTIN: ${sellerGstin}`)
    .moveUp()
    .moveUp().moveUp().moveUp().moveUp().moveUp().moveDown()
    .fontSize(14)
    .text(`Buyer: ${buyer}`, 300)
    .moveDown()
    .fontSize(12)
    .text(buyerAddress)
    .fontSize(10)
    .text(`GSTIN: ${buyerGstin}`)
    .moveUp()
    .moveUp()

  doc
    .fontSize(12)
    .text('Item', 50, 200)
    .text('Quantity', 200, 200)
    .text('Rate', 300, 200)
    .text('Amount', 400, 200);

  items.forEach((item, index) => {
    doc
      .fontSize(10)
      .text(item.name, 50, 230 + index * 20)
      .text(item.quantity, 200, 230 + index * 20)
      .text(item.rate.toString(), 300, 230 + index * 20)
      .text(item.amount.toString(), 400, 230 + index * 20);
  });

  doc.end();
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
