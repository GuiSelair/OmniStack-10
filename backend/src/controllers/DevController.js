const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray")


module.exports = {
    // INDEX (TODOS), SHOW (UNICO), STORE, UPDATE, DESTROY

    async index (req, res){
        const devs = await Dev.find();
        return res.json(devs)
    },

    async store (req, res){
        const { github_username, techs, latitude, longitude} = req.body;
        let dev = await Dev.findOne({ github_username });

        if (!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs)
        
            const location = {
                type: "Point",
                coordinates: [longitude, latitude]
            }
            
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        }
        return res.json(dev);
    },

    async update (req, res){
        const { id } = req.params;
        const { techs, name, latitude, longitude } = req.body;
        const techsArray = parseStringAsArray(techs);

        const location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }

        const responseUpdate = await Dev.updateOne({_id: id},{
            name,
            techs: techsArray,
            location
        })

        if (responseUpdate.n == 1){
            return res.json({"Update": true})
        }
    },

    async destroy (req, res){
        const { id } = req.params
        const responseDelete = await Dev.remove({_id: id})

        if (responseDelete.n == 1){
            return res.json({"Delete": true})
        }
    }
}