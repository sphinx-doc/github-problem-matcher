Sphinx Problem Matcher
======================

This action adds a problem matcher that catches Sphinx warnings
to show them neatly inside your pull request like this:

.. image:: https://i.imgur.com/xkUMS1a.png
   :alt: Example Screenshot

The common usage of this will be like so:

.. code-block:: yaml

   - uses: sphinx-doc/github-problem-matcher@master
   - name: "Build docs"
     run: |
       cd docs
       make html

That is, simply run this action before building your docs.

**Note: this does not handle actually building your docs.**
