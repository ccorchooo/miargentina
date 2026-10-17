#!/usr/bin/env python3
"""Serve this demo locally using only the Python standard library."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description="Abrir Mi espacio demo localmente")
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--host", default="127.0.0.1")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent
    handler = partial(SimpleHTTPRequestHandler, directory=str(root))
    with ThreadingHTTPServer((args.host, args.port), handler) as server:
        print(f"Mi espacio DEMO: http://{args.host}:{args.port}", flush=True)
        print("Para cerrar el servidor, presioná Ctrl+C.", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
