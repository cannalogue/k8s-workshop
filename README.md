# Description
In this workshop, you are going to create a node.js applications and deploy it on the Kubernetes cluster.

# Kubernetes Namespace Mapping
Please use your own namespace for this workshop

1. `aaron-lee`    - Aaron
2. `edmant-wu`    - Edmant
3. `michael-wang` - Michael
4. `zhaolong`     - Zhaolong Li
5. `dingxizheng`  - Xizheng Ding

# Folder Structure
```
-----------------------------------------------
- app1 # the first application
  - app.js
  - Dockerfile
- app2 # time service
  - app.js
  - Dockerfile
- kubernetes
  - ... # kubernetes resource files
- README.md
```

# How to view all the running pods
`kubectl get pods -n <your_namespace>`

# How to view all the services
`kubectl get services -n <your_namespace>`