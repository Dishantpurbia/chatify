const {resendclient,sender} = require(`../utils/util`);
const {createWelcomeEmailTemplate} = require(`./emailtemplates`);

const sendwellcomemail = async(name,email,clienturl) => {
    const {data,error} = await resendclient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "wellcome email",
        html : createWelcomeEmailTemplate(name,clienturl)
    });

    if(error){
        console.log(error);
        throw new Error("fail to send new error");
    }

    console.log("wellcoe email send successfully",data);
};

module.exports = {
    sendwellcomemail
}