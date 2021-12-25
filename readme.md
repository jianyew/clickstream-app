

1. serverless deploy --region ap-southeast-1 
![img_1.png](image/img_1.png)

2. 部署完成后，找到endpoint。
![img.png](image/img.png)

3. curl -G https://toxog7wy33.execute-api.ap-southeast-1.amazonaws.com/api/v1/userpage
```
➜  ~ curl -G  https://toxog7wy33.execute-api.ap-southeast-1.amazonaws.com/api/v1/userpage
{"result":"send successful","version":"1"}%
```