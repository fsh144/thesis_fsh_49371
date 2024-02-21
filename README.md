# Air Pollution Monitoring System: Practical Aspects of Data Manipulation and Storage

This repository contains the implementation of my thesis project at WSB University. The project focuses on the development of an air pollution monitoring system, highlighting practical considerations in data manipulation and storage.

## Author

- Farhad Shukurov
- Student ID: 49371
- WSB University

## Overview

The goal of this project is to create an efficient and scalable system for monitoring air pollution levels. The system gathers data from various sensors, processes it for insights, and stores it for analysis and reporting. The backend is designed to handle large volumes of data, ensuring data integrity and quick access for analysis.

## Structure

The project is divided into two main components:

- `backend`: Contains the server-side logic, API endpoints, and database integration necessary for data ingestion, processing, and retrieval.
- `frontend`: Provides a user interface for real-time data visualization and interaction with the system.

## Technologies

The project utilizes a range of technologies:

- **Backend**: Developed with Python and the FastAPI framework to ensure high performance and easy scalability.
- **Frontend**: Built using React and TypeScript to create a responsive and interactive user experience.
- **Database**: PostgreSQL is used for data storage, chosen for its robustness and support for complex queries.

## Setup and Installation

For details on setting up the project, please refer to the `docker-compose.yml` file which orchestrates the containers for the backend, frontend, and database.

Ensure Docker and Docker Compose are installed on your system and run the following command from the project root:

```bash
docker-compose up
```

This will build and start all the services defined in the Docker Compose configuration.

## Contributions
As this project is part of academic work, contributions are not actively sought. However, suggestions and feedback are welcome.

## License
This project is for academic purposes and not licensed for commercial use.