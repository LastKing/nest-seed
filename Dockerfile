# 拉取node镜像
FROM node:24.13.1
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /data/app

RUN corepack enable

COPY package.json pnpm-lock.yaml /data/app/
RUN pnpm install --registry=https://registry.npmmirror.com

ADD . /data/app

RUN npm run gulp:build

ENTRYPOINT ["sh","./Entrypoint.sh"]
