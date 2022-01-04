docker build -t junhano/multi-client:latest -t junhano/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t junhano/multi-server:latest -t junhano/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t junhano/multi-worker:latest -t junhano/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push junhano/multi-client:latest
docker push junhano/multi-server:latest
docker push junhano/multi-worker:latest
docker push junhano/multi-client:$SHA
docker push junhano/multi-server:$SHA
docker push junhano/multi-worker:$SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=junhano/multi-server:$SHA
kubectl set image deployments/client-deployment server=junhano/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=junhano/multi-worker:$SHA