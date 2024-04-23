const mainController = {
  homeController: async (req, res) => { 
    try {
      
      res.render('home', {
        title: 'Proyecto',       
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Error para mostrar la home');
    }     
    
  }, 
}
module.exports = mainController;
