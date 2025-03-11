from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback  # 添加这行来获取详细错误信息
os.environ["OPENAI_API_KEY"] = "sk-m5gehqK6mQumhQLf1275Db4cF85640Db990bF5010840F613"
os.environ["OPENAI_BASE_URL"] = "https://vip.yi-zhan.top/v1"
from openai import OpenAI

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"), base_url=os.environ.get("OPENAI_BASE_URL"))

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        print("Received message:", user_message)  # 添加日志

        if not user_message:
            return jsonify({
                "success": False,
                "error": "No message provided"
            }), 400

        # 调用OpenAI API
        try:
            response = client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": user_message}
                ]
            )
            print("OpenAI response:", response)  # 添加日志
        except Exception as api_error:
            print("OpenAI API error:", str(api_error))  # 添加日志
            return jsonify({
                "success": False,
                "error": f"OpenAI API error: {str(api_error)}"
            }), 500

        ai_response = response.choices[0].message.content
        print("AI response:", ai_response)  # 添加日志

        return jsonify({
            "success": True,
            "response": ai_response
        })
    
    except Exception as e:
        print("Error:", str(e))  # 添加日志
        print("Traceback:", traceback.format_exc())  # 添加详细错误跟踪
        return jsonify({
            "success": False,
            "error": f"Server error: {str(e)}\n{traceback.format_exc()}"
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)