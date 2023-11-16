from flask import Flask, jsonify, request

app = Flask(__name__)

lista_Todo = []
cont = 0

@app.route('/listar', methods=['GET'])
def Listar_Tarefa():
    for tarefa in lista_Todo: 
        cont += 1
        return jsonify(lista_Todo)

@app.route('/adicionar', methods=['POST'])
def Adicionar_Tarefa():
    item = request.json
    lista_Todo.append(f"ID:{cont} - TAREFA:{tarefa}")

if __name__ == '__main__':
    app.run(host="0.0.0.0")