const core = require('@actions/core');
const github = require('@actions/github');

try {

  async function fetchSanityData() {
    const query = "https://4g5tw1k0.api.sanity.io/v2021-03-25/data/query/production?query=*%5B_type%20%3D%3D%20%24type%5D%7B%0A%20%20title%2C%0A%20%20_id%2C%0A%20%20%22methodId%22%3A%20slug.current%2C%0A%20%20%22inputs%22%3A%20transputReference.inputsReference%5B%5D-%3E%7B%0A%20%20%20%20prefLabel%2C%0A%20%20%20%20%22inputId%22%3A%20conceptId.current%0A%20%20%7D%2C%0A%20%20%22outputs%22%3A%20transputReference.outputReference%5B%5D-%3E%7B%0A%20%20%20%20prefLabel%2C%0A%20%20%20%20%22outputId%22%3A%20conceptId.current%0A%20%20%7D%0A%7D&%24broader=%22transputTaxonomy_Recommendation%22&%24pageSlug=%22card-sorting%22&%24type=%22method%22"
    const response = await fetch(query);
    const groqQuery = await response.json();
    console.log(groqQuery);
  }
  fetchSanityData();

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
