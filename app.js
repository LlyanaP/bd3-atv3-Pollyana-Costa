const listAluno = document.querySelector('#lista_aluno');

function renderList(doc){
    
    let li = document.createElement('li');
    let nome = document.createElement('span');
    let cpf = document.createElement('span');
    let rg = document.createElement('span');
    let telefone_aluno = document.createElement('span');
    let telefone_responsavel = document.createElement('span');
    let email = document.createElement('span');
    let data_nascimento = document.createElement('span');
    let excluir = document.createElement('button');
    
    excluir.textContent = 'X';
    excluir.classList.add('X');


     li.setAttribute('data-id', doc.cpf);   
    nome.textContent = doc.nome;
    cpf.textContent = doc.cpf;
    rg.textContent = doc.rg;
    telefone_aluno.textContent = doc.telefone_aluno;
    telefone_responsavel.textContent = doc.telefone_responsavel;
    email.textContent = doc.email;
    data_nascimento.textContent = data_nascimento.textContent = doc.data_nascimento.toDate().toLocaleDateString();

    excluir.addEventListener('click', () => {
        db.collection('tbl_alunos').doc(doc.id).delete().then(() => {
            console.log('Aluno Excluído Com Sucesso');
            listAluno.removeChild(li);
        }).catch((error) => {
            console.error('Erro Ao Excluir Aluno: ', error);
        });
    });

    li.appendChild(nome);
    li.appendChild(cpf);
    li.appendChild(rg);
    li.appendChild(telefone_aluno);
    li.appendChild(telefone_responsavel);
    li.appendChild(email);
    li.appendChild(data_nascimento);
    li.appendChild(excluir)

    listAluno.appendChild(li);
}

db.collection('tbl_alunos')
    .get()
    .then((snapshot)=>{
        snapshot.docs.forEach(
            doc => {
                console.log(doc.data())
                renderList({ ...doc.data(), id: doc.id });
            }
        )
    });
    const form = document.querySelector('#adicionar_aluno');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        db.collection('tbl_alunos').add({
            nome: form.nome.value,
            cpf: form.cpf.value,
            rg: form.rg.value,
            telefone_aluno: form.telefone_aluno.value,
            telefone_responsavel: form.telefone_responsavel.value,
            email: form.email.value,
            data_nascimento: firebase.firestore.Timestamp.fromDate(new Date(form.data_nascimento.value))
        }).then(()=>{
            form.nome.value = '';
            form.cpf.value = '';
            form.rg.value = '';
            form.telefone_aluno.value = '';
            form.telefone_responsavel.value = '';
            form.email.value = '';
            form.data_nascimento.value = '';
            window.location.reload();
        });
    })    
    