# Running Gitbook Locally

We're using [Gitbook](https://www.gitbook.com) to host the docs. It's a pretty awesome service that let's you
write documentation using Markdown syntax. But because Gitbook has some occasional behavioral differences from what's
supported natively on Github (through the use of custom plugins and styling) it helps to be able to emulate the Gitbook
experience locally when making changes to the documentation.

There are two ways to do this, the official way (the native approach provided by Gitbook) and the unofficial way this
project uses.

## Official Way (not recommended)
To run Gitbook locally, you first need to install the [Gitbook CLI](https://github.com/GitbookIO/gitbook-cli):

```
npm install -g gitbook-cli
```

Then you can start the Gitbook server by running `gitbook serve` in the root of the project. This command will 
generate a `_book` folder, and compile all the statics assets into that directory.  You can then view the Gitbook 
by navigating to `http://localhost:4000`.

## Unofficial Way (recommended)

The problem with using `gitbook serve` to build the docs is that it's a terrible experience. Links often take 10+ 
seconds to respond when you click on them and the re-build process when you change files often breaks. To work around
that, I created a "gulp + gitbook + browser-sync" alternative that emulates the behavior provided by `gitbook serve`
but seems to work more reliably and is immediately responsive once the docs load.

To try this route, run `gulp docs` from the root of the project. This will open the docs in a new browser tab for
viewing. This will typically be at `http://localhost:3000`, but appears to change the port it's running on if something
else is already running on that port, so the docs may show up `http://localhost:3001` instead.

## Configuring Gitbook

The `book.json` file at the root of the project declares which version of Gitbook to use as well as which plugins 
should be installed and how they should be configured.

When you first open `http://localhost:4000` in a browser the navigation will be *extremely slow*.  When you click on
navigation links, the page will not update in a reasonable time (takes 5-10 seconds on my machine).  Not sure why, but
if do nothing, and wait maybe 20 seconds, the navigation will start being more responsive.
