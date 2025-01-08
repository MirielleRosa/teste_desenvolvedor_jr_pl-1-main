import request from "supertest";
import app from "../src/app";
import "dotenv/config.js";

describe('Integration', () => {
  test('should create a new task', async () => {
    const response = await request(app).post("/tasks").send({
        text: "Diagnósticos médicos e decisões jurídicas: o papel da IA\nA justiça e a Medicina são considerados campos de alto risco. Neles é mais urgente do que em qualquer outra área estabelecer sistemas para que os humanos tenham sempre a decisão final.\nOs especialistas em IA trabalham para garantir a confiança dos usuários, para que o sistema seja transparente, que proteja as pessoas e que os humanos estejam no centro das decisões.\nAqui entra em jogo o desafio do 'doutor centauro'. Centauros são modelos híbridos de algoritmo que combinam análise formal de máquina e intuição humana.\nUm 'médico centauro + um sistema de IA' melhora as decisões que os humanos tomam por conta própria e que os sistemas de IA tomam por conta própria.\nO médico sempre será quem aperta o botão final; e o juiz quem determina se uma sentença é justa.",
        lang: "en"
    })
    expect(response.status).toBe(201)
  });

  test('should not create a new task with invalid lang', async () => {
    const response = await request(app).post("/tasks").send({
        text: "Diagnósticos médicos e decisões jurídicas: o papel da IA\nA justiça e a Medicina são considerados campos de alto risco. Neles é mais urgente do que em qualquer outra área estabelecer sistemas para que os humanos tenham sempre a decisão final.\nOs especialistas em IA trabalham para garantir a confiança dos usuários, para que o sistema seja transparente, que proteja as pessoas e que os humanos estejam no centro das decisões.\nAqui entra em jogo o desafio do 'doutor centauro'. Centauros são modelos híbridos de algoritmo que combinam análise formal de máquina e intuição humana.\nUm 'médico centauro + um sistema de IA' melhora as decisões que os humanos tomam por conta própria e que os sistemas de IA tomam por conta própria.\nO médico sempre será quem aperta o botão final; e o juiz quem determina se uma sentença é justa.",
        lang: "rs"
    });
    expect(response.status).toBe(400)
    expect(response.body.error).toBe("Language not supported")
  });
});