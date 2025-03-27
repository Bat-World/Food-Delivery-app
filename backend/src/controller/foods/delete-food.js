import foodmodel from '../../models/food.scheme.js';

 const deleteFood = async(req, res) => {
    try {
        const food = await foodmodel.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).send('Food not found');
        }
        res.send(food);
    } catch (error) {
        res.status(500).send(error);
    }
}

export default deleteFood;