// @flow
/* eslint-env jest */

const {promisify} = require('util');
const exec = promisify(require('child_process').exec);

function log(execOutput) {
  // eslint-disable-next-line no-console
  console.log(execOutput.stdout);
}

test('scaffolded plugin tests pass', async () => {
  // Remove node_modules and build artifacts if they exist
  await exec('rm -rf ./templates/plugin/content/node_modules || true');
  await exec('rm -rf ./templates/plugin/content/dist || true');

  await exec(`mkdir test-artifacts`);
  log(
    await exec(`node ../bin/cli.js test-scaffold`, {cwd: './test-artifacts'})
  );

  const options = {cwd: './test-artifacts/test-scaffold'};
  log(await exec(`yarn lint`, options));
  log(await exec(`yarn flow check`, options));
  log(await exec(`yarn test`, options));
}, 300000);
