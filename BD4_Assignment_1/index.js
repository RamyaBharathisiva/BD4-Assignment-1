let express = require('express');
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

let app = express();

let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

// Initialize SQLite database
(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

// Exercise 1: Get All Restaurants
async function fetchAllRestaurants(){
  let query="SELECT * FROM restaurants";
  let response = await db.all(query, []);
  return { restaurants: response };
}
app.get('/restaurants',async(req,res)=>{
  try{
    let result=await fetchAllRestaurants();
    if (result.restaurants.length === 0) {
        return res.status(404).json({ message: 'No restaurants Found.' });
    }
  res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 2: Get Restaurant by ID
async function fetchRestaurantsById(id){
  let query="SELECT * FROM restaurants WHERE id=?";
  let response = await db.all(query, [id]);
  return { restaurants: response };
}
app.get('/restaurants/details/:id',async(req,res)=>{
  let id=req.params.id;
  try{
    let result=await fetchRestaurantsById(id);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants of this id Found.' });
    }
  res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 3: Get Restaurants by Cuisine
async function fetchRestaurantsByCuisine(cuisine){
  let query="SELECT * FROM restaurants WHERE cuisine=?";
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}
app.get('/restaurants/cuisine/:cuisine',async(req,res)=>{
  let cuisine=req.params.cuisine;
  try{
    let result=await fetchRestaurantsByCuisine(cuisine);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants of this cuisine Found.' });
    }
    res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 4: Get Restaurants by Filter
async function fetchRestaurantsByItsFilter(isVeg,hasOutdoorSeating,isLuxury){
  let query="SELECT * FROM restaurants WHERE isVeg=? AND hasOutdoorSeating=? AND isLuxury=?";
  let response = await db.all(query, [isVeg,hasOutdoorSeating,isLuxury]);
  return { restaurants: response };
}
app.get('/restaurants/filter',async(req,res)=>{
  let isVeg=req.query.isVeg;
  let hasOutdoorSeating=req.query.hasOutdoorSeating;
  let isLuxury=req.query.isLuxury;
  try{
    let result=await fetchRestaurantsByItsFilter(isVeg,hasOutdoorSeating,isLuxury);
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants of this filter Found.' });
    }
    res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 5: Get Restaurants Sorted by Rating
async function fetchRestaurantsSortedByRating(){
  let query="SELECT * FROM restaurants ORDER BY rating DESC";
  let response = await db.all(query, []);
  return { restaurants: response }; 
}
app.get('/restaurants/sort-by-rating',async(req,res)=>{
  try{
    let result=await fetchRestaurantsSortedByRating();
    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants  Found.' });
    }
    res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 6: Get All Dishes
async function fetchAllDishes(){
  let query="SELECT * FROM dishes";
  let response = await db.all(query, []);
  return { dishes: response }; 
}
app.get('/dishes',async(req,res)=>{
  try{
    let result=await fetchAllDishes();
    if (result.dishes.length === 0) {
      return res.status(404).json({message: 'No dishes Found.'});
    }
    res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 7: Get Dish by ID
async function fetchDishesById(id){
  let query="SELECT * FROM dishes WHERE id=?";
  let response = await db.all(query, [id]);
  return { dishes: response }; 
}
app.get('/dishes/details/:id',async(req,res)=>{
  let id=req.params.id;
  try{
    let result=await fetchDishesById(id);
    if (result.dishes.length === 0) {
      return res.status(404).json({message: 'No dishes of this id Found.'});
    }
    res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 8: Get Dishes by Filter
async function fetchDishesByFilter(isVeg){
  let query="SELECT * FROM dishes WHERE isVeg=?";
  let response = await db.all(query, [isVeg]);
  return { dishes: response }; 
}
app.get('/dishes/filter',async(req,res)=>{
  let isVeg=req.query.isVeg;
  try{
    let result=await fetchDishesByFilter(isVeg);
    if (result.dishes.length === 0) {
      return res.status(404).json({message: 'No dishes Found.'});
    }
    res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

// Exercise 9: Get Dishes Sorted by Price
async function fetchDishesBySortedPrice(){
  let query="SELECT * FROM dishes ORDER BY price";
  let response = await db.all(query, []);
  return { dishes: response }; 
}
app.get('/dishes/sort-by-price',async(req,res)=>{
  try{
    let result=await fetchDishesBySortedPrice();
    if (result.dishes.length === 0) {
      return res.status(404).json({message: 'No dishes of price Found.'});
    }
    res.status(200).json(result);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
})






app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});