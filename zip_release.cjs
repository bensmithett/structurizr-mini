const { version } = require('./package.json')
const { execSync } = require('child_process')

execSync(`tar -czvf ./dist/structurizr_mini_v${ version }.tar.gz -C build .`)
