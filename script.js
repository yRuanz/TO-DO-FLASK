axios.get('https://apiaulas--ruanhenriquesen.repl.co/funcionarios').then(Response) => (
    console.log(Response.data);
)

function getData(dados){
    dados.map((item)=>{
    tabela.innerHTML += `
    <tr>
    <th scope="row">${item.id}</th>
    <td>${item.nome}</td>
    <td>${item.cargo}</td>
    <td>${item.salario}</td>
    <td>
    </button class="bg-white"><span class="material-symbols-outlined text-danger icon">delete</span></button>
    </button class="bg-white"><span class="material-symbols-outlined text-sucess icon">edit</span></button>
    </td>
    </tr>
    `
    })
}   