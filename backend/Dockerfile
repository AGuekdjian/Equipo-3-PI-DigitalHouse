FROM openjdk:17-alpine
RUN apk update && apk add maven
WORKDIR /app
COPY . .
RUN mvn package
CMD ["java", "-jar", "my-app-0.0.1-SNAPSHOT.jar"]
