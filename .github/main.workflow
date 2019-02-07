workflow "Publish Website" {
  on = "push"
  resolves = ["Commit and Push"]
}

action "Clean install" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "ci"
}

action "Build" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Clean install"]
  args = "run build"
}

action "Commit and Push" {
  uses = "elstudio/actions-js-build/commit@master"
  needs = ["Build"]
  secrets = ["GITHUB_TOKEN"]
}
