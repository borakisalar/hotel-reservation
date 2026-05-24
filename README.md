# Hotel Reservation App (Project 2)

This is a Next.js and React-based hotel reservation application. It uses `json-server` to mock a RESTful backend API.

## Requirements

To run this project on any machine (Windows, Mac, or Linux), you will need to install **Node.js**:
1. Download Node.js from the official website: https://nodejs.org/
2. Run the installer and keep the default settings. It will install `node` and `npm` (Node Package Manager).

## How to Run

1. **Extract the Project Folder:**
   If you received this project as a ZIP file, extract it to a folder on your computer.

2. **Open the Command Prompt or Terminal:**
   - On Windows: Press `Windows + R`, type `cmd`, and press Enter.
   - Navigate to the project directory using the `cd` command. For example:
     ```bash
     cd C:\path\to\hotel-reservation
     ```

3. **Install Dependencies:**
   Run the following command to download and install all required packages:
   ```bash
   npm install
   ```

4. **Start the Application:**
   Run this command to start both the Next.js frontend and the `json-server` backend at the same time:
   ```bash
   npm run dev
   ```

5. **Open the Application:**
   Once the server starts, open your web browser and go to:
   http://localhost:3000

## Notes
- The application runs on **port 3000**, and the `json-server` backend runs on **port 3001**.
- If you see an error saying the port is already in use, make sure you don't have another server running on those ports.
- The project data is stored locally in the `db.json` file.
