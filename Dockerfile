# Use a slim Python base image
FROM python:3.12.3-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . /app/

# Copy the entrypoint script and ensure it's executable
RUN chmod +x /app/scripts/entrypoint.sh

# Create a non-root user and set permissions
RUN addgroup --system django && adduser --system --group django
RUN chown -R django:django /app

# Switch to the non-root user
USER django

# Expose the API port
EXPOSE 8000

# Set the entrypoint script
ENTRYPOINT ["/app/scripts/entrypoint.sh"]

# Set the default command (Gunicorn for production)
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]
