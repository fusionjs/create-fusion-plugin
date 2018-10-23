FROM uber/web-base-image:1.0.9@sha256:98ad970fd8dadc43ecec9909e27dc543a88d096f722d00e07e0b25047e9388bc

WORKDIR /create-fusion-plugin

COPY package.json yarn.lock /create-fusion-plugin/

RUN yarn

COPY templates/plugin/content/package.json templates/plugin/content/yarn.lock /create-fusion-plugin/templates/plugin/content/

RUN cd templates/plugin/content && yarn --ignore-scripts
