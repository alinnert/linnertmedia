workflow "Publish Website" {
  on = "push"
  resolves = ["Deploy"]
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

action "Deploy" {
  uses = "maxheld83/ghpages@v0.1.1"
  env = {
    BUILD_DIR = "docs/"
  }
  secrets = ["GH_PAT"]
  needs = ["Build"]
}
