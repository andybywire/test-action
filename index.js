const core = require('@actions/core');
const github = require('@actions/github');

const sanityClient = require('@sanity/client');
const client = sanityClient({
  projectId: "4g5tw1k0",
  dataset: "production",
  apiVersion: '2021-03-25',
  useCdn: false, // `false` ensures fresh data
  withCredentials: false
});


try {

  const query = '*[_type == "method"'
  client.fetch(query).then((methodData) => {
    console.log(JSON.stringify(methodData, null, 2))
  })

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
