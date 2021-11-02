const core = require('@actions/core');
const github = require('@actions/github');

try {
  fetch('https://4g5tw1k0.api.sanity.io/v2021-03-25/data/query/production?query=*[0]')
  .then(response => response.json())
  .then(data => console.log(data));

  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
