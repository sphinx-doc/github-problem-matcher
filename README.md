# sphinx-problem-matcher

This action adds a problem matcher that catches Sphinx warnings to show them
neatly inside your pull request like this:

![Example Screenshot](https://i.imgur.com/xkUMS1a.png)

The common usage of this will be like so:

```yaml
    - uses: ammaraskar/sphinx-problem-matcher@master
    - name: "Build docs"
      run: |
        cd docs
        make html
```

That is, simply run this action before building your docs.

**Note: this does not handle actually building your docs.**
