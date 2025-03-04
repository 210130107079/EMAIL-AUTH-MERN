import { mailtrapClient, sender } from '../mailtrap/mailTrapConfig.js'
import { VERIFICATION_EMAIL_TEMPLATE , PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE } from '../mailtrap/emailTemplate.js'

export const sendVerificationEmail = async (email ,verificationToken) => {
    const recipient = [{email}]

    try
    {
        const response = await mailtrapClient.send({
            from : sender,
            to : recipient,
            subject:"Verify Your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification"
        })

        console.log("Email Sent Successfully !",response);
    }
    catch(error)
    {
        console.log("Error Sending Verification Email !",error);
    }
}

export const sendWelcomeEmail = async (email,name) => {
     const recipient = [{ email }]

     try
     {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            template_uuid:"6cea22f1-8bd1-412f-b1a9-59c17c41b8c0",
            template_variables:{
                "name": name,
                "company_info_name": "EMAIL AUTH COMPANY",
                "company_info_address": "234",
                "company_info_city": "Vadodara",
                "company_info_zip_code": "390023",
                "company_info_country": "India"
            }
        })
        console.log("Welcome Email Sent Successfully !",response);
     }
     catch(error)
     {
        console.log("Error Sending Welcome Email !",error);
     }
}

export const sendPasswordResetEmail = async (email,resetURL) => {
    const recipient = [{ email }]

    try
    {
        const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Password Reset Request",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password Reset"
        })
        console.log(response);  
    }
    catch(error)
    {
        console.log("Error Sending Password Reset Email !",error);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }]

    try
    {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject:"Password Reset Successful",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })

        console.log("Reset Success Email Sent Successfully !",response);
    }
    catch(error)
    {
        console.log("Error Sending Reset Success Email !",error);
    }
}