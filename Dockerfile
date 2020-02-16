FROM alpine:latest

ADD sphinx_matcher.json .

ENTRYPOINT ["/bin/echo", "::add-matcher::sphinx_matcher.json"]
