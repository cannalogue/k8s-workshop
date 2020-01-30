
TAG=file

# Login to ECR
eval `aws ecr get-login --no-include-email --region ca-central-1`

# Build image
docker build -t k8s-workshop-app1 -f Dockerfile .

# Tag image 
docker tag k8s-workshop-app1:latest 645026774230.dkr.ecr.ca-central-1.amazonaws.com/k8s-workshop-app1:${TAG}

# Push image
docker push 645026774230.dkr.ecr.ca-central-1.amazonaws.com/k8s-workshop-app1:${TAG}

# Delete local image
docker rmi k8s-workshop-app1:latest