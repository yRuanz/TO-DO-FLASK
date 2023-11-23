document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://10.109.142.67:5000';
    const tabela = document.querySelector(".tabela-js");

    // Obtenha tarefas da API e preencha a tabela ao carregar a página
    axios.get(`${apiUrl}/listar`)
        .then(function (resposta) {
            getData(resposta.data);
        })
        .catch(function (error) {
            console.error(error);
        });

    // Função para popular a tabela com tarefas
    function getData(dados) {
        tabela.innerHTML = dados.map(item => `
            <tr>
                <th scope="row" class="id">${item.ID}</th>
                <td class="tarefa">${item.TAREFA}</td>
                <td>
                    <button class="btn del-btn btn-danger delete-btn"><i class="bi bi-trash"></i></button>
                    <button type="button" class="btn btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#editModal" data-bs-whatever="@mdo" style="background-color: #28606c;"><i class="bi bi-pen"></i></button>
                </td>
            </tr>`
        ).join('');

        addEventListeners();
    }

    function addEventListeners() {
        // Adicione uma nova tarefa
        document.querySelector("#add-tarefa").addEventListener("click", function () {
            adicionarTarefa();
        });

        document.querySelector("#tarefa").addEventListener("keypress", function (event) {
            if (event.key === 'Enter') {
                adicionarTarefa();
            }
        });

        function adicionarTarefa() {
            const tarefa = document.querySelector("#tarefa").value;
            if (tarefa === "") {
                alert("Digite uma tarefa!");
                return;
            }

            axios.post(`${apiUrl}/add`, { Tarefa: tarefa })
                .then(function () {
                    loadTasks();
                })
                .catch(function (error) {
                    console.error(error);
                });
        }

        // Exclua uma tarefa
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", function (e) {
                const id = e.target.closest("tr").querySelector(".id").textContent;
                axios.delete(`${apiUrl}/delete/${id}`)
                    .then(function () {
                        loadTasks();
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            });
        });

        // Defina o ID e a tarefa quando o botão de edição é clicado
        document.querySelector(".tabela-js").addEventListener("click", function (e) {
            const editBtn = e.target.closest(".edit-btn");
            if (editBtn) {
                const row = editBtn.closest("tr");
                const id = row.querySelector(".id").textContent;
                const tarefa = row.querySelector(".tarefa").textContent;
                document.querySelector("#edit-tarefa").value = tarefa;
            }
        });

        // Atualize uma tarefa
        document.querySelector("#edit-tarefa-btn").addEventListener("click", function () {
            const tarefaupdate = document.querySelector("#edit-tarefa").value;
            const id = document.querySelector(".id").textContent;

            if (id) {
                axios.put(`${apiUrl}/update/${id}`, { Tarefa: tarefaupdate })
                    .then(function () {
                        loadTasks();
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        });
    }

    // Função para recarregar as tarefas
    function loadTasks() {
        axios.get(`${apiUrl}/listar`)
            .then(function (resposta) {
                getData(resposta.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }
});
