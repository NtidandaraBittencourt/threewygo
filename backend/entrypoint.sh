#!/bin/bash
set -e

until nc -z -v -w30 db 5432
do
  echo "Aguardando o PostgreSQL iniciar..."
  sleep 1
done

echo "PostgreSQL iniciado, executando migrações..."

bundle exec rake db:migrate
bundle exec rake db:seed

exec "$@"
