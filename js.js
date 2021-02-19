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