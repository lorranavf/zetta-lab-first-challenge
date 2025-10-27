clean-docker:
	docker system prune -f

start:
	docker compose -p zettalab -f deploy/compose/compose.dev.yml up -d
	make clean-docker

stop:
	docker compose -p zettalab -f deploy/compose/compose.dev.yml down
	make clean-docker

rm:
	docker compose -p zettalab -f deploy/compose/compose.dev.yml down --rmi all -v
	make clean-docker

restart:
	docker compose -p zettalab -f deploy/compose/compose.dev.yml down
	docker compose -p zettalab -f deploy/compose/compose.dev.yml build --no-cache
	docker compose -p zettalab -f deploy/compose/compose.dev.yml up -d
	make clean-docker

git-undo-last-commit:
	git reset --hard HEAD~1