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
            "pt": f"""Você é um assistente de tradução e resumo. Dado um texto, sua tarefa é:
                    1. Resumir o texto de forma concisa e clara em poucas palavras.
                    2. Traduzir o resumo para o idioma solicitado (Português, no caso).

                    Texto original: {text}
                    Idioma de tradução: Português

                    **Retorne apenas o resumo traduzido**, sem explicações ou qualquer outro texto adicional. Apenas o resumo em português!""",
            "en": f"""You are an assistant for translation and summarization. Given a text, your task is:
                    1. Summarize the text in a concise and clear manner in a few words.
                    2. Translate the summary to the requested language (English in this case).

                    Original text: {text}
                    Translation language: English

                    **Return only the translated summary**, without explanations or any extra text. Just the summary in English!""",
            "es": f"""Eres un asistente de traducción y resumen. Dado un texto, tu tarea es:
                    1. Resumir el texto de forma concisa y clara en pocas palabras.
                    2. Traducir el resumen al idioma solicitado (Español en este caso).

                    Texto original: {text}
                    Idioma de traducción: Español

                    **Devuelve solo el resumen traducido**, sin explicaciones ni texto adicional. ¡Solo el resumen en español!"""
        }

        if lang not in prompts:
            raise ValueError("Unsupported language")
        prompt = prompts[lang]
        try:
            response = self.llm.invoke(prompt)
            return response.strip()  
        except Exception as e:
            raise RuntimeError(f"Error generating summary: {str(e)}")