//npm i nodemailer
const nodemailer =  require('nodemailer');

const htmlTotext  = require('html-to-text');

//new Email(user, url).sendWelcome();
module.exports = class Email {
    constructor(user, url){
       this.to = user.email;
       //this.firstName = user.name.split(' ')[0];
       this.firstName = user.firstName;
       this.url = url;
       this.from =  `Salim Hassan <${process.env.EMAIL_FROM}>` ;
    }

    newTransport(){
        if(process.env.NODE_ENV === 'production'){
            //Sendgrid
             console.log("Hello from gride");
            return nodemailer.createTransport({
                service:"Sendgrid",
                auth:{
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }

        //1)Create a transporter
    return nodemailer.createTransport({
        // service: 'Gmail',
         host: process.env.EMAIL_HOST,
         port: process.env.EMAIL_PORT,
         auth: {
             user: process.env.EMAIL_USERNAME,
             pass: process.env.EMAIL_PASSWORD
         }
     });
    }
     
     //Send the actual mail
    async send(template, subject){
       
        //1)Render HTML based on a pug template
        let html='';
        if(template==="welcome"){
            html = `<div className="email" style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
       
            <p>Hi ${this.firstName}</p>
            <p>Welcome to Travicio, we're glad to have you 🙏🏼</p>
            <p>We're all a big family here, so make sure to create your profile so we get to know you a bit better! </p>
            <a href=${this.url} style=" text-decoration:none; padding: 1rem;margin:1rem 3rem; background-color:rgb(9, 94, 116); color: white;" 
            onmouseover="this.style.cursor=pointer;this.style.background-color=rgb(63, 154, 177);">Create your profile</a>
            <p>All the best, Salim</p>
            </div>`
        }
        else if(template==="passwordReset"){
            html = `<div className="email" style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 2; font-size: 20px;">
       
            <p>Hi ${this.firstName}</p>
            <p>Forget your password? Submit a PATCH request with new password and passwordConfirm to:${this.url} </p>

            <a href=${this.url} style=" text-decoration:none; padding: 1rem;margin:1rem 3rem; background-color:rgb(9, 94, 116); color: white;" 
            onmouseover="this.style.cursor=pointer;this.style.background-color=rgb(63, 154, 177);">Reset your password</a>
            <p>If you didn't forgot your password, please ignore this email!</p>
            </div>`
        }
        //2)Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: html
            
        };

        //3)Create a transport and send email
        await this.newTransport().sendMail(mailOptions);

    }


    async sendWelcome() {
       await this.send('welcome', 'welcome to the Travicio Family');
    }

    async sendPasswordReset(){
        await this.send('passwordReset', 'Your password reset token (valide only 10 minutes');
    }
};





