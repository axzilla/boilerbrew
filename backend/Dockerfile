FROM alpine:latest

ARG PB_VERSION=0.22.19

RUN apk add --no-cache \
    unzip \
    ca-certificates

# Determine the system architecture and set the appropriate download URL
RUN case $(uname -m) in \
    x86_64) ARCH="amd64" ;; \
    aarch64) ARCH="arm64" ;; \
    *) echo "Unsupported architecture"; exit 1 ;; \
    esac && \
    echo "Detected architecture: $ARCH" && \
    PB_URL="https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${ARCH}.zip" && \
    echo "Download URL: $PB_URL"

# download and unzip PocketBase
ADD ${PB_URL} /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations

# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks

# Verify the binary
RUN file /pb/pocketbase

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]