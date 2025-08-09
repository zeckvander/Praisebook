from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/Coletanea_trad/<id>")
def Coletanea_trad(id):
    return render_template("Coletanea_trad.html", id=id)

@app.route("/Avul/<id>")
def Avul(id):
    return render_template("Avul.html", id=id)

@app.route("/offline")
def offline():
    return render_template("offline.html")

@app.route("/atualizacoes")
def atualizacoes():
    return jsonify({
        "versao": 1,
        "novasMusicas": [
            {"id": 101, "titulo": "Novo Hino", "letra": "..."}
        ]
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
