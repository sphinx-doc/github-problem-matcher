Sphinx Problem Matcher
======================

This action adds a problem matcher that catches Sphinx warnings
to show them neatly inside your pull requests.

Usage
-----

We suggest using the action as shown below,
simply running the action before building your documentation.

**Note: This action does not handle actually building your docs.**

.. code-block:: yaml

   - uses: sphinx-doc/github-problem-matcher@master

   - name: "Build docs"
     run: |
       cd docs
       make html

Example
-------

After using the action, files in pull requests will be annotated:

.. image:: https://i.imgur.com/xkUMS1a.png
   :alt: Example Screenshot
