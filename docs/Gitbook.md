# Running Gitbook Locally

To run Gitbook locally, you first need to install the [Gitbook CLI](https://github.com/GitbookIO/gitbook-cli):

```
npm install -g gitbook-cli
```

Then you can start the Gitbook server by running `gitbook serve` in the root of the project. This command will 
generate a `_book` folder, and compile all the statics assets into that directry.  You can then view the Gitbook 
by navigating to `http://localhost:4000`.

## Notes

The `book.json` file at the root of the project declares which version of Gitbook to use as well as which plugins 
should be installed and how they should be configured.

When you first open `http://localhost:4000` in a browser the navigation will be *extremely slow*.  When you click on
navigation links, the page will not update in a reasonable time (takes 5-10 seconds on my machine).  Not sure why, but
if do nothing, and wait maybe 20 seconds, the navigation will start being more responsive.
