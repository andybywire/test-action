const core = require('@actions/core');
const github = require('@actions/github');

try {

  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
  const sanityData = core.getInput('sanity-data');
  const sanityDataOutput = JSON.stringify(sanityData, null, 2);
  console.log(`Here is that data again ${sanityDataOutput}`);

  const fs = require('fs');
  const data = "This is the new content of the file.";
  fs.writeFile('createdFile.txt', data, (err) => {
      if(err) {
          throw err;
      }
      console.log("Data has been written to file successfully.");
  });

} catch (error) {
  core.setFailed(error.message);
}
