FROM node:16.7-alpine3.14

# Server ports
EXPOSE 8081/tcp
EXPOSE 8081/udp

# Hot reloading ports
EXPOSE 35729/tcp
EXPOSE 35729/udp

WORKDIR /mnt

ENTRYPOINT [ "./entrypoint.sh" ]

CMD [ "npm", "start" ]
