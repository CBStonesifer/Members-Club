require("dotenv").config;

module.exports ={
    env:{
        ALCHEMY_API: process.env.ALCHEMY_API,
        METAMASK_PRIVATE_KEY: process.env.METAMASK_PRIVATE_KEY,
    },
};