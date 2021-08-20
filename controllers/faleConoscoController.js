module.exports = app => {
    //Pag Principal
    app.get('/faleconosco', (req, res) => {
        res.status(200).render('faleConosco');
    });  
};