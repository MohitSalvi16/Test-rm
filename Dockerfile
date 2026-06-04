# ── build stage ──
FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@10

# Install deps (lockfile present). onlyBuiltDependencies in package.json
# lets esbuild / tailwind-oxide build non-interactively.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ── serve stage ──
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
