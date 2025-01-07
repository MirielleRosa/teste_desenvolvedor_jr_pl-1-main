import os
from fastapi import FastAPI
from langchain_openai import OpenAI

app = FastAPI()

class LLMService:
    def __init__(self):
        # Aqui assumimos que há uma variável de ambiente HF_TOKEN configurada.
        self.llm = OpenAI(
            temperature=0.5,
            top_p=0.7,
            api_key=os.getenv("HF_TOKEN"),  # type: ignore
            base_url="https://api-inference.huggingface.co/models/Qwen/Qwen2.5-72B-Instruct/v1",
        )

    def summarize_text(self, text: str, lang: str) -> str:

        prompts = {
            "pt": f"Resuma o seguinte texto em português em poucas linhas, fornecendo apenas o resumo traduzido, sem introduções, conclusões ou comentários adicionais:\n\n{text}",
            "en": f"Summarize the following text in English in a few lines, providing only the translated summary, without introductions, conclusions, or additional comments:\n\n{text}",
            "es": f"Resume el siguiente texto en español en pocas líneas, proporcionando solo el resumen traducido, sin introducciones, conclusiones ni comentarios adicionales:\n\n{text}",
        }

        if lang not in prompts:
            raise ValueError("Unsupported language")
        prompt = prompts[lang]
        try:
            response = self.llm.invoke(prompt)
            return response.strip()  
        except Exception as e:
            raise RuntimeError(f"Error generating summary: {str(e)}")
