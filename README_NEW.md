# Resume Builder Backend 🚀

A complete, production-ready backend system for a resume builder application using Node.js, Express, MongoDB, and LaTeX PDF generation.

## 🎯 Features

- ✅ **User Authentication**: Secure register/login with JWT tokens
- ✅ **Resume Management**: Full CRUD operations for resumes
- ✅ **Template System**: Multiple LaTeX templates with easy switching
- ✅ **PDF Generation**: Convert resume data to professional PDF documents
- ✅ **Multi-item Support**: Multiple educations, experiences, projects, certifications
- ✅ **Data Validation**: Comprehensive input validation
- ✅ **Error Handling**: Detailed error messages and logging
- ✅ **CORS Enabled**: Ready for frontend integration
- ✅ **Seed Data**: Sample data for testing

## 🏗️ Architecture

```
resume-builder-backend/
├── src/
│   ├── controllers/           # Business logic
│   │   ├── auth.controller.js
│   │   ├── resume.controller.js
│   │   └── template.controller.js
│   ├── models/               # Database schemas
│   │   ├── user.js
│   │   ├── resume.js
│   │   ├── template.js
│   │   └── ... (11 models total)
│   ├── routes/               # API endpoints
│   │   ├── auth.routes.js
│   │   ├── resume.route.js
│   │   └── template.routes.js
│   ├── middleware/           # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   ├── services/             # Business logic helpers
│   │   └── latex.service.js
│   ├── templates/            # LaTeX templates
│   │   ├── jack.tex
│   │   └── modern.tex
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   └── app.js                # Express app setup
├── server.js                 # Server entry point
├── seed.js                   # Database seeding
├── package.json
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have installed:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
3. **pdflatex** (for PDF generation)
   - **Windows**: Install [MiKTeX](https://miktex.org/) or [TeX Live](https://tug.org/texlive/)
   - **macOS**: `brew install basictex`
   - **Linux**: `sudo apt-get install texlive-latex-base texlive-fonts-recommended`

## 🚀 Quick Start

### 1️⃣ Clone & Install

```bash
git clone <repository-url>
cd resume-builder-backend
npm install
```

### 2️⃣ Configure Environment Variables

```bash
# Create .env file
cp .env.example .env
```

Edit `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_super_secret_key_change_in_production
CORS_ORIGIN=http://localhost:3000
```

### 3️⃣ Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

### 4️⃣ Seed Database (Optional)

```bash
npm run seed
```

This will create:
- 3 test users (all with password: `password123`)
- 10 programming skills
- 6 languages
- 4 colleges
- 8 companies
- 2 resume templates

### 5️⃣ Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server default URL: `http://localhost:5000`

## 🔌 API Quick Examples

### Register & Login

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Resume

```bash
curl -X POST http://localhost:5000/api/resume \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "templateId": "507f1f77bcf86cd799439011",
    "objective": "Seeking software engineer role",
    "personal": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "linkedin": "https://linkedin.com/in/johndoe",
      "github": "https://github.com/johndoe"
    },
    "education": [
      {
        "collegeId": "507f1f77bcf86cd799439012",
        "graduationYear": "2020"
      }
    ],
    "experience": [
      {
        "companyId": "507f1f77bcf86cd799439013",
        "jobTitle": "Senior Developer",
        "startDate": "2021-01-01",
        "endDate": "2023-12-31",
        "description": "Developed web applications"
      }
    ]
  }'
```

### Download Resume PDF

```bash
curl -X GET http://localhost:5000/api/resume/pdf \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --output resume.pdf
```

## 📚 Full API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete endpoint documentation.

### Main Endpoints:

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Create new user |
| POST | `/api/auth/login` | No | User login |
| GET | `/api/templates` | Yes | Get all templates |
| POST | `/api/resume` | Yes | Create resume |
| GET | `/api/resume/me` | Yes | Get user's resume |
| PUT | `/api/resume` | Yes | Update resume |
| GET | `/api/resume/pdf` | Yes | Generate PDF download |
| DELETE | `/api/resume` | Yes | Delete resume |

