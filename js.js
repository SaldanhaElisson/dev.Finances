const modal = {
    open(){
        //abrir modal
        //adicionar a calss active
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close(){
        // fechar o modal
        // remover a calss active
        document.querySelector('.modal-overlay').classList.remove('active');
        
        
    }
}

const transactions =[{
    id:1,
    description: 'luz',
    amount:-50000,
    date='23/01/2021'
},{
    id:2,
    description: 'criação de website',
    amount:50000,
    date='23/01/2021'},{
        id:3,
        description: 'internet',
        amount:-2000,
        date='23/01/2021'}]

const transaction ={
    income(){
        //numero da entradas
    },
    amount(){
        // numeros de sáidas
    },
    total(){
        // total income - amount
    }
    
}