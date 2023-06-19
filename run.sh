#! /bin/bash

npm install
npm run build

# docker run \
#     --rm \
#     -it \
#     -v "$PWD":/kino:rw \
#     -e LIVEBOOK_HOME=/kino \
#     -e LIVEBOOK_TOKEN_ENABLED=false \
#     --network host \
#     livebook/livebook:latest

livebook server ./nbs
