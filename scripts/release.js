import { exec as execNative } from 'child_process'

const exec = cmd => {
  return new Promise(resolve => {
    execNative(cmd, { cwd: process.cwd() }, (err, res) => resolve([err, res]))
  })
}

const error = errorMsg => Error(`⛔️  ${errorMsg}`)

async function commitAndPush () {
  console.log('⏬  Downloading tags...\n')
  const [errPullingTags] = await exec('git pull --tags')
  if (errPullingTags) throw error('Error pulling tags on git')

  console.log('🆕  Creating a new version of the package...\n')
  const [errVersion] = await exec('npm version patch -m "Release %s version"')
  if (errVersion) throw error('Error creating new version of web')

  console.log('⏫  Pushing changes to master...\n')
  const [errPushingTags] = await exec('git push --tags')
  if (errPushingTags) throw error('Error pushing tags on git')

  const [errPushingChanges] = await exec('git push origin master')
  if (errPushingChanges) throw error('Error pushing new release on git')
}

async function release () {
  console.log("🤔  Checking you're in the right branch and a clean status...\n")
  const [errStatus, statusResponse] = await exec('git status --porcelain')
  if (errStatus) throw error('Error on getting status of git')

  const isCleanBranch = statusResponse.trim().length === 0
  if (!isCleanBranch) { throw error('Your directory is not clean. Checkout your changes!') }

  const [errBranch, branchResponse] = await exec(
    'git rev-parse --abbrev-ref HEAD'
  )
  if (errBranch) throw error('Error on getting git branch')

  const isMaster = branchResponse.trim() === 'master'
  if (!isMaster) {
    throw error(
      'You are trying to release a new version in a branch. Move to master.'
    )
  }

  await commitAndPush()
}

release()
  .then(() => console.log('✅  New version released!'))
  .catch(console.error)
