import socket
import time
from email.utils import formatdate, parsedate_to_datetime

# Cache dictionary to store responses with their last modified times
cache = {
    200: "OK",
    404: "Not Found",
    405: "Method Not Allowed",
    304: "Not Modified"
    }


def create_http_response(status_code, body, last_modified=None):
    """
    Implement the HTTP response formatting.

    Parameters:
        status_code (int): The HTTP status code to return.
        body (str): The body of the response.
        last_modified (str): The string representation of the last modified time,
                             formatted as an RFC 2822 date string.
    
    Returns:
        bytes: The complete HTTP response in bytes, ready to be sent over the network.
    
    Example of a formatted last_modified string: 'Tue, 15 Nov 1994 12:45:26 GMT'
    This is the standard format for HTTP date/time values.
    """
    response_line = f"HTTP/1.1 {status_code} {cache[status_code]}\r\n"
    headers = "Content-Type: text/plain\r\n"
    headers += f"Content-Length: {len(body)}\r\n"
    headers += "Cache-Control: max-age=10\r\n"
    if last_modified:
        headers += f"Last-Modified: {last_modified}\r\n"
    headers += "\r\n"  # End of headers
    return (response_line + headers + body).encode()

def handle_if_modified_since(request_headers, path):
    """ Handle the If-Modified-Since header to determine if a 304 response should be returned. """
    for header in request_headers:
        if header.startswith("If-Modified-Since"):
            date_str = header.split(": ", 1)[1]
            if_modified_since_date = parsedate_to_datetime(date_str)
            if path in cache and 'last_modified' in cache[path]:
                last_modified_date = parsedate_to_datetime(cache[path]['last_modified'])
                if last_modified_date <= if_modified_since_date:
                    return create_http_response(304, "", cache[path]['last_modified'])
    return None

def main():
    HOST, PORT = 'localhost', 45411  # Server configuration
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.bind((HOST, PORT))
    server_socket.listen(1)
    print(f"Serving HTTP on port {PORT} ...")

    try:
        while True:
            client_connection, client_address = server_socket.accept()
            request = client_connection.recv(1024).decode('utf-8')
            request_headers = request.split('\r\n')
            first_line = request_headers[0]
            method, path, _ = first_line.split()

            if method == "GET":
                response = handle_if_modified_since(request_headers, path)
                if response is None:
                    if path == "/":
                        body = "Hello, World!"
                        last_modified = formatdate(time.time(), usegmt=True)
                        response = create_http_response(200, body, last_modified)
                        cache[path] = {'body': body, 'last_modified': last_modified}
                    else:
                        body = "404 Not Found"
                        response = create_http_response(404, body)
                client_connection.send(response)
            else:
                body = "405 Method Not Allowed"
                response = create_http_response(405, body)
                client_connection.send(response)
            
            client_connection.close()
    finally:
        server_socket.close()

if __name__ == '__main__':
    main()