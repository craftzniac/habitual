FROM node:20

# downloading pnpm
RUN npm i -g pnpm 

# install nestjs cli
RUN npm i -g @nestjs/cli 

# copy source code into docker image file system 
COPY  . /app/

# change working directory to project's directory
WORKDIR  /app/

# install dependencies
RUN pnpm install 

# create a persistent storage directory for a  marker file 
VOLUME /data

# run migrations if /data/firstMigration.txt doesn't already exist
RUN  if [ ! -f /data/firstMigration.txt ]; then \
        pnpm migration:generate:first &&        \
        pnpm migration:run &&                   \
        touch /data/firstMigration.txt;         \
     fi 

# finally start the project
CMD ["nest", "start"]
