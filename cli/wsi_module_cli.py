message = """the module name must be separated by spaces,
and it will be converted to the required format.
for example: 'module name' will be converted to 'ModuleName'
"""

import os
import re
import shutil
import argparse


print(message)
module_name = input("Enter the module name: ")

module_name_words = module_name.split()
module_name = "".join([word.capitalize() for word in module_name_words])
module_split_name = "-".join([word.lower() for word in module_name_words])
module_entity_name = module_name[0].lower() + module_name[1:]
print("module_name: ", module_name)
print("module_split_name: ", module_split_name)
print("module_entity_name: ", module_entity_name)

#check if already exists a module with the same name
#crud dir module 
current_dir = os.path.dirname(os.path.abspath(__file__))
#curent_dir + ../src/crud/
crud_dir = os.path.join(current_dir, "../src/crud/")
crud_dir = os.path.abspath(crud_dir)

#dirs in crud dir
dirs = os.listdir(crud_dir)
print("current cruds: ", dirs)
if module_split_name in dirs:
    print("module already exists")
    exit()

#create module dir
module_dir = os.path.join(crud_dir, module_split_name)
os.mkdir(module_dir)

print("module dir created: ", module_dir)

#read template files as strings
template_dir = os.path.join(current_dir, "crud_templates")
print("template dir: ", template_dir)
template_files = os.listdir(template_dir)
print("template files: ", template_files)

for template_file in template_files:
    print("template file: ", template_file)
    with open(os.path.join(template_dir, template_file), "r") as f:
        template_content = f.read()
        template_content = template_content.replace("CliMod", module_name)
        template_content = template_content.replace("cliModEntity", module_entity_name)
        template_content = template_content.replace("cli-mod", module_split_name)
        output_file = template_file.replace("cli-mod", module_split_name)
        with open(os.path.join(module_dir, output_file), "w") as f:
            print("writing file: ", os.path.join(module_dir, output_file))
            f.write(template_content)

print("module created successfully")

            