# Contributing

Contributions of all kinds are welcome and appreciated. By contributing to Lore, you agree to abide by the 
[code of conduct](https://github.com/lore/lore/blob/master/CODE_OF_CONDUCT.md).

### Ways to Contribute

There are many ways to contribute to Lore, even if you aren't comfortable modifying the hooks or associated libraries.

The traditional ways of contributing include:

* Filing issues (bug reports, questions, suggestions)
* Improving the documentation
* Proposing changes
* Submitting PRs

However, Lore's ultimate goal is to simplify web app development, by making it nearly effortless to express the 
functional needs of your application in code, while also being able to easily adapt to APIs of all shapes and sizes.

To that end, the experience of using Lore matters a lot, and that extends to the documentation, CLI, and overall user 
experience. The framework should be helpful, but not be in your way. If you ever need to "eject" and take control 
of Redux directly, that process should feel easy. Error messages should be helpful. The framework should play well
with libraries of all kinds in the React ecosystem, especially since the framework *is* Redux. If there's a specific 
type of problem or challenge you hit frequently in your app development, Lore is interested in providing a pattern,
documentation, or tooling to help with that.

The difference between a library and a framework is often in the scope of the problem they're trying to solve for. Lore
is a framework, and the problem it's trying to solve is *application development*.

So one way you can contribute without writing any code is simply by sharing your experience, and any common problems 
you come across that you don't feel you have a good (or good enough) solution for.


### Building the Repo

If you're interested in making changes to Lore itself, the easiest way to develop and test changes is within a real 
project. In fact, most of the development of Lore, such as development of new hooks, CLI commands, or modifications to 
existing behavior is done *within a real application*. Hooks can be swapped out, the core can be overwritten, the CLI
can be expanded with new commands or current ones can be overridden.

Unfortunately, while the process for doing that is actually pretty simply, it's not immediately obvious.

In the future this section will be expanded to include a summary of that process and a video demonstrating the
recommended development flow, but for now, please see [issue #186](https://github.com/lore/lore/issues/165) for
a discussion about that process and the reasoning behind it.
