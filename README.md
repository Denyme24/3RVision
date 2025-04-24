#  3RVision - See Your Products' Sustainable Future 🌱

> "Every product tells a story of sustainability. With 3RVision, we help you write its next chapter via reuse, recycling and resale."

## 🧠 Introduction

3RVision is a comprehensive sustainability analysis platform that helps users make informed decisions about product lifecycle management. By analyzing product images, our platform provides detailed insights into how you can extend a product's life through three key sustainability pillars: reuse, recycle, and resale. Whether you're looking to dispose of items responsibly or make sustainable purchasing decisions, 3RVision guides you towards environmentally conscious choices.



## 🔍 Problem Statement

In today's consumer-driven world, we face several critical challenges:
- Lack of awareness about proper product disposal methods
- Difficulty in identifying recycling and reuse opportunities
- Limited access to local sustainability resources
- Environmental impact of improper product disposal
- Complex decision-making process for sustainable product lifecycle management



## ✅ Solution Overview

3RVision addresses these challenges through:

### 1. Image-Based Analysis
- **Smart Capture**: Take photos or upload product images
- **Material Recognition**: Advanced ML models identify product composition
- **Lifecycle Analysis**: Get detailed insights on:
  - Reuse potential and creative repurposing ideas
  - Recycling options and local facilities
  - Resale value and market opportunities
  - Biodegradability assessment

### 2. Browser Extension
- **Quick Analysis**: Get instant sustainability insights while browsing
- **Seamless Integration**: Works alongside your browsing experience
- **Consistent Experience**: Same analysis quality as the web platform
- **Easy Access**: One-click access to detailed sustainability information

### 3. Community Forum
- Share sustainability experiences
- Discuss eco-friendly practices
- Create and participate in polls
- Share images and tips
- Connect with like-minded individuals



### 🛠️ Tech Stack

| Category      | Technologies                                                                 |
|---------------|-------------------------------------------------------------------------------|
| **Frontend**  | Next.js 15.2.4, React 19, TypeScript, TailwindCSS, Framer Motion, Three.js    |
| **Backend**   | Go (Golang), Gin Web Framework, AWS S3, MongoDB                               |
| **Extension** | JavaScript, Chrome Extension Manifest V3, Content Scripts                     |
| **ML Component** | Python, Computer Vision Models, Flask Server                               |



## 🧩 Architecture

![PHOTO-2025-04-12-10-45-59](https://github.com/user-attachments/assets/b7fae772-8371-4276-b5a1-8c14538af0f0)





## ☘️ Installation

### Prerequisites
- Node.js 18+
- Go 1.21+
- Python 3.10 or further
- Chrome/Edge browser
- AWS account
- MongoDB

### Run Frontend
```bash
cd frontend
npm install
npm run dev
```

### Run Backend 
```bash
cd backend
go mod download
go run main.go
```

### Run ML model
```bash
cd ml
py -3.10 -m venv myenv
source myenv/bin/activate  # For macOS/Linux
# OR
myenv\Scripts\activate  # For Windows
pip install --upgrade pip
pip install -r requirements.txt
# tensorflow-intel==2.18.0  ← not supported on macOS ARM (remove this line in requirements.txt)
python app.py or python3 app.py

#For conda environment
conda create --name myenv python=3.10
conda activate myenv          
```

### Extension Setup
1. Open Chrome/Edge
2. Go to Extensions page
3. Enable Developer mode
4. Load unpacked extension from the `extension` directory

### Environment Variables
Create `.env` files in respective directories:

#### Frontend (.env.local)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=secret_key _for_JWT_tokens
EMAIL_USER=email_username
EMAIL_PASS=email_password
GEMINI_API_KEY=your_gemini_api_key
```

#### Backend (.env)
```
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_bucket_name
GEMINI_API_KEY=your_api_key
FLASK_SERVER_URL=http://localhost:5001
PORT=8080
```


## 👥 Contributors

[Khushi Agarawal](https://github.com/khushiiagrawal)<br/>
[Arpit Srivastava](https://github.com/Arpit529Srivastava)<br/>
[Naman Raj](https://github.com/Denyme24)<br/>
[Shreyansh Pathak](https://github.com/Shrey327?tab=following)<br/>

### 📄 License

This project is licensed under the [MIT License](LICENSE).
