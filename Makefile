RUN = docker exec

clean:
	@echo "clean docker images..."
	@docker ps -aqf status=exited | xargs docker rm && docker images -qf dangling=true | xargs docker rmi
build:
	@docker build -t swagger .
rebuild:
	@make clean
	@make build

#################################################

start:
	@docker run --name swagger-docs -d \
		-p 5566:5566 \
		-d swagger
stop:
	@docker stop swagger-docs
remove:
	@docker rm -f swagger-docs
update:
	@git checkout develop
	@git pull
	@make stop
	@make remove
	@make start
restart:
	@make stop
	@make remove
	@make start