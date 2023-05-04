const app = express();
app.get('/', (req, res) => {
 
    // The render method takes the name of the HTML
    // page to be rendered as input.
    // This page should be in views folder in
    // the root directory.
    // We can pass multiple properties and values
    // as an object, here we are passing the only name
    res.render('home', { name: 'Akashdeep' });
});
 
const server = app.listen(4000, function () {
    console.log('listening to port 4000')
});