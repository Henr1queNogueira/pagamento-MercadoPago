module.exports = app => {
    //Pag- Sobre
    app.get('/sobre', (req, res) => {
        res.status(200).render('sobre');
    });  
};