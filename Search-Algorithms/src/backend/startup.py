import subprocess
import os
import sys

def main():
    subprocess.call(['python','-m', 'venv', 'venv'])
    subprocess.call(['source', 'venv/bin/activate'])
    # start up backend
    subprocess.call(['pip', 'install', '-r', 'requirements.txt'])
    subprocess.call(['uvicorn', 'main:app', '--reload'])
    print("Backend started")
    print("current working directory: ", os.getcwd())
    

if __name__ == "__main__":
    main()
