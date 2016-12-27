start sass :

```shell
docker run --name blog-sass -d  -v /Users/kaleocheng/WorkSpace/JustWriting/templates/graceful/css/:/css sass sass --watch /css/style.scss:/css/style.css
```