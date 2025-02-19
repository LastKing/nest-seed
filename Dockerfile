# 拉取node镜像
FROM node:20.18.0
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /data/app

COPY package.json /data/app/
COPY package-lock.json /data/app/
RUN npm install --registry=https://registry.npm.taobao.org

ADD . /data/app

RUN npm run gulp:build

ENTRYPOINT ["sh","./Entrypoint.sh"]
