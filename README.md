# Whatsapp Bot GPT-3

WhatsApp Bot integrated with GPT-3 built with NodeJS

### Resources

- [NodeJS](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [OpenIA](https://beta.openai.com/)
- [Venom-bot](https://github.com/orkestral/venom)

### How to run it locally?

1. Firstly, go to the solution directory and install the dependencies by executing the following command:

```
  npm install
```

2. Then create a local configuration file called *.env.local* by copying *.env* file and its content and replacing the placeholders (<*>) with the correct settings value, and finally run the following command:

```
  npm run local
```
3. After all (steps 1 and 2 above), you should see in your terminal (with logs) a QR Code to connect to the WhatsApp device you want as shown in the image below.

![Test](https://user-images.githubusercontent.com/46008407/215285945-174ddce5-b855-4b4c-b2c3-8727af90db07.png)

4. Finally, you will see a log message reporting the device was successfully connected. That's all! Have fun ;)

### How to run it in production mode?

The same steps as local (section above) except step 2 command which must be the following below:
```
  npm start
```

### How to run it in a docker container?

Firstly, go to the solution directory where is located the Dockerfile file and execute the following commands:
```
  docker build . -t <docker-image-name>
  docker run -d <docker-image-name>
```
After the docker container is running you can check out the logs to get the QR Code to connect the device to it by executing the following command:
```
  docker logs <container-id> --tail <number-of-lines>
```
