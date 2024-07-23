# 老爸的私房錢

這是使用 Node.js 搭配 Express 框架、express-handlebars 樣板引擎及 MySQL 資料庫製作的記帳工具。

## 使用畫面

登入、註冊頁面
![alt tag](https://ppt.cc/fXtjyx@.png)

![alt tag](https://ppt.cc/fvSURx@.png)

首頁
![alt tag](https://ppt.cc/fkuOsx@.png)

## 應用程式功能說明

1. 使用可以註冊及登入帳號

    + 使用者必須登入才能進到應用程式查看內容，否則將被導向登入頁面

    + 使用者登入後只能操作自己的清單

    + 使用者可以使用臉書註冊和登入

2. 在首頁一次瀏覽所有記帳清單

    - 使用者只能遊覽自己的清單 

3. 在首頁看到所有支出清單的總金額

4. 使用者可以新增、編輯、刪除支出

5. 使用者可以利用分類按鈕篩選清單

## 應用程式使用說明

1. 使用 Git Bash 終端機將專案 clone 至本機

```
git clonse https://github.com/syh053/expense-tracker.git
```

2. 安裝節點監控器

```
npm install -g nodemon
```

3. 安裝應用程式所需要的套件

```
npm install
```

or

```
npm i
```

4. 設置環境變數( .env )，請依下圖 .envexample 範例設定

![environment](https://ppt.cc/fZhoYx@.png)

* FACEBOOK_CLIENT_ID 及 FACEBOOK_CLIENT_SECRET 請至 [facebook](https://developers.facebook.com) 設置

5. 利用腳本在 MySQL 資料庫建立 TABLE 及 SEEDERS

```
npm run table
```

```
npm run seed
```

6. 啟動應用程式

```
npm run dev
```
