var Promise = require('bluebird');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    console.log();
    console.log('** Installation Instructions **');
    console.log('Almost done! Just run this command to install the required packages as devDependencies:');
    console.log('npm install gulp@3.9.1 gulp-clean@0.3.1 gulp-rename@1.2.2 gulp-sequence@0.4.5 gulp-surge@0.1.0 gulp-util@3.0.7 yargs@4.2.0 --save-dev');
    console.log();
    console.log('** Publishing to a custom domain **');
    console.log('Once the packages are installed, you can run `gulp surge` to publish your project to surge.');
    console.log('The script will pause once you see this screen:');
    console.log();
    console.log('    Surge - surge.sh');
    console.log();
    console.log('    email: name@email.com');
    console.log('    token: *****************');
    console.log('    project path: /users/username/lore-project/tmp');
    console.log('    size: 2 files, 2.3 MB');
    console.log('    domain: frozen-tunda.surge.sh');
    console.log();
    console.log('To proceed, simply hit enter to accept the randomly generated domain, or delete it and replace it with your own.');
    console.log('You can also set the domain your project is published to by running `gulp surge --domain=your-custom-subdomain.surge.sh`');
    console.log('If you want to set the default domain the task publishes to, just modify `config.domain` in `gulp/tasks/surge.sh`');
    console.log();
  });
};
