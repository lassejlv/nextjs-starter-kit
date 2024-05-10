FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

RUN bunx --bun prisma generate

EXPOSE 3000

CMD ["bun", "run", "start"]