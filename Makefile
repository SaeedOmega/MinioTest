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

run-vault:
	docker run -d --rm --name vault-server --network host --cap-add=IPC_LOCK -e 'VAULT_DEV_ROOT_TOKEN_ID=test-vault' -e 'VAULT_DEV_LISTEN_ADDRESS=0.0.0.0:8200' vault:1.13.3
	
set-vaultConfig:
	curl \
    	--header "X-Vault-Token: test-vault" \
    	--request POST \
    	--data @corsSettingVault.json \
    	http://localhost:8200/v1/sys/config/cors

stop-vault:
	docker stop vault-server

install-minio:
	mkdir ~/minio

install-ui:
	npm i

install: install-minio install-ui