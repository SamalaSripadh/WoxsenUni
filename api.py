from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'CORS preflight response'}), 200

    if request.method == 'POST':
        user_input = request.json.get('message')
        if not user_input:
            return jsonify({'error': 'No message provided'}), 400
        try:
            result = subprocess.run(['ollama', 'run', 'digi'], input=user_input, text=True, capture_output=True)
            if result.returncode != 0:
                return jsonify({'error': 'Error running the model'}), 500
            return jsonify(result.stdout.strip()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'message': 'Please send a POST request with a message'}), 405

if __name__ == '__main__':
    app.run(debug=True)