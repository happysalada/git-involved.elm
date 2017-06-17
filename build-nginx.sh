TOPDIR=$(cd $(dirname $0) && pwd)
BUILD_DATE=`date -u +"%Y-%m-%d-%H:%M"`
COMMIT_ID=$(git rev-parse HEAD | tr -d '[[:space:]]')
BRANCH=$(git rev-parse --abbrev-ref HEAD | tr -d '[[:space:]]')

docker build -t gitback-${BRANCH}-nginx "${TOPDIR}" -f Dockerfile.nginx
docker tag gitback-${BRANCH}-nginx happysalada/gitback-nginx:latest
docker push happysalada/gitback-nginx:latest
