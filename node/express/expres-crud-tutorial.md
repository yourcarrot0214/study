```js
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// 전체 애플리케이션에서 json 데이터를 사용합니다.
app.use(bodyParser.json());

// request 요청에 대한 수신 대기
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

```js
// ./routes/user.js

import express from "express";
const router = express.Router();

let users = [
  { id: 1, name: "carrot", age: "35" },
  { id: 2, name: "wilted", age: "26" },
];

router.delete('/"id', (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`User with the id ${id} deleted from the database.`);
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const user = users.find((user) => user.id === id);

  if (name) user.name = name;
  if (age) user.age = age;

  res.send();
});
```

controllers 폴더
해당 router에 맞는 파일에 미들웨어 함수 저장
