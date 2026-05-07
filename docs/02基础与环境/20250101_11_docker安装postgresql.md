---
title: docker安装postgresql
date: 2025-01-01
---

## postgresql
```
docker run -d -p 5432:5432 --name postgresql -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=pass123 postgres
```