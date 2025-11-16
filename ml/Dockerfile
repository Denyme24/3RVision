FROM python:3.10-slim

WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY app.py .
COPY templates ./templates
COPY static ./static
# Copy model file - use shell expansion to handle filename with spaces
COPY ["3RVision_2 (1).keras", "model.keras"]

# Create uploads directory
RUN mkdir -p static/uploads

# Expose port
EXPOSE 5001

# Run the application
CMD ["python", "app.py"]

