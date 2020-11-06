const sendgridAPIKey = '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'
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(sendgridAPIKey)

const  sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thaison.millionaire@gmail.com',
        subject: 'Welcome Mail!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const  sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'thaison.millionaire@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometinme soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}