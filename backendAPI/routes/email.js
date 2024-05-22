import express from 'express';
import nodemailer from 'nodemailer';

const emailSenderRouter = express.Router();

// Transporter Service that allows us to connect to SMTP services from email providers to send emails thru their servers
const transporter = nodemailer.createTransport(
    {
        service: process.env.SERVICE_EMAIL_HOST,
        auth: {
            user: process.env.SERVICE_EMAIL,
            pass: process.env.SERVICE_EMAIL_PASS
        },
        secure: true
    }
);

emailSenderRouter.get('/', async (request, response) => {
    response
        .status(200)
        .send('Hello, this is email endpoint!')
});

emailSenderRouter.post('/sendUpdatedQuoteInfo', async (request, response) => {
    const {quoteInfo, custInfo} = request.body;

    console.log('Hello!!! POST reached??')

    let status = 'In Review'
    if(quoteInfo.is_sanctioned) 
        status = 'Sanctioned';
    else if (quoteInfo.is_finalized)
        status = 'Finalized';

    let htmlLineItems = '';
    quoteInfo.line_items.line_items.forEach((lineitem) => {
        htmlLineItems += `<p>Description: ${lineitem.description} ===> Price: ${lineitem.price}</p>\n`;
    });

    let htmlDiscounts = '';
    quoteInfo.discounts.discounts.forEach((discount) => {
        let textInfo = '';
        if(discount.type === 'amount')
            textInfo = `<p>Discount: $${discount.value} </p>\n`;
        else
            textInfo = `<p>Discount: ${discount.value}% </p>\n`;

        htmlDiscounts += textInfo;
    });

    const htmlMsg = `
        <h2> Your quote with Greenhouse Services has been updated! </h2>
        <p> Hello, ${custInfo.name}. Thank you for your continued use of our plant repair services. </p>
        <p> You are recieving this information because an employee/sales associate of ours have modified some of your quote information for quote ID:
            <b> ${quoteInfo.id} </b>
        <p>
        <br>
        <p> Here is the new updated information of your quote. </p>
        <p> <b> Status: </b> ${status} </p>
        <p> <b> Line Items: </b> </p>
        ${htmlLineItems}
        <br>
        <p> <b> Discounts: </b> </p>
        ${htmlDiscounts}
        <br>
        <p> <b> Total Price: </b>  $${quoteInfo.price} </p>
        <br>
        <hr>
        <p> If you have any questions or concerns with your new quote information, please contact us thorugh the sales associate you spoke with previously! </p>
    `

    // Sending html instead of plain text as we can customize how message looks with html
    const mailData = {
        from: process.env.SERVICE_EMAIL,
        to: quoteInfo.cust_email,
        subject: 'Update to Quote Information - Greenhouse Services',
        html: htmlMsg
    }

    // send the email through the transporter!
    transporter.sendMail(mailData, (error, info) => {
        if(error) {
            console.log('Error when sending email:', error);
            response
                .status(400)
                .send({
                    message: `Request Error: ${error.message}`,
                    message_id: error.responseCode
                });
            return;
        }

        response
            .status(200)
            .send({
                message: 'Email sent successfully!',
                message_id: info.messageId
            })
    });
});


export default emailSenderRouter;