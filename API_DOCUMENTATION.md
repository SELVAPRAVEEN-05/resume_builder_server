# Resume Builder Backend API

A complete backend system for a resume builder application using Node.js, Express, MongoDB, and LaTeX PDF generation.

## Features

- **User Authentication**: Register, login with JWT tokens
- **Resume Management**: Create, read, update, and delete resumes
- **Template System**: Multiple LaTeX templates for resume generation
- **PDF Generation**: Convert resume data to PDF using LaTeX
- **Multi-item Support**: Support for multiple education, experience, projects, and certifications
- **Data Validation**: Input validation for all endpoints
- **Error Handling**: Comprehensive error handling and logging

## Project Structure

```
src/
├── controllers/        # Business logic
│   ├── auth.controller.js
│   ├── resume.controller.js
│   └── template.controller.js
├── models/            # Database schemas
│   ├── user.js
│   ├── resume.js
│   ├── template.js
│   ├── personalDetails.js
│   ├── education.js
│   ├── experience.js
│   ├── skill.js
│   ├── language.js
│   ├── project.js
│   └── certification.js
├── routes/            # API routes
│   ├── auth.routes.js
│   ├── resume.route.js
│   └── template.routes.js
├── middleware/        # Custom middleware
│   ├── auth.middleware.js
│   └── validation.middleware.js
├── services/          # Business logic helpers
│   └── latex.service.js
└── templates/         # LaTeX templates
    ├── jack.tex
    └── modern.tex
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- pdflatex (for PDF generation)
  - Windows: Install MiKTeX or TeX Live
  - Linux: `sudo apt-get install texlive-latex-base texlive-fonts-recommended`
  - macOS: `brew install basictex`

### Setup

1. Clone the repository
```bash
git clone <repo-url>
cd resume-builder-backend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your_secure_secret_key
CORS_ORIGIN=http://localhost:3000
```

5. Start MongoDB
```bash
# If using MongoDB locally
mongod
```

6. Seed database (optional)
```bash
npm run seed
```

7. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

Server runs on: `http://localhost:5000`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "message": "User created"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": "507f1f77bcf86cd799439011"
}
```

### Templates

#### Get All Templates
```http
GET /api/templates
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Modern",
    "description": "Modern resume template",
    "filePath": "modern.tex",
    "isActive": true,
    "previewUrl": "https://example.com/preview.png"
  }
]
```

#### Get Single Template
```http
GET /api/templates/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Modern",
  "description": "Modern resume template",
  "filePath": "modern.tex",
  "isActive": true
}
```

#### Create Template (Admin)
```http
POST /api/templates
Content-Type: application/json

{
  "name": "Professional",
  "description": "Professional resume template",
  "filePath": "professional.tex",
  "previewUrl": "https://example.com/preview.png"
}

Response: 201 Created
```

### Resume Management

#### Create Resume
```http
POST /api/resume
Authorization: Bearer <token>
Content-Type: application/json

{
  "templateId": "507f1f77bcf86cd799439011",
  "objective": "Seeking a senior developer position",
  "personal": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "website": "https://johndoe.com"
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
      "description": "Developed web applications using React and Node.js"
    }
  ],
  "skills": [
    "507f1f77bcf86cd799439014",
    "507f1f77bcf86cd799439015"
  ],
  "languages": [
    "507f1f77bcf86cd799439016"
  ],
  "projects": [
    {
      "title": "E-commerce Platform",
      "description": "Built a full-stack e-commerce platform",
      "techStack": "React, Node.js, MongoDB"
    }
  ],
  "certifications": [
    {
      "name": "AWS Solutions Architect",
      "date": "2022-06-15",
      "description": "AWS certification"
    }
  ]
}

Response: 201 Created
{
  "message": "Resume created successfully",
  "resumeId": "507f1f77bcf86cd799439017"
}
```

#### Get My Resume
```http
GET /api/resume/me
Authorization: Bearer <token>

Response: 200 OK
{
  "resume": {
    "_id": "507f1f77bcf86cd799439017",
    "userId": "507f1f77bcf86cd799439011",
    "templateId": {...},
    "objective": "Seeking a senior developer position",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "personal": {...},
  "education": [...],
  "experience": [...],
  "skills": [...],
  "languages": [...],
  "projects": [...],
  "certifications": [...]
}
```

#### Update Resume
```http
PUT /api/resume
Authorization: Bearer <token>
Content-Type: application/json

{
  "objective": "Updated objective",
  "personal": {...},
  "education": [...],
  "experience": [...],
  "skills": [...],
  "languages": [...],
  "projects": [...],
  "certifications": [...]
}

Response: 200 OK
{
  "message": "Resume updated successfully",
  "resumeId": "507f1f77bcf86cd799439017"
}
```

#### Download Resume as PDF
```http
GET /api/resume/pdf
Authorization: Bearer <token>

Response: 200 OK
[PDF File Stream]
```

#### Delete Resume
```http
DELETE /api/resume
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Resume deleted successfully"
}
```

## Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Resume
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  templateId: ObjectId (ref: Template),
  objective: String,
  createdAt: Date,
  updatedAt: Date
}
```

### PersonalDetails
```javascript
{
  _id: ObjectId,
  resumeId: ObjectId (ref: Resume),
  fullName: String,
  email: String,
  phone: String,
  address: String,
  linkedin: String,
  github: String,
  website: String,
  dateOfBirth: String,
  imageUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Education
```javascript
{
  _id: ObjectId,
  resumeId: ObjectId (ref: Resume),
  collegeId: ObjectId (ref: College),
  graduationYear: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Experience
```javascript
{
  _id: ObjectId,
  resumeId: ObjectId (ref: Resume),
  companyId: ObjectId (ref: Company),
  jobTitle: String,
  startDate: String (YYYY-MM-DD),
  endDate: String (YYYY-MM-DD),
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

All endpoints return standard error responses:

```json
{
  "message": "Error description",
  "error": "Additional error details (if available)"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `404` - Not Found
- `500` - Server Error

## Development

### Running in Development Mode
```bash
npm run dev
```
Auto-restarts on file changes using nodemon.

### Creating New Models
1. Create file in `src/models/`
2. Define Mongoose schema
3. Export model

### Creating New Routes
1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Import and use in `src/app.js`

## Security Considerations

1. **JWT Tokens**: Tokens expire after 7 days
2. **Password Hashing**: Passwords hashed using bcryptjs with 10 salt rounds
3. **CORS**: Configure allowed origins in .env
4. **Input Validation**: All inputs validated before processing
5. **Error Messages**: Generic error messages in production

## Future Enhancements

- [ ] Email verification on registration
- [ ] OAuth integration (Google, LinkedIn)
- [ ] Template customization UI
- [ ] Multiple resumes per user
- [ ] Resume sharing via link
- [ ] Analytics dashboard
- [ ] Rate limiting
- [ ] File upload for profile picture
- [ ] Social authentication
- [ ] Resume templates preview

## Troubleshooting

### PDF Generation Issues

**Issue**: `PDF generation failed: Command not found`
**Solution**: Install pdflatex
```bash
# Windows: Install MiKTeX or TeX Live from https://tug.org/texlive/
# Linux: sudo apt-get install texlive-latex-base
# macOS: brew install basictex
```

### MongoDB Connection Error

**Issue**: `Cannot connect to MongoDB`
**Solution**: 
1. Ensure MongoDB is running
2. Check MONGO_URI in .env
3. Verify connection string syntax

### Token Expired Error

**Issue**: `Invalid token`
**Solution**: User needs to login again to get a new token

## License

ISC

## Support

For issues and questions, please open an issue on the repository.
