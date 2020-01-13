import nodemailer from 'nodemailer';
import HandleBars from 'handlebars';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const mailer = {
	transport(){
		const { MAIL_PORT, MAIL_SENDER, NODE_ENV, GMAIL_USER, GMAIL_PASS } = process.env;
		
		if(NODE_ENV == 'production'){
			// use Ethereal SMTP Platform to send emails -> check ethereal.email
			return {
				service: 'gmail',
				auth: {
					user: GMAIL_USER,
					pass: GMAIL_PASS
				}
			};
		}
		else{ 
			// use maildev in development
			return {
				port: MAIL_PORT,
				ignoreTLS: true,
			};
		}
	},

	async sendActivationEmail({ email, full_name }){
		const { MAIL_SENDER, SECRET, APP_ROOT } = process.env;
		
		const client = nodemailer.createTransport(this.transport());

		const source = fs.readFileSync(path.join(__dirname, '../templates/mail_activation.hjs'), 'utf8');
		const template = HandleBars.compile(source);
		const uToken = await jwt.sign({ email }, SECRET);
		const url = `${APP_ROOT}/api/auth/activation/${uToken}`;

		const envelope = {
			from: MAIL_SENDER,
			to: email,
			subject: 'Account Activation',
			html: template({ full_name, url})
		};

		try {
			return await client.sendMail(envelope);
		}
		catch(error) {
			return {
				status : 500,
				error
			};
		}
	},

	async sendActivationEmailToEmployee({ email, full_name, password }){
		const { MAIL_SENDER, SECRET, APP_ROOT } = process.env;
		
		const client = nodemailer.createTransport(this.transport());

		const source = fs.readFileSync(path.join(__dirname, '../templates/employee_activation.hjs'), 'utf8');
		const template = HandleBars.compile(source);
		const uToken = await jwt.sign({ email }, SECRET);
		const url = `${APP_ROOT}/api/auth/activation/${uToken}`;

		const envelope = {
			from: MAIL_SENDER,
			to: email,
			subject: 'Awesomity Activation Invite',
			html: template({ full_name, url, password })
		};

		try {
			return await client.sendMail(envelope);
		}
		catch(error) {
			return {
				status : 500,
				error
			};
		}
	},

	async sendResetEmail({ email }){
		const { MAIL_SENDER , APP_ROOT, SECRET } = process.env;
		
		const client = nodemailer.createTransport(this.transport());

		const source = fs.readFileSync(path.join(__dirname, '../templates/reset_email.hjs'), 'utf8');
		const template = HandleBars.compile(source);
		const uToken = await jwt.sign({ email }, SECRET, { expiresIn: 3600 }); // expires in an hour
		const url = `${APP_ROOT}/api/auth/reset/${uToken}`;

		const envelope = {
			from: MAIL_SENDER,
			to: email,
			subject: 'Password Reset',
			html: template({ url })
		};

		try {
			return await client.sendMail(envelope);
		}
		catch(error) {
			return {
				status : 500,
				error
			};
		}
	}


}

export default mailer;