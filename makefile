clean:
	docker-compose down --volumes

cbu:
	docker-compose down --volumes && docker-compose build --no-cache && docker-compose up