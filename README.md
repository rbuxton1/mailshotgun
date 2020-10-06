# Mail Shot Gun
The purpose of this project was to create a system to easily send mass emails through MailGun that would work in any situation.
## Configuration
You will need to update your `config.json` with the correct configuration for your MailGun environment.
You will need to provide two files, the HTML file that the script will be sending and a JSON array of emails. Examples of both of these are provided in the `test` folder.
## Usage 
`node index.js --subject="Your Subject" --dest="./test/test-targets.json" --html="./test/test.html"`. There is a `--verbose`, otherwise the project follows the silence is golden ideology.
