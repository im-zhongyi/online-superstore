
#
# Package stage
#
FROM openjdk:11
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=/usr/app/target/*.jar
COPY --from=build $JAR_FILE /app/runner.jar
ENTRYPOINT ["java","-jar","/app/runner.jar"]
