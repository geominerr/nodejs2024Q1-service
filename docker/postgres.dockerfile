FROM postgres:16-alpine

CMD ["postgres", "-c", "logging_collector=on", "-c", "log_directory=/logs", "-c", "log_filename=postgresql.log", "-c", "log_statement=all"]