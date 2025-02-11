# AskDocsAI

## Overview

AskDocsAI is an AI-powered application that allows users to upload a document via a drag-and-drop feature and ask questions related to its content. The application will parse and analyze the document, leveraging AI to provide relevant answers.

### Problem

Many professionals and researchers work with large documents but struggle to extract relevant information efficiently. Instead of manually scanning through pages, AskDocsAI enables users to query their documents and receive instant answers.

### User Profile

- Students and educators looking for quick insights from academic papers.
- Professionals reviewing lengthy reports or contracts.
- Researchers analyzing large text datasets.
- Casual users who need a fast way to retrieve information from documents.

### Features

### MVP Features (2-week timeline)

- Drag-and-drop document upload (initially supporting .txt files).
- AI-powered Q&A based on document content.
- Clean, responsive UI built with React and Tailwind CSS.
- Animated interactions using Framer Motion.

### Future Enhancements

- Support for additional file types (.pdf, .docx, etc.).
- User authentication and document history.
- Improved AI performance with document summarization.
- Integration with cloud storage (Firebase, AWS S3, etc.).

## Implementation

### Tech Stack

### Frontend

- React
- Tailwind CSS (styling option)
- Framer Motion (animations)
- Styled-Components (alternative styling option)

### Backend

- Node.js & Express (API server)
- Knex.js (SQL query builder
- MySQL (database for storing user queries and document metadata)
- fs (File System) (handling file uploads)

### AI Integration Options (Ranked)

1. Steamship (Preferred)
    - Provides easy-to-use APIs for AI-based document analysis.
    - Fast setup and good developer support.
2. OpenAI API (GPT-based Q&A)
    - High-quality language model but may have rate limits.
    - Requires API key management and cost considerations.
3. LangChain + Local LLM (e.g., Llama 2 or GPT-4-All)
    - Ideal for privacy-focused applications.
    - Requires additional infrastructure for hosting the model.

## Development Process

### Week 1: Core Implementation

- Set up server
    - Initialize Express project with routing and placeholder 200 responses.
    - Configure project structure.
- Database setup
    - Create MySQL database and tables.
    - Implement migrations for storing document metadata and queries.
    - Seed database with sample data.
- Frontend:
    - Set up React project with Tailwind CSS and Framer Motion.
    - Implement drag-and-drop document upload.
    - Design a basic chat-style Q&A interface.
- Backend:
    - Set up Node.js server with Express.
    - Implement file upload handling using fs.
    - Integrate Steamship API for AI-powered responses.
    - Establish API routes for document processing and queries.


### Week 2: Refinements & Testing

- Frontend:
    - Enhance UI/UX with animations using Framer Motion.
    - Implement error handling and loading states.
    - Optimize frontend performance.
- Backend:
    - Optimize API request handling.
    - Implement caching for faster responses.
    - Write basic test cases.
- Feature Implementation
    - Ask a question
        - Implement form to submit a question.
        - Create POST /ask endpoint.

### Sitemap

- Home page with drag-and-drop and AI chat features

### Mockups

#### Home Page
![Mockups of the website's landing or homepage.](/assets/mockups/homepage.png)

### Data

![erDiagrram of the data for the site.](/assets/mockups/erDiagram.png)

### Endpoints

**POST /upload**

- Uploads a document and stores metadata.
- Supported formats (MVP): .txt

Response:
```
[
    {
        "documentId": "12345",
        "status": "uploaded"
    },
    ...
]
```

**POST /ask**

- Accepts a question and returns an AI-generated response.

Request:
```
{
    "documentId": "12345",
    "question": "What is the main topic?"
}
```
Response:
```
[
    {
        "answer": "The document discusses AI applications in healthcare."
    },
    ...
]
```

## Roadmap

### Week 1
- Create server
    - Initialize Express project with routing and placeholder responses.
- Database setup
    - Create database schema and migrations.
    - Seed database with sample document data.
- Feature: Upload document
    - Implement drag-and-drop document upload.
    - Store document metadata in the database.
- Feature: Ask a question
    - Implement basic chat-style Q&A interface.
    - Create /ask endpoint for AI-generated responses.

### Week 2
- Enhance UI/UX
    - Implement animations with Framer Motion.
    - Add error handling and loading states.
- Optimize Backend
    - Improve API performance and request handling.
    - Implement caching for faster responses.
- Feature: View past queries (Future Consideration)
    - Implement UI for query history.
    - Store past queries in the database.
- Feature: Authentication (Future Consideration)
    - Implement login and registration pages.
    - Create JWT-based authentication.

- Bug fixes & Final Testing

- DEMO DAY 🎉

## Nice-to-haves

- Adding authentication to save user history.
    - User sign up & Login
- Forgot password functionality
- Enhancing AI responses with summarization features.
- UI/UX improvements based on user feedback.
- Unit and Integration Tests
- more security considerations with no use of third party api