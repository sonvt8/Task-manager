const sendgridAPIKey = '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'
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'thaison.millionaire@gmail.com',
    from: 'thaison.millionaire@gmail.com',
    subject: 'This is my first creation!',
    text: 'Hope it work!'
})