FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

RUN bunx --bun prisma db push

EXPOSE 3000

CMD ["bun", "run", "start"]