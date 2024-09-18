FROM ruby:3.3.4-alpine

RUN apk update && apk add --no-cache \
  build-base \
  postgresql-dev \
  nodejs \
  npm \
  bash

WORKDIR /rails

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

COPY entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE 3001

ENTRYPOINT ["/usr/bin/entrypoint.sh"]

CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3001",  "rspec"]
