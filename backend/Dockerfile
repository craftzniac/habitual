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


# finally start the project
CMD ["nest", "start"]