## 🔐 Security Features

- 🔒 **Password Hashing**: bcryptjs with 10 salt rounds
- 🎫 **JWT Authentication**: 7-day token expiration
- ✔️ **Input Validation**: All endpoints validate request data
- 🛡️ **CORS Protection**: Configurable allowed origins
- 📝 **Error Logging**: Detailed error tracking

## 💾 Database Schema

### Resume Workflow

```
User
  ↓
Resume (belongs to User)
  ├─→ PersonalDetails
  ├─→ Template
  └─→ Many other details
      ├─→ Education (via collegeId → College)
      ├─→ Experience (via companyId → Company)
      ├─→ ResumeSkill (via skillId → Skill)
      ├─→ ResumeLanguage (via languageId → Language)
      ├─→ Project
      └─→ Certification
```

## 🧪 Testing

### Test Credentials (after seeding)

```
Email: john@example.com
Email: jane@example.com
Email: test@example.com
Password: password123
```

### Using Postman/Thunder Client

1. Create new request collection
2. Set base URL: `http://localhost:5000/api`
3. Login first to get token
4. Use token in Authorization header

## 🚨 Error Handling

All API responses follow standard format:

**Success (2xx)**:
```json
{
  "message": "Success message",
  "data": {...}
}
```

**Error (4xx/5xx)**:
```json
{
  "message": "Error description",
  "error": "Detailed error info"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running or update `MONGO_URI` in `.env`

### pdflatex Not Found
```
Error: 'pdflatex' is not recognized
```
**Solution**: Install TeX distribution (MiKTeX, TeX Live, or MacTeX)

### Token Expired
```
Error: Invalid token
```
**Solution**: User needs to login again

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in `.env` or kill process using port 5000

## 📦 Deployment

### Heroku Deployment

1. Create `Procfile`:
```
web: npm start
```

2. Deploy:
```bash
heroku create your-app-name
git push heroku main
```

3. Set environment variables:
```bash
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
```

### Docker Deployment

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

2. Build and run:
```bash
docker build -t resume-builder .
docker run -p 5000:5000 resume-builder
```

## 🔄 Development Workflow

### Create New Endpoint

1. **Create Controller**:
```javascript
// src/controllers/myfeature.controller.js
exports.myFunction = async (req, res) => { ... };
```

2. **Create Routes**:
```javascript
// src/routes/myfeature.routes.js
router.post('/', auth, myFunction);
```

3. **Register in App**:
```javascript
// src/app.js
app.use('/api/myfeature', require('./routes/myfeature.routes'));
```

### Add New Model

1. Create schema in `src/models/mymodel.js`
2. Use in controller
3. Reference in routes

## 📋 Environment Variables Reference

```env
# Server
PORT                  # Default: 5000
NODE_ENV             # development|production

# Database
MONGO_URI            # MongoDB connection string

# Authentication
JWT_SECRET           # Secret key for JWT signing
JWT_EXPIRE           # Token expiration (default: 7d)

# CORS
CORS_ORIGIN          # Allowed frontend URL
```

## 🎓 Learning Resources

- **Express.js**: [expressjs.com](https://expressjs.com/)
- **MongoDB**: [docs.mongodb.com](https://docs.mongodb.com/)
- **JWT**: [jwt.io](https://jwt.io/)
- **LaTeX**: [learnlatex.org](https://www.learnlatex.org/)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## 📄 License

ISC

## 📞 Support

- 🐛 Report bugs via GitHub Issues
- 💡 Suggest features in Discussions
- 📧 Contact: [your-email]

## 🎯 Roadmap

- [ ] Email verification
- [ ] OAuth (Google, LinkedIn)
- [ ] Advanced template customization
- [ ] Resume analytics
- [ ] Share resume via link
- [ ] Multiple resumes per user
- [ ] Resume preview before PDF
- [ ] Rate limiting
- [ ] API documentation with Swagger

---

**Made with ❤️ for resume builders**
