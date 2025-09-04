# An Express Server Template

Q&A Voting System is an API for managing questions and answers with upvote/downvote functionality for both questions and answers.
Features
Create, update, delete, get questions
Create, get, delete answers by question
Voting system for questions and answers
Search questions by title and category
Technology
Node.js & Express
PostgreSQL
ES Modules (.mjs)
Model - Controller - Route structure
Middleware to validate answers

ระบบ Q&A Voting System เป็น API ที่ใช้จัดการคำถามและคำตอบ พร้อมระบบโหวต (upvote/downvote) สำหรับคำถามและคำตอบ

### คุณสมบัติ

- สร้าง, แก้ไข, ลบ, ดึงข้อมูลคำถาม
- สร้าง, ดึงข้อมูล, ลบคำตอบตามคำถาม
- ระบบโหวตสำหรับคำถามและคำตอบ
- รองรับการค้นหาคำถามตาม `title` และ `category`

### เทคโนโลยี

- Node.js & Express
- PostgreSQL
- ES Modules (`.mjs`)
- Styled architecture: Model - Controller - Route
- Middleware สำหรับ validate คำตอบ

### การติดตั้ง

1. Clone โปรเจกต์

```bash
git clone <repository-url>
cd <project-folder>



| Method | Endpoint                   | Description                                        |         |
| ------ | -------------------------- | -------------------------------------------------- | ------- |
| POST   | `/api/question/create`     | สร้างคำถาม                                          |         |
| GET    | `/api/question`            | ดึงคำถามทั้งหมด (รองรับ query `title`, `category`)     |         |
| GET    | `/api/question/:id`        | ดึงคำถามตาม ID                                      |         |
| PUT    | `/api/question/update/:id` | แก้ไขคำถาม                                          |         |
| DELETE | `/api/question/delete/:id` | ลบคำถามพร้อมคำตอบและโหวต                            |         |
| GET    | `/api/question/:id/vote`   | ดึงคะแนนโหวตคำถาม                                   |         |
| POST   | `/api/question/:id/vote`   | โหวตคำถาม (body: \`{ value: 1                      | -1 }\`) |


| Method | Endpoint                       | Description                                     |         |
| ------ | ------------------------------ | ----------------------------------------------- | ------- |
| POST   | `/api/answer/create`           | สร้างคำตอบ (ต้องมี `question_id` และ `content`)    |         |
| GET    | `/api/answer/:questionId`      | ดึงคำตอบทั้งหมดตามคำถาม                            |         |
| DELETE | `/api/answer/delete/:answerId` | ลบคำตอบ                                         |         |
| GET    | `/api/answer/:id/vote`         | ดึงคะแนนโหวตคำตอบ                                |         |
| POST   | `/api/answer/:id/vote`         | โหวตคำตอบ (body: \`{ value: 1                   | -1 }\`) |
```
