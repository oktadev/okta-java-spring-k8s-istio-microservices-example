#!/bin/bash
# Files are ordered in proper order with needed wait for the dependent custom resource definitions to get initialized.
# Usage: bash kubectl-apply.sh

usage(){
 cat << EOF

 Usage: $0 -f
 Description: To apply k8s manifests using the default \`kubectl apply -f\` command
[OR]
 Usage: $0 -k
 Description: To apply k8s manifests using the kustomize \`kubectl apply -k\` command
[OR]
 Usage: $0 -s
 Description: To apply k8s manifests using the skaffold binary \`skaffold run\` command

EOF
exit 0
}

logSummary() {
    echo ""
        echo "#####################################################"
        echo "Please find the below useful endpoints,"
        echo "Gateway - http://store.jhipster.34.76.233.160.nip.io"
        echo "Zipkin - http://zipkin.istio-system.34.76.233.160.nip.io"
        echo "Grafana - http://grafana.istio-system.34.76.233.160.nip.io"
        echo "Kiali - http://kiali.istio-system.34.76.233.160.nip.io"
        echo "#####################################################"
}

default() {
    suffix=k8s
    kubectl apply -f namespace.yml
    kubectl label namespace jhipster istio-injection=enabled --overwrite=true
    kubectl apply -f store-${suffix}/
    kubectl apply -f invoice-${suffix}/
    kubectl apply -f notification-${suffix}/
    kubectl apply -f product-${suffix}/

    kubectl apply -f istio-${suffix}/
}

kustomize() {
    kubectl apply -k ./
}

scaffold() {
    // this will build the source and apply the manifests the K8s target. To turn the working directory
    // into a CI/CD space, initilaize it with `skaffold dev`
    skaffold run
}

[[ "$@" =~ ^-[fks]{1}$ ]]  || usage;

while getopts ":fks" opt; do
    case ${opt} in
    f ) echo "Applying default \`kubectl apply -f\`"; default ;;
    k ) echo "Applying kustomize \`kubectl apply -k\`"; kustomize ;;
    s ) echo "Applying using skaffold \`skaffold run\`"; scaffold ;;
    \? | * ) usage ;;
    esac
done

logSummary
