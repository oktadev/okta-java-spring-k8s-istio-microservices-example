# Cloud Native Java Microservices with Spring Boot, Istio, Kubernetes and JHipster

This is an example application accompanying the blog post [Cloud Native Java Microservices with JHipster and Istio](https://developer.okta.com/blog/2022/06/09/cloud-native-java-microservices-with-istio) on the Okta dev blog.

**Pre-requisites**

- A [Google Cloud Platform](https://cloud.google.com/) account
- [Docker](https://www.docker.com/get-started) installed on your machine
- [Node.js](https://nodejs.org/en/) installed on your machine
- [JHipster installed](https://www.jhipster.tech/installation/) on your machine
- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and configured on your machine
- [kubectl](https://kubernetes.io/docs/tasks/tools/) or [KDash](https://github.com/kdash-rs/kdash)
- Basic understanding of Java, Spring, Containers, and Kubernetes

## Create a GKE Cluster and Install Istio

To deploy the stack to Google Kubernetes Engine, we need to create a cluster and install Istio. So let's begin by creating a cluster using Google Cloud SDK.

### Create a cluster

Ensure you are logged into the gcloud CLI and run the below command to create a GKE cluster.

```bash
# set region and zone
gcloud config set compute/region europe-west1
gcloud config set compute/zone europe-west1-b
# Create a project and enable container APIs
gcloud projects create jhipster-demo-okta # You need to also enable billing via GUI
gcloud config set project jhipster-demo-okta
gcloud services enable container.googleapis.com

# Create GKE Cluster
gcloud container clusters create hello-hipster \
   --num-nodes 4 \
   --machine-type n1-standard-2
```

This could take anywhere between 5 to 15 minutes. `--machine-type` is important as we need more CPU than available in the default setup. Once the cluster is created, it should be set automatically as the current Kubernetes context. You can verify that by running `kubectl config current-context`. If the new cluster is not set as the current context, you can set it by running `gcloud container clusters get-credentials hello-hipster`.

### Install Istio to cluster

As of writing this, I'm using Istio version 1.13.4. You can install **istioctl** by running the below command, preferably from the home directory.

```bash
export ISTIO_VERSION=1.13.4
curl -L https://istio.io/downloadIstio | sh -
cd istio-$ISTIO_VERSION
export PATH=$PWD/bin:$PATH
```

You should now be able to run **istioctl** from the command line. Now, we can use the CLI to Install Istio to the GKE cluster. Istio provides a few [Helm](https://helm.sh/) profiles out of the box. We will use the demo profile for demo purposes. You can choose the production or dev profile as well. The command should install Istio and setup everything required on our cluster.

```bash
istioctl install --set profile=demo -y
```

> **Note**: If you run into any trouble with firewall or user privilege issues, please refer to [GKE setup guide from Istio](https://istio.io/latest/docs/setup/platform-setup/gke/).

Once the installation is complete, we need to fetch the External IP of the Istio Ingress Gateway. If you are using KDash, you can see it on the services tab, or you can run this command to get it using kubectl: `kubectl get svc istio-ingressgateway -n istio-system`

### Install Observability tools

Istio also provides addons for most of the popular monitoring and observability tools. Lets install Grafana, Prometheus, Kiali and Zipkin on our cluster. These are pre-configured to work with the telemetry data provided by Istio. Ensure you are in the folder where you installed Istio, like **istio-1.13.4**.

```bash
cd istio-$ISTIO_VERSION
kubectl apply -f samples/addons/grafana.yaml
kubectl apply -f samples/addons/prometheus.yaml
kubectl apply -f samples/addons/kiali.yaml
kubectl apply -f samples/addons/extras/zipkin.yaml
```

If we look at the istio-system namespace, we can see all the Istio components along with Grafana, Prometheus, Kiali, and Zipkin running. You can also see this by running `kubectl get pods -n istio-system`.

## Deploy the microservice stack to GKE

We are ready to deploy now. First, we need to build and push the images to the registry. We can use the handy [Jib](https://github.com/GoogleContainerTools/jib) commands provided by JHipster. Navigate to each of the microservice folders and run the command below.

```bash
cd store && ./gradlew bootJar -Pprod jib -Djib.to.image=deepu105/store
cd invoice && ./gradlew bootJar -Pprod jib -Djib.to.image=deepu105/invoice
cd notification && ./gradlew bootJar -Pprod jib -Djib.to.image=deepu105/notification
cd product && ./gradlew bootJar -Pprod jib -Djib.to.image=deepu105/product
```

Once the images are pushed to the Docker registry, we can deploy the stack using the handy script provided by JHipster. Navigate to the `kubernetes` folder created by JHipster and run the following command.

```bash
cd kubernetes
./kubectl-apply.sh -f
```

Once the deployments are done, we must wait for the pods to be in **RUNNING** status. Useful links will be printed on the terminal; make a note of them.

### Cleanup

Once you are done with experiments, make sure to delete the cluster you created so that you don't end up with a big bill from Google. You can delete the cluster from the Google Cloud Console GUI or via the command line using the below command.

```bash
gcloud container clusters delete hello-hipster
```
