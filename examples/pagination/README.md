# pagination

Example application to demonstrate use of pagination.

![lore_example_pagination_shadow_v2](https://cloud.githubusercontent.com/assets/2637399/16970594/f97277ec-4dd1-11e6-9362-c87b6b8ed4f4.png)

## Notes

This example uses the GitHub API, and does not require use of [json-server](https://github.com/typicode/json-server) like some of the other examples.

The pagination controls were modeled after the controls used by Amazon.

GitHub's search API has a [rate limit of 10 requests/minute](https://developer.github.com/v3/search/#rate-limit) for non-authenticated requests. If you paginate fairly quickly, you can hit this limit, and the UI will change to show an error, with a description and clickable url where you can obtain more information, both of which are provided by the GitHub API as part of the error.

If you see this error, just wait a little bit (a minute at most) and refresh the page. The error will disaapear and be replaced with a list of repositories again.

## Usage

To run the example, first install the dependencies:

```
npm install
```

Next, run webpack to build and serve the project:

```
npm start
```

Finally, open your browser and navigate to `http://localhost:3000` to view the example.
