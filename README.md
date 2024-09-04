# Web Scraping Application with Drag-and-Drop Node Interface

## Project Overview
This is a web application that allows users to scrape data from websites and generate summaries through an intuitive drag-and-drop interface. Users can add two types of nodes to the canvas:
- **Web Scraping Node**: Allows users to input a URL to scrape content from.
- **Summary Node**: Outputs a summary of the scraped content using the Gemini API when connected to a Web Scraping Node.

The application is built using Flask for the backend and React for the frontend, with web scraping powered by BeautifulSoup and the Gemini API handling text summarization.

## Technologies Used
- **Backend**: Flask, BeautifulSoup
- **Frontend**: React, React Flow (for drag-and-drop functionality)
- **API**: Gemini API (for summarizing scraped data)
- **Deployment**: Vercel

## Key Features
- Drag-and-drop interface using **React Flow**
- Real-time web scraping and summary generation
- Integration with external APIs (Gemini API for summarization)

## Obstacles Encountered
1. **Learning React Flow**: As this was my first time using React Flow, it required some time to explore its documentation and features.
2. **Setting up communication between nodes**: Establishing communication between the custom nodes (Web Scraping and Summary nodes) was challenging. 
   - **React Flow Hooks**: I used `useHandleConnections` in both nodes to manage connections, and implemented `onConnect` and `onDisconnect` callbacks.
   - In the Summary Node, when a connection is established, the `onConnect` callback sets a state variable `subscribedNode` with the source node's ID. I then used the `useNodesData` hook to access data from the connected node and trigger an update using `useEffect`. This data exchange was managed through a function passed in the `data` prop of the connected Web Scraping Node.
   - The Web Scraping Node checks for this function and, if available, passes the scraped data to the Summary Node. The `onDisconnect` callback resets the communication channel by clearing the state.
3. **React Flow Hook Experimentation**: It took experimentation with different hooks (e.g., `useHandleConnections`, `useNodesData`, and `useEffect`) to find an efficient solution for enabling communication between nodes.

## Deployed Application
You can access the live application here: [Web-Scraper](https://web-scraper-weld-tau.vercel.app/)
