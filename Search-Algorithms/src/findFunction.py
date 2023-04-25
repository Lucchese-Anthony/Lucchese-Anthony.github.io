import os
import re

def extract_function_names(file_path):
    with open(file_path) as f:
        content = f.read()
    # Use regular expression to find all function names in file
    function_names = re.findall(r'function\s+(\w+)\s*\(', content)
    return function_names

def search_for_functions(folder_path):
    # Search for all .js files in folder and subfolders
    for root, dirs, files in os.walk(folder_path):
        for file_name in files:
            if file_name.endswith('.js'):
                file_path = os.path.join(root, file_name)
                function_names = extract_function_names(file_path)
                # Print the function names found in file
                print(f'Functions in {file_path}: {", ".join(function_names)}')

# Example usage
search_for_functions('.')