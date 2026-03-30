# API Tester

A simple, client-side API testing tool like Postman - test your REST APIs directly from your browser.

## Features

- **HTTP Methods**: Support for GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS
- **Request Builder**: 
  - URL input with automatic protocol detection
  - Query parameters editor (key-value pairs)
  - Headers editor (key-value pairs)
  - Request body support (JSON, Form Data, Raw)
- **Authentication**:
  - Bearer Token
  - Basic Auth
  - API Key (Header or Query Param)
- **Response Viewer**:
  - Response body with JSON formatting
  - Response headers display
  - Status code and response time
  - Response size indicator
- **History**: Save and load previous requests
- **Dark/Light Mode**: Toggle between themes
- **100% Client-side**: All requests are made from your browser, no data sent to any server

## Usage

1. Select HTTP method (GET, POST, etc.)
2. Enter the API endpoint URL
3. Add query parameters, headers, or body as needed
4. Configure authentication if required
5. Click "Send" to make the request
6. View response body, headers, and metadata

## Features in Detail

### Request Configuration
- **Params**: Add query parameters that will be appended to the URL
- **Headers**: Add custom HTTP headers
- **Body**: Choose between JSON, Form Data, or Raw body types
- **Auth**: Configure authentication (Bearer, Basic, API Key)

### Response Handling
- **Body Tab**: View response body with automatic JSON formatting
- **Headers Tab**: View all response headers
- **Status Badge**: Visual indicator of success (2xx) or error (4xx/5xx)
- **Response Time**: See how long the request took
- **Response Size**: View the size of the response

### History
- Automatically saves last 50 requests
- Load previous requests with one click
- Clear all history option

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests
- Local Storage for history persistence

## Browser Support

Works in all modern browsers that support:
- Fetch API
- CSS Grid
- CSS Variables
- ES6 Classes

## License

Created by Heru Rusdianto with AI Assistance

© 2026 All rights reserved
