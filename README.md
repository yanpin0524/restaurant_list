## 專案畫面

![image](https://github.com/pierceshih15/restaurantList/blob/master/public/img/homePage.png)

![image](https://github.com/pierceshih15/restaurantList/blob/master/public/img/restaurantInfo.png)

![image](https://github.com/pierceshih15/restaurantList/blob/master/public/img/addNewRestaurant.png)

![image](https://github.com/pierceshih15/restaurantList/blob/master/public/img/loginPage.png)

## Features - 產品功能

1. 使用者可以藉由第三方快速註冊登入(Facebook, Google)
2. 使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
3. 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋
4. 使用者可以新增一家餐廳
5. 使用者可以瀏覽一家餐廳的詳細資訊
6. 使用者可以瀏覽全部所有餐廳
7. 使用者可以修改一家餐廳的資訊
8. 使用者可以刪除一家餐廳

## Environment SetUp - 環境建置

1. [MongoDB v4.0 以上](https://www.mongodb.com/download-center/community)
2. [Node.js](https://nodejs.org/en/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/pierceshih15/restaurantList.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurantList
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4. 安裝 nodemon 套件

```
在 Terminal 輸入 nodemon app.js 指令
```

5. 匯入種子檔案

```
在 Terminal 找到 Seeder.js 檔案

執行 node models/seeds/Seeder.js 匯入使用者與餐廳資料
```

當 terminal 出現以下字樣，即表示種子資料已新增至資料庫，按下 ctrl + c 結束執行

```
Mongodb is connected!

User and Restaurant data get done!
```

6. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

7. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
The Express server is running on http://localhost:3000

Mongodb is connected!
```

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始使用皮皮美食網囉！歡迎使用官方測試帳號操作。

```
帳號：pierce@gmail.com
密碼：1234
```

## Contributor - 專案開發人員

> [Pierce Shih](https://github.com/pierceshih15)
