const {argv} = require("yargs");
const mailgun = require("mailgun-js");
const config = require("./config.json");
const fs = require("fs");
const mg = mailgun({apiKey: config.API_KEY, domain: config.DOMAIN});

if(argv.subject != undefined && argv.dest != undefined && argv.html != undefined){
  fs.readFile(argv.html, function(err, htmlData){
    if(argv.verbose != undefined){
      console.log("Read HTML:\n" + htmlData);
    }
    if(!err){
      try {
        var targets = require(argv.dest);
        targets.forEach((target, i) => {
          var mailData = {
            from: config.SOURCE_ADDRESS,
            to: target,
            subject: argv.subject,
            html: htmlData + ""
          }

          mg.messages().send(mailData, function(mailErr, body){
            if(argv.verbose != undefined) console.log("Email " + i + ":\n" + body);
            if(mailErr) console.error(mailErr);
          });
        });

      } catch (e) {
        console.log("Error reading target file!");
        console.error(e);
      }
    } else {
      console.log("Error reading HTML file!");
      console.error(err);
    }
  });
} else {
  console.log('Usage: --subject="[SUBJECT LINE]" --dest="[DESTINATION EMAIL JSON ARRAY]" --html="[HTML FILE TO SEND]"');
}
