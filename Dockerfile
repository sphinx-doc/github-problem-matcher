FROM alpine:latest

ADD sphinx_matcher.json /

ENTRYPOINT ["/bin/sh", "-c", \
    "cp /sphinx_matcher.json . && echo '::add-matcher::sphinx_matcher.json'"]
