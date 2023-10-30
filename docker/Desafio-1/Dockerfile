# Use a lightweight base image
FROM golang:1.17-alpine as build

# Set the working directory
WORKDIR /app

# Copy the Go source code into the container
COPY fullcycle.go .

# Compile the Go program
RUN go build fullcycle.go

# Create a smaller binary by using a scratch base image
FROM scratch

# Copy the compiled binary from the build container
COPY --from=build /app/fullcycle .

# Set the entry point for the container
ENTRYPOINT ["/fullcycle"]
