import axios from "axios";

const TOKEN = "cj914c1r01qjjsj7khkgcj914c1r01qjjsj7khl0"

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params:{
        token: TOKEN
    }
})
