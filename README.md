# Adding Nested/Persistent Layouts in Remix

This code was created for a video titled ["How to Add Nested/Persistent Layouts in Remix"](https://www.youtube.com/watch?v=2QlxdDGqJ2c&ab_channel=ReactTipswithBrooksLybrand). It is an adaption of [this demo built in next.js](https://github.com/brookslybrand/next-nested-layouts), which I [implement in this video](https://www.youtube.com/watch?v=WOeLxL2DF3E&feature=youtu.be&ab_channel=ReactTipswithBrooksLybrand).

Interested in Remix? Checkout the [Remix docs](https://docs.remix.run) or get [your own license](https://remix.run/buy)!

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npm init remix` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npm init remix
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
