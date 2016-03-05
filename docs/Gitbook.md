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
