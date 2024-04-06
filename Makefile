run-minio: 
	docker run \
   		-p 9000:9000 \
   		-p 9001:9001 \
   		-v ~/minio \
   		-e "MINIO_ROOT_USER=minioadmin" \
   		-e "MINIO_ROOT_PASSWORD=minioadmin" \
   		quay.io/minio/minio server ~/minio --console-address ":9001"
run-ui:
	npm run dev

install-minio:
	mkdir ~/minio

install-ui:
	npm i

install: install-minio install-ui