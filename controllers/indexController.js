module.exports = app => {
    //Pag Principal
    app.get('/', (req, res) => {
        res.status(200).render('index');
    });  
};