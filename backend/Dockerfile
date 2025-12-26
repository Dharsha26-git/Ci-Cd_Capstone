# Base image
FROM python:3.11-slim

# Working directory
WORKDIR /app

# Copy dependency file first (cache)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Create non-root user
RUN useradd appuser
USER appuser

# Expose Flask port
EXPOSE 5000

# Run Flask app
CMD ["python", "app.py"]
