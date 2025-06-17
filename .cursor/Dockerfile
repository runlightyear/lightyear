FROM node:22-bullseye

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    redis-tools \
    git \
    curl \
    vim \
    nano \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -s /bin/bash ubuntu

# Install pnpm globally
RUN npm install -g pnpm@8

# Set user and working directory
USER ubuntu
WORKDIR /home/ubuntu

# Set environment variables
ENV HOME=/home/ubuntu
ENV PATH=$HOME/.local/bin:$PATH

# Create directories that might be needed
RUN mkdir -p $HOME/.local/bin