# app/gulp/tasks

### Purpose

This is where you should put your gulp tasks. While webpack and npm scripts have gone a long way towards
replacing the need for gulp on many projects, it can still be useful in scenarios like publishing your
project to Surge or GitHub Pages.

### Example

Let's say you want to create a gulp task that welcomes someone to your project.  To do that you would create
a file called `hello.js` in `/gulp/tasks` and execute it by typing `gulp say:hello`.

```
// file: hello.js

gulp.task('say:hello', function() {
  console.log('Hello! Nice to meet you : )');
});
```
