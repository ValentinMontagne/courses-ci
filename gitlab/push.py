import subprocess

def run_command(command):
    """Run a shell command and print its output."""
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
    else:
        print(result.stdout)

def git_add():
    """Stage all changes for commit."""
    run_command("git add .")

def git_commit(message):
    """Commit staged changes with a message."""
    run_command(f'git commit -m "{message}"')

def git_push(branch="main"):
    """Push committed changes to the remote repository."""
    run_command(f"git push origin {branch}")

if __name__ == "__main__":
    git_add()
    git_commit('ajout du code')
    git_push()
    print("Code pushed to the remote repository.")