FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the model and application files
COPY . .

# Environment variables
ENV PORT=8080
ENV PYTHONUNBUFFERED=1

# Expose the port
EXPOSE ${PORT}

# Start the application
CMD gunicorn --bind 0.0.0.0:${PORT} app:app 