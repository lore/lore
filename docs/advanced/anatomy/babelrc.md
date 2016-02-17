# app/.babelrc

### Purpose

The global babel configuration for the project.  [Babel](https://babeljs.io/) is the transpiler than converts the 
JSX code to JS for use in a browser, and as well as any ES6 code to ES5 (until browsers have full support for ES6).

By default the stage is set to 0, to allow usage of all babel features, but you can scale it back if you want to limit
what's used in your project (babel will throw errors at build time if it the syntax isn't supported).  See 
[here](https://babeljs.io/docs/plugins/preset-stage-0/) for an explanation of the babel stages and what they mean.

```js
{
  "stage": 0
}
```
