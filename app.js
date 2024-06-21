const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
// console.log("hi");
const app = express();
const mmToPoints = (mm) => (mm / 25.4) * 72;

const width = mmToPoints(50); 
const height = mmToPoints(25); 
app.use(bodyParser.urlencoded({extended:false}));
app.post('/hi',(req,res,next)=>{
    const real = req.body.real;
    const discounted = req.body.discounted;
    const doc = new PDFDocument({
        size: [width, height], // [width, height] in points
    });

    // Set the response headers to indicate a PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="output.pdf"');

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add some content to the PDF
    // doc.fontSize(30).text('Hello World!',);
    const X = (width/2);
    const Y = (height/2);
doc.fontSize(12).text("DISCOUNT!!",70,5);
// 141.73 , 56.69
doc.fontSize(30).text(real,73,20);
doc.moveTo(X,Y-3).lineTo(135,30).stroke();
    // Finalize the PDF and end the stream
    doc.end();
    });
app.use('/',(req,res,next)=>{
console.log("In the next middleware");
res.sendFile(path.join(__dirname,'views','hi.html'));
});

app.listen(4002);