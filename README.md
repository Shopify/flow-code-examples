# Flow Code Examples

This is the home of all the public examples for how to use Flow's Run code action. Feel free to look around! Do not edit these files directly.

## About the examples

The examples should be working code that can be used as a starting point for your own workflows.

Because the Run code action can be placed in any type of workflow and the data available to the action will vary depending on the type of workflow. For example, a workflow triggered by an Order event will have access to the Order data, but not the data for a specific Product. Each example is put into a folder that starts with the type of data that it requires (e.g., `Product`).

## Available files

Each example contains the following files:

- `input.graphql` - the GraphQL query that is used to fetch the data that is passed to the action.
- `output.graphql` - the GraphQL schema that tells Flow what data to expect from your code's return.
- `index.js` - the JavaScript code that is run by the action.

The example folder will also contain a `tests` folder that contains one or more tests for the example (see below).

## Testing your code

The examples provided contain tests than can be run locally to verify that your code is working as expected. These tests are not comprehensive and are intended to serve as a starting point for your own tests, if you wish to test the code outside the Flow editor. These tests do not guarantee that your code will work in a live environment, but they can help you catch some common mistakes.

To run the test, you must first have cloned the repository and you must run `npm install` to install the dependencies.

Then you can use the command: `npm test` to run the tests.
