# Stefan Music App

This is a personal project I have decided to make because it was one of my beginner projects and I want to have another try at making such app. Windows Only App, could work on other platforms if compiled.

## Starting Development

Start the app in the `dev` environment:

```bash
npm/bun start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm/bun run package
```
@NOTE: Prepend a `~` to css file paths that are in your node_modules for css imports
@NOTE: Please use bun because it's much faster, dont do anything dumb like bun init, just run thats it, bun start bun run package thats it. dont think about updating stuff, just leave it as it is