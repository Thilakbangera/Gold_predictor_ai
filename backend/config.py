import toml
import os

def load_secrets():
    # Adjust path if your .streamlit is inside project root
    secret_path = os.path.join(os.getcwd(), ".streamlit", "secrets.toml")
    if not os.path.exists(secret_path):
        raise FileNotFoundError("secrets.toml not found in .streamlit folder")
    return toml.load(secret_path)
