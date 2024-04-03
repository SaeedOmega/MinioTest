run-minio: 
	minio server ~/minio --console-address :9001

run-ui:
	npm run dev

install-minio:
	wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio_20240330094156.0.0_amd64.deb -O minio.deb
	sudo dpkg -i minio.deb
	mkdir ~/minio
	cd ~/minio
	mkdir test

install-ui:
	npm i

install: install-minio install-ui